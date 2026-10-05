'use client';

import { useRef, useState } from 'react';

interface RichMarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

// A toolbar on top of the plain markdown textarea, so writing a post feels
// closer to WordPress than to editing raw markdown by hand. Every button
// edits the textarea's own text (wrapping the selection in **bold** markers,
// prefixing the current line(s) with "## ", and so on) rather than
// switching to a separate rich-text editor library - that keeps the
// underlying content a plain markdown string, which is what
// lib/markdown.ts converts to HTML at save time and what the admin list
// re-opens later. "Insert Image" is the one button that does something
// asynchronous: it opens the file picker, uploads to /api/admin/upload, and
// inserts a markdown image tag with the returned URL once that finishes.
export default function RichMarkdownEditor({ value, onChange }: RichMarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  function applyEdit(nextValue: string, selectionStart: number, selectionEnd: number) {
    onChange(nextValue);
    // The textarea is a controlled input, so its DOM value hasn't caught up
    // yet on this tick - restore the cursor position on the next one.
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(selectionStart, selectionEnd);
    });
  }

  function wrapSelection(marker: string, placeholder: string) {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end } = el;
    const selected = value.slice(start, end) || placeholder;
    const next = value.slice(0, start) + marker + selected + marker + value.slice(end);
    applyEdit(next, start + marker.length, start + marker.length + selected.length);
  }

  function prefixLines(prefix: string) {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end } = el;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    let lineEnd = value.indexOf('\n', end);
    if (lineEnd === -1) lineEnd = value.length;
    const block = value.slice(lineStart, lineEnd);
    const prefixed = block
      .split('\n')
      .map((line) => prefix + line)
      .join('\n');
    const next = value.slice(0, lineStart) + prefixed + value.slice(lineEnd);
    applyEdit(next, lineStart, lineStart + prefixed.length);
  }

  function insertLink() {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end } = el;
    const selected = value.slice(start, end) || 'link text';
    const url = window.prompt('Enter the link URL (e.g. https://numrexo.com):', 'https://');
    if (!url) return;
    const markdown = `[${selected}](${url})`;
    const next = value.slice(0, start) + markdown + value.slice(end);
    applyEdit(next, start, start + markdown.length);
  }

  async function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Upload failed. Please try again.');
        return;
      }
      const el = textareaRef.current;
      const start = el?.selectionStart ?? value.length;
      const end = el?.selectionEnd ?? value.length;
      const altText = window.prompt('Short description of the image (alt text, good for SEO - optional):', '') || '';
      const markdown = `\n![${altText}](${data.url})\n`;
      const next = value.slice(0, start) + markdown + value.slice(end);
      applyEdit(next, start + markdown.length, start + markdown.length);
    } catch {
      setError('Upload failed - check your internet connection and try again.');
    } finally {
      setUploading(false);
    }
  }

  const buttons: { label: string; title: string; onClick: () => void }[] = [
    { label: 'H2', title: 'Heading', onClick: () => prefixLines('## ') },
    { label: 'H3', title: 'Sub-heading', onClick: () => prefixLines('### ') },
    { label: 'B', title: 'Bold', onClick: () => wrapSelection('**', 'bold text') },
    { label: 'I', title: 'Italic', onClick: () => wrapSelection('_', 'italic text') },
    { label: '“”', title: 'Quote', onClick: () => prefixLines('> ') },
    { label: '• List', title: 'Bullet list', onClick: () => prefixLines('- ') },
    { label: '1. List', title: 'Numbered list', onClick: () => prefixLines('1. ') },
    { label: 'Link', title: 'Insert link', onClick: insertLink },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5 mb-2 p-2 rounded-lg bg-cream border border-hairline">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            type="button"
            title={btn.title}
            onClick={btn.onClick}
            className="px-2.5 py-1 rounded bg-surface border border-hairline text-ink-soft text-xs font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            {btn.label}
          </button>
        ))}
        <span className="w-px h-5 bg-hairline mx-1" />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageFile}
          className="hidden"
        />
        <button
          type="button"
          title="Insert image"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-2.5 py-1 rounded bg-surface border border-hairline text-ink-soft text-xs font-medium hover:bg-blue-50 hover:text-blue-700 disabled:opacity-50 transition-colors"
        >
          {uploading ? 'Uploading...' : '🖼 Insert Image'}
        </button>
      </div>

      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={20}
        className="w-full px-3 py-2 rounded-lg bg-surface border border-hairline text-ink font-mono text-sm focus:outline-none focus:border-blue-600"
      />
    </div>
  );
}
