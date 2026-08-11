export type PreviewTheme = "light" | "dark";

const themeTokens = {
  light: {
    bg: "#fafaf9",
    surface: "#ffffff",
    text: "#1c1917",
    muted: "#57534e",
    border: "#e7e5e4",
    accent: "#b45309",
    accentHover: "#92400e",
  },
  dark: {
    bg: "#1c1917",
    surface: "#292524",
    text: "#fafaf9",
    muted: "#a8a29e",
    border: "#44403c",
    accent: "#fbbf24",
    accentHover: "#f59e0b",
  },
} as const;

const previewStyles = `
  :root {
    color-scheme: light;
    --preview-bg: ${themeTokens.light.bg};
    --preview-surface: ${themeTokens.light.surface};
    --preview-text: ${themeTokens.light.text};
    --preview-muted: ${themeTokens.light.muted};
    --preview-border: ${themeTokens.light.border};
    --preview-accent: ${themeTokens.light.accent};
    --preview-accent-hover: ${themeTokens.light.accentHover};
  }

  :root[data-theme="dark"] {
    color-scheme: dark;
    --preview-bg: ${themeTokens.dark.bg};
    --preview-surface: ${themeTokens.dark.surface};
    --preview-text: ${themeTokens.dark.text};
    --preview-muted: ${themeTokens.dark.muted};
    --preview-border: ${themeTokens.dark.border};
    --preview-accent: ${themeTokens.dark.accent};
    --preview-accent-hover: ${themeTokens.dark.accentHover};
  }

  * { box-sizing: border-box; }
  html, body { min-height: 100%; }
  body {
    margin: 0;
    background: var(--preview-bg);
    color: var(--preview-text);
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    line-height: 1.7;
  }
  .preview-shell { padding: 1.5rem; }
  .mdx-content { max-width: 68ch; margin: 0 auto; }
  .mdx-content h2 {
    margin-top: 3rem;
    font-size: 1.953rem;
    font-weight: 600;
    line-height: 1.2;
  }
  .mdx-content h3 {
    margin-top: 2.5rem;
    font-size: 1.5625rem;
    font-weight: 600;
    line-height: 1.2;
  }
  .mdx-content p,
  .mdx-content ul,
  .mdx-content ol {
    margin-top: 1.5rem;
    font-size: 1.0625rem;
  }
  .mdx-content p,
  .mdx-content li,
  .mdx-content blockquote { color: var(--preview-muted); }
  .mdx-content ul { padding-left: 1.5rem; list-style: disc; }
  .mdx-content ol { padding-left: 1.5rem; list-style: decimal; }
  .mdx-content li + li { margin-top: 0.5rem; }
  .mdx-content blockquote {
    margin-top: 2rem;
    border-left: 2px solid var(--preview-accent);
    padding-left: 1rem;
    font-size: 1.0625rem;
    font-style: italic;
  }
  .mdx-content a {
    color: var(--preview-accent);
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .mdx-content a:hover { color: var(--preview-accent-hover); }
  .mdx-content img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 2rem 0;
    border: 1px solid var(--preview-border);
    border-radius: 6px;
  }
  .mdx-content pre {
    max-width: 100%;
    margin: 2rem 0;
    overflow-x: auto;
    border: 1px solid var(--preview-border);
    border-radius: 6px;
    background: var(--preview-surface);
    padding: 1rem;
    font-size: 0.9375rem;
    line-height: 1.7;
  }
  .mdx-content pre > code {
    display: block;
    min-width: max-content;
    font-family: "JetBrains Mono", ui-monospace, monospace;
  }
  .mdx-content code {
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 0.9375rem;
  }
`;

export function buildEditorPreviewDocument(
  html: string,
  theme: PreviewTheme,
) {
  return `<!doctype html>
<html lang="en" data-theme="${theme}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>${previewStyles}</style>
  </head>
  <body>
    <main class="preview-shell">
      <div class="mdx-content">${html}</div>
    </main>
  </body>
</html>`;
}
