import { auth } from "@/auth";
import { ALLOWED_GITHUB_USER_ID } from "@/lib/auth-config";
import {
  buildEditorPreviewDocument,
  type PreviewTheme,
} from "@/lib/editor-preview";
import { renderMdxToHtml } from "@/lib/mdx";

export const runtime = "nodejs";

const maxPreviewLength = 200_000;

function isPreviewTheme(value: unknown): value is PreviewTheme {
  return value === "light" || value === "dark";
}

export async function POST(request: Request) {
  const session = await auth();

  if (session?.user?.id !== ALLOWED_GITHUB_USER_ID) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  let payload: { source?: unknown; theme?: unknown };

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (
    typeof payload.source !== "string" ||
    payload.source.length > maxPreviewLength
  ) {
    return Response.json({ error: "Preview source is invalid." }, { status: 400 });
  }

  const theme = isPreviewTheme(payload.theme) ? payload.theme : "light";

  try {
    const html = await renderMdxToHtml(payload.source);

    return Response.json({
      document: buildEditorPreviewDocument(html, theme),
    });
  } catch {
    return Response.json(
      { error: "Preview could not be rendered. Check the Markdown/MDX syntax." },
      { status: 400 },
    );
  }
}
