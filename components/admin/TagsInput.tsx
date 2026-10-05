'use client';

import { useState } from 'react';
import { MAX_TAGS, sanitizeTags } from '@/lib/tags';

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

// Type a tag and press Enter or comma to add it; click x to remove.
export default function TagsInput({ value, onChange }: TagsInputProps) {
  const [draft, setDraft] = useState('');

  function commit(text: string) {
    const next = sanitizeTags([...value, ...text.split(',')]);
    onChange(next);
    setDraft('');
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs"
          >
            {tag}
            <button
              type="button"
              aria-label={`Remove tag ${tag}`}
              onClick={() => onChange(value.filter((t) => t !== tag))}
              className="text-blue-400 hover:text-blue-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        value={draft}
        onChange={(e) => {
          const v = e.target.value;
          if (v.includes(',')) commit(v);
          else setDraft(v);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (draft.trim()) commit(draft);
          } else if (e.key === 'Backspace' && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={() => draft.trim() && commit(draft)}
        disabled={value.length >= MAX_TAGS}
        placeholder={value.length >= MAX_TAGS ? 'Maximum number of tags reached' : 'Type a tag and press Enter (e.g. home loan)'}
        className="w-full px-3 py-2 rounded-lg bg-cream border border-hairline text-ink text-sm focus:outline-none focus:border-blue-600"
      />
    </div>
  );
}
