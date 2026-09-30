// lib/markdown.ts
//
// The admin editor is a markdown textarea (simplest possible writing
// experience for a single, non-technical author publishing 1-4 posts a
// month - no rich-text toolbar to maintain). What's stored in Postgres and
// rendered on the public page is always HTML, converted once here at save
// time, so app/blog/[slug]/page.tsx never has to know or care whether a
// post came from the WordPress migration or the admin panel.

import { marked } from 'marked';

marked.setOptions({
  gfm: true,
  breaks: false,
});

export function markdownToHtml(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string;
}
