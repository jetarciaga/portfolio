"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { autosavePost } from "@/app/admin/actions";
import type { AdminPost, PostStatus } from "@/lib/admin-posts";
import {
  buildEditorPreviewDocument,
  type PreviewTheme,
} from "@/lib/editor-preview";

type DraftFields = {
  title: string;
  slug: string;
  summary: string;
  tags: string;
  body_md: string;
};

type PostEditorProps = {
  initialPost: AdminPost | null;
};

type AutosaveResult = {
  id: string;
  slug: string;
  status: PostStatus;
  updatedAt: string;
};

const autosaveIntervalMs = 5000;

function fieldsFromPost(post: AdminPost | null): DraftFields {
  return {
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    summary: post?.summary ?? "",
    tags: post?.tags.join(", ") ?? "",
    body_md: post?.body_md ?? "",
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function canSaveFields(fields: DraftFields) {
  return Boolean(
    fields.title.trim() &&
      fields.slug.trim() &&
      fields.summary.trim() &&
      fields.tags.trim() &&
      fields.body_md.trim(),
  );
}

function toFormData(fields: DraftFields) {
  const formData = new FormData();
  formData.set("title", fields.title);
  formData.set("slug", fields.slug);
  formData.set("summary", fields.summary);
  formData.set("tags", fields.tags);
  formData.set("body_md", fields.body_md);
  return formData;
}

function isDraftBackup(value: unknown): value is {
  savedAt: number;
  fields: DraftFields;
} {
  if (!value || typeof value !== "object") return false;

  const candidate = value as { savedAt?: unknown; fields?: unknown };
  const fields = candidate.fields;

  if (
    typeof candidate.savedAt !== "number" ||
    !fields ||
    typeof fields !== "object"
  ) {
    return false;
  }

  const draft = fields as Partial<DraftFields>;
  return ["title", "slug", "summary", "tags", "body_md"].every(
    (field) => typeof draft[field as keyof DraftFields] === "string",
  );
}

function draftStorageKey(id: string | null) {
  return `portfolio:post-editor:${id ?? "new"}`;
}

function formatSavedAt(value: string) {
  return value.replace("T", " ").replace(/\.\d+Z$/, " UTC");
}

export default function PostEditor({ initialPost }: PostEditorProps) {
  const router = useRouter();
  const [draft, setDraft] = useState<DraftFields>(() => fieldsFromPost(initialPost));
  const [postId, setPostId] = useState<string | null>(initialPost?.id ?? null);
  const [postStatus, setPostStatus] = useState<PostStatus>(
    initialPost?.status ?? "draft",
  );
  const [slugTouched, setSlugTouched] = useState(Boolean(initialPost));
  const [mobilePane, setMobilePane] = useState<"write" | "preview">("write");
  const [previewDocument, setPreviewDocument] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState("");
  const [theme, setTheme] = useState<PreviewTheme>("light");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [recoveryNotice, setRecoveryNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(
    initialPost?.updated_at ?? null,
  );

  const draftRef = useRef(draft);
  const postIdRef = useRef(postId);
  const dirtyRef = useRef(dirty);
  const slugTouchedRef = useRef(slugTouched);
  const savingRef = useRef(false);
  const uploadingRef = useRef(false);
  const hasUserGestureRef = useRef(false);
  const saveNowRef = useRef<(manual: boolean) => Promise<void>>(
    async () => undefined,
  );
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  useEffect(() => {
    postIdRef.current = postId;
  }, [postId]);

  useEffect(() => {
    dirtyRef.current = dirty;
  }, [dirty]);

  useEffect(() => {
    slugTouchedRef.current = slugTouched;
  }, [slugTouched]);

  useEffect(() => {
    const key = draftStorageKey(initialPost?.id ?? null);
    const raw = window.localStorage.getItem(key);

    const recoveryTimer = window.setTimeout(() => {
      if (raw) {
        try {
          const parsed: unknown = JSON.parse(raw);
          const serverSavedAt = initialPost?.updated_at
            ? Date.parse(initialPost.updated_at)
            : 0;

          if (isDraftBackup(parsed) && parsed.savedAt > serverSavedAt) {
            draftRef.current = parsed.fields;
            setDraft(parsed.fields);
            setDirty(true);
            setRecoveryNotice(
              "Recovered a newer local draft. Save it to sync it to the server.",
            );
          }
        } catch {
          window.localStorage.removeItem(key);
        }
      }

      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(recoveryTimer);
  }, [initialPost]);

  useEffect(() => {
    if (!hydrated) return;

    const key = draftStorageKey(postId);

    if (dirty) {
      window.localStorage.setItem(
        key,
        JSON.stringify({ savedAt: Date.now(), fields: draft }),
      );
    } else {
      window.localStorage.removeItem(key);
    }
  }, [draft, dirty, hydrated, postId]);

  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timer = window.setTimeout(async () => {
      if (!draft.body_md.trim()) {
        if (active) {
          setPreviewDocument(null);
          setPreviewError("");
        }
        return;
      }

      if (active) {
        setPreviewLoading(true);
        setPreviewError("");
      }

      try {
        const response = await fetch("/api/admin/mdx-preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source: draft.body_md, theme }),
          signal: controller.signal,
        });
        const result = (await response.json()) as {
          document?: string;
          error?: string;
        };

        if (!response.ok || !result.document) {
          throw new Error(result.error ?? "Preview could not be rendered.");
        }

        if (active) setPreviewDocument(result.document);
      } catch (error) {
        if (
          active &&
          !(error instanceof DOMException && error.name === "AbortError")
        ) {
          setPreviewError(
            error instanceof Error ? error.message : "Preview could not be rendered.",
          );
        }
      } finally {
        if (active) setPreviewLoading(false);
      }
    }, 200);

    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [draft.body_md, theme]);

  const setField = useCallback(
    (field: keyof DraftFields, value: string) => {
      const next = { ...draftRef.current, [field]: value };
      draftRef.current = next;
      setDraft(next);
      dirtyRef.current = true;
      setDirty(true);
      setSaveMessage("");
      setSaveError("");
    },
    [],
  );

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    const next = {
      ...draftRef.current,
      title,
      ...(slugTouchedRef.current ? {} : { slug: slugify(title) }),
    };
    draftRef.current = next;
    setDraft(next);
    dirtyRef.current = true;
    setDirty(true);
    setSaveMessage("");
    setSaveError("");
  };

  const handleSlugChange = (event: ChangeEvent<HTMLInputElement>) => {
    slugTouchedRef.current = true;
    setSlugTouched(true);
    setField("slug", event.target.value.toLowerCase());
  };

  const saveNow = useCallback(async (manual: boolean) => {
    if (savingRef.current) return;

    if (uploadingRef.current) {
      if (manual) {
        setSaveError("Finish the image upload before saving.");
      }
      return;
    }

    const current = draftRef.current;

    if (!canSaveFields(current)) {
      if (manual) {
        setSaveError("Complete the title, slug, summary, tags, and body before saving.");
      }
      return;
    }

    savingRef.current = true;
    setSaving(true);
    setSaveMessage(manual ? "Saving…" : "Autosaving…");
    setSaveError("");

    try {
      const result = (await autosavePost(
        postIdRef.current,
        toFormData(current),
      )) as AutosaveResult;
      const previousId = postIdRef.current;

      postIdRef.current = result.id;
      setPostId(result.id);
      setPostStatus(result.status);
      setLastSavedAt(result.updatedAt);
      dirtyRef.current = false;
      setDirty(false);
      setRecoveryNotice("");
      setSaveMessage(manual ? "Saved" : "Autosaved");
      window.localStorage.removeItem(draftStorageKey(previousId));

      if (!previousId) {
        router.replace(`/admin/${result.id}/edit`);
      }
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Save failed.");
      setSaveMessage("");
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }, [router]);

  useEffect(() => {
    saveNowRef.current = saveNow;
  }, [saveNow]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (dirtyRef.current && !uploadingRef.current) {
        void saveNowRef.current(false);
      }
    }, autosaveIntervalMs);

    const handlePageHide = () => {
      if (dirtyRef.current && !uploadingRef.current) {
        void saveNowRef.current(false);
      }
    };

    window.addEventListener("pagehide", handlePageHide);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  useEffect(() => {
    const markUserGesture = () => {
      hasUserGestureRef.current = true;
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!dirtyRef.current || !hasUserGestureRef.current) return;
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("pointerdown", markUserGesture);
    window.addEventListener("keydown", markUserGesture);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("pointerdown", markUserGesture);
      window.removeEventListener("keydown", markUserGesture);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const handleInternalNavigation = (event: MouseEvent) => {
      if (
        !dirtyRef.current ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a[href]");
      if (!link || link.getAttribute("target") === "_blank") return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const destination = new URL(href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      event.preventDefault();

      if (window.confirm("You have unsaved changes. Leave this editor?")) {
        router.push(`${destination.pathname}${destination.search}${destination.hash}`);
      }
    };

    document.addEventListener("click", handleInternalNavigation);
    return () => document.removeEventListener("click", handleInternalNavigation);
  }, [router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void saveNow(true);
  };

  const handleEditorKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Tab") return;

    event.preventDefault();
    const textarea = event.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const nextBody =
      draftRef.current.body_md.slice(0, start) +
      "\t" +
      draftRef.current.body_md.slice(end);
    setField("body_md", nextBody);

    window.requestAnimationFrame(() => {
      textarea.selectionStart = start + 1;
      textarea.selectionEnd = start + 1;
    });
  };

  const insertMarkdown = useCallback((markdown: string) => {
    const textarea = bodyRef.current;
    const body = draftRef.current.body_md;
    const start = textarea?.selectionStart ?? body.length;
    const end = textarea?.selectionEnd ?? body.length;
    const prefix = start > 0 && !body.slice(0, start).endsWith("\n") ? "\n\n" : "";
    const suffix = end < body.length && !body.slice(end).startsWith("\n") ? "\n\n" : "";
    const inserted = prefix + markdown + suffix;
    setField("body_md", body.slice(0, start) + inserted + body.slice(end));

    window.requestAnimationFrame(() => {
      textarea?.focus();
      const cursor = start + inserted.length;
      textarea?.setSelectionRange(cursor, cursor);
    });
  }, [setField]);

  const uploadFile = async (file: File) => {
    uploadingRef.current = true;
    setUploading(true);
    setSaveError("");

    try {
      const formData = new FormData();
      formData.set("file", file);
      if (postIdRef.current) formData.set("postId", postIdRef.current);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as {
        markdown?: string;
        error?: string;
      };

      if (!response.ok || !result.markdown) {
        throw new Error(result.error ?? "Image upload failed.");
      }

      insertMarkdown(result.markdown);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      uploadingRef.current = false;
      setUploading(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void uploadFile(file);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) void uploadFile(file);
  };

  const emptyPreviewDocument = buildEditorPreviewDocument(
    '<p class="preview-empty">Write Markdown to see the rendered preview.</p>',
    theme,
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          className="font-mono text-sm text-accent transition-colors duration-150 ease-out hover:text-accent-hover"
          href="/admin"
        >
          ← Admin
        </Link>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          {postStatus}
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <section aria-labelledby="editor-write-heading" className="min-w-0">
          <div className="flex items-center justify-between gap-4">
            <h2
              className="font-mono text-xs uppercase tracking-widest text-muted"
              id="editor-write-heading"
            >
              Write
            </h2>
            <div className="flex gap-2 md:hidden" role="tablist" aria-label="Editor pane">
              <button
                className={`rounded-token border px-3 py-2 font-mono text-xs ${mobilePane === "write" ? "border-accent text-accent" : "border-border text-muted"}`}
                type="button"
                role="tab"
                aria-selected={mobilePane === "write"}
                onClick={() => setMobilePane("write")}
              >
                Write
              </button>
              <button
                className={`rounded-token border px-3 py-2 font-mono text-xs ${mobilePane === "preview" ? "border-accent text-accent" : "border-border text-muted"}`}
                type="button"
                role="tab"
                aria-selected={mobilePane === "preview"}
                onClick={() => setMobilePane("preview")}
              >
                Preview
              </button>
            </div>
          </div>

          <div className={`${mobilePane === "preview" ? "hidden md:block" : "block"}`}>
            <div className="mt-6 space-y-6">
              <div>
                <label className="font-mono text-xs text-muted" htmlFor="editor-title">
                  Title
                </label>
                <input
                  className="mt-2 block w-full rounded-token border border-border bg-surface px-4 py-3 text-base text-text outline-none transition-colors duration-150 ease-out focus:border-accent"
                  id="editor-title"
                  maxLength={200}
                  onChange={handleTitleChange}
                  required
                  value={draft.title}
                />
              </div>

              <div>
                <label className="font-mono text-xs text-muted" htmlFor="editor-slug">
                  Slug
                </label>
                <input
                  className="mt-2 block w-full rounded-token border border-border bg-surface px-4 py-3 font-mono text-sm text-text outline-none transition-colors duration-150 ease-out focus:border-accent"
                  id="editor-slug"
                  maxLength={120}
                  onChange={handleSlugChange}
                  pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                  required
                  value={draft.slug}
                />
                <p className="mt-2 text-sm text-muted">
                  Auto-generated from the title; edit it when you need a deliberate override.
                </p>
                {postStatus === "published" ? (
                  <p className="mt-2 text-sm text-accent">
                    Changing a published slug breaks its live URL. Keep the original slug whenever possible.
                  </p>
                ) : null}
              </div>

              <div>
                <label className="font-mono text-xs text-muted" htmlFor="editor-summary">
                  Summary
                </label>
                <textarea
                  className="mt-2 block min-h-28 w-full rounded-token border border-border bg-surface px-4 py-3 text-base text-text outline-none transition-colors duration-150 ease-out focus:border-accent"
                  id="editor-summary"
                  maxLength={500}
                  onChange={(event) => setField("summary", event.target.value)}
                  required
                  value={draft.summary}
                />
              </div>

              <div>
                <label className="font-mono text-xs text-muted" htmlFor="editor-tags">
                  Tags
                </label>
                <input
                  className="mt-2 block w-full rounded-token border border-border bg-surface px-4 py-3 font-mono text-sm text-text outline-none transition-colors duration-150 ease-out focus:border-accent"
                  id="editor-tags"
                  onChange={(event) => setField("tags", event.target.value)}
                  required
                  value={draft.tags}
                />
              </div>

              <div>
                <label className="font-mono text-xs text-muted" htmlFor="editor-body">
                  Markdown body
                </label>
                <textarea
                  ref={bodyRef}
                  className="mt-2 block min-h-96 w-full resize-y overflow-auto rounded-token border border-border bg-surface px-4 py-3 font-mono text-sm leading-body text-text outline-none transition-colors duration-150 ease-out focus:border-accent"
                  id="editor-body"
                  onChange={(event) => setField("body_md", event.target.value)}
                  onKeyDown={handleEditorKeyDown}
                  required
                  spellCheck={false}
                  style={{ tabSize: 4 }}
                  value={draft.body_md}
                  wrap="off"
                />
                <p className="mt-2 text-sm text-muted">
                  Tabs are preserved. Press Tab in the editor to insert one.
                </p>
              </div>

              <div
                className={`rounded-token border border-dashed p-5 transition-colors ${dragging ? "border-accent bg-surface" : "border-border"}`}
                onDragEnter={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragOver={(event) => event.preventDefault()}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
              >
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  Image upload
                </p>
                <p className="mt-2 text-sm text-muted">
                  Drop a GIF, JPEG, PNG, or WebP here, or choose one. The Markdown image link is inserted at the cursor.
                </p>
                <label className="mt-4 inline-flex cursor-pointer rounded-token border border-border px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out hover:border-accent hover:text-accent">
                  {uploading ? "Uploading…" : "Choose image"}
                  <input
                    accept="image/gif,image/jpeg,image/png,image/webp"
                    className="sr-only"
                    disabled={uploading}
                    onChange={handleFileChange}
                    type="file"
                  />
                </label>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="editor-preview-heading"
          className={`${mobilePane === "write" ? "hidden md:block" : "block"} min-w-0`}
        >
          <div className="flex items-center justify-between gap-4">
            <h2
              className="font-mono text-xs uppercase tracking-widest text-muted"
              id="editor-preview-heading"
            >
              Preview
            </h2>
            <span className="font-mono text-xs text-muted" aria-live="polite">
              {previewLoading ? "Rendering…" : previewError ? "Preview error" : "Same MDX pipeline"}
            </span>
          </div>
          <div className="mt-6 min-h-96 overflow-hidden rounded-token border border-border bg-surface">
            <iframe
              className="block min-h-96 w-full border-0"
              title="Rendered Markdown preview"
              sandbox=""
              srcDoc={previewDocument ?? emptyPreviewDocument}
            />
          </div>
          {previewError ? (
            <p className="mt-3 text-sm text-accent" role="alert">
              {previewError}
            </p>
          ) : null}
        </section>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <button
          className="rounded-token bg-accent px-5 py-3 text-sm font-medium text-bg transition-colors duration-150 ease-out hover:bg-accent-hover disabled:cursor-wait disabled:opacity-60"
          disabled={saving || uploading}
          type="submit"
        >
          {saving ? "Saving…" : postStatus === "published" ? "Save changes" : "Save draft"}
        </button>
        <span className="text-sm text-muted" aria-live="polite">
          {saveMessage}
        </span>
        {lastSavedAt && !dirty ? (
          <span className="font-mono text-xs text-muted">
            Last saved {formatSavedAt(lastSavedAt)}
          </span>
        ) : null}
      </div>
      {recoveryNotice ? (
        <p className="mt-3 text-sm text-accent" role="status">
          {recoveryNotice}
        </p>
      ) : null}
      {saveError ? (
        <p className="mt-3 text-sm text-accent" role="alert">
          {saveError}
        </p>
      ) : null}
      {dirty ? (
        <p className="mt-3 font-mono text-xs text-muted">
          Unsaved changes are backed up in this browser and will autosave every 5 seconds.
        </p>
      ) : null}
    </form>
  );
}
