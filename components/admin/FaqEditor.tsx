'use client';

import { BlogFaq } from '@/lib/blogTypes';

interface FaqEditorProps {
  value: BlogFaq[];
  onChange: (value: BlogFaq[]) => void;
}

// Optional FAQ block for a post. Kept deliberately simple - a list of
// question/answer pairs the admin can add to or remove from - because the
// payoff isn't the editing UI, it's what app/blog/[slug]/page.tsx does with
// it afterwards: renders it on the page AND emits it as FAQPage schema.org
// JSON-LD, which is what makes a post eligible for Google's FAQ rich
// result. A row with an empty question or answer is silently dropped on
// save (see lib/faqs.ts), so a half-filled-in row left behind by mistake
// never reaches the database or the schema.
export default function FaqEditor({ value, onChange }: FaqEditorProps) {
  function updateRow(index: number, field: keyof BlogFaq, text: string) {
    const next = value.map((faq, i) => (i === index ? { ...faq, [field]: text } : faq));
    onChange(next);
  }

  function addRow() {
    onChange([...value, { question: '', answer: '' }]);
  }

  function removeRow(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="block text-sm text-ink-soft mb-1.5">
        FAQ <span className="text-ink-faint">(optional - can appear as an FAQ rich result in Google search)</span>
      </label>

      <div className="space-y-3">
        {value.map((faq, index) => (
          <div key={index} className="p-3 rounded-lg bg-cream border border-hairline">
            <div className="flex items-start gap-2 mb-2">
              <input
                value={faq.question}
                onChange={(e) => updateRow(index, 'question', e.target.value)}
                placeholder={`Question ${index + 1}`}
                className="flex-1 px-3 py-2 rounded-lg bg-surface border border-hairline text-ink text-sm focus:outline-none focus:border-blue-600"
              />
              <button
                type="button"
                onClick={() => removeRow(index)}
                title="Remove"
                className="px-2.5 py-2 rounded-lg text-ink-faint hover:text-red-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <textarea
              value={faq.answer}
              onChange={(e) => updateRow(index, 'answer', e.target.value)}
              placeholder="Answer"
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-surface border border-hairline text-ink text-sm focus:outline-none focus:border-blue-600"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="mt-3 px-3 py-1.5 rounded-lg bg-cream border border-hairline text-ink-soft text-sm hover:border-blue-600 transition-colors"
      >
        + Add FAQ
      </button>
    </div>
  );
}
