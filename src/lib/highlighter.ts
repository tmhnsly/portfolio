import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import tsx from '@shikijs/langs/tsx';
import typescript from '@shikijs/langs/typescript';
import javascript from '@shikijs/langs/javascript';
import scss from '@shikijs/langs/scss';
import css from '@shikijs/langs/css';
import json from '@shikijs/langs/json';
import bash from '@shikijs/langs/bash';
import html from '@shikijs/langs/html';
import oneDarkPro from '@shikijs/themes/one-dark-pro';

/** The single editor theme code blocks render in (matches the owner's VS Code: One Dark). */
export const CODE_THEME = 'one-dark-pro';

/**
 * One synchronous Shiki highlighter for the whole site, built once at module load.
 *
 * Two deliberate choices keep this server-only and light:
 *   - the JS regex engine (no WASM/oniguruma), so it runs synchronously inside
 *     react-markdown's `code` renderer — no async, no client bundle;
 *   - fine-grained `@shikijs/langs/*` + `@shikijs/themes/*` imports, so only the
 *     grammars and the one theme listed here ship, not Shiki's full bundle.
 *
 * Code blocks always render in one dark editor theme (a dark editor reads the same
 * in light or dark site mode), so each token carries its colour inline and the
 * `.shiki` element carries the theme's own background — no theme-switching CSS.
 */
const highlighter = createHighlighterCoreSync({
  themes: [oneDarkPro],
  langs: [tsx, typescript, javascript, scss, css, json, bash, html],
  engine: createJavaScriptRegexEngine({ forgiving: true }),
});

const LOADED = new Set(highlighter.getLoadedLanguages());

// Markdown fence labels that don't match a loaded grammar id 1:1.
const ALIAS: Record<string, string> = {
  jsx: 'tsx',
  ts: 'typescript',
  js: 'javascript',
  sh: 'bash',
  shell: 'bash',
  shellscript: 'bash',
};

/**
 * Highlight `code` for `lang`, returning Shiki's HTML string, or null when the
 * language is unknown/unloaded so the caller can fall back to a plain <pre>.
 */
export function highlight(code: string, lang?: string): string | null {
  if (!lang) return null;
  const id = ALIAS[lang] ?? lang;
  if (!LOADED.has(id)) return null;
  try {
    return highlighter.codeToHtml(code, { lang: id, theme: CODE_THEME });
  } catch {
    return null;
  }
}
