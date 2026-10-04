'use client';

import { useState } from 'react';

interface SerpPreviewProps {
  title: string;
  slug: string;
  description: string;
  siteName?: string;
}

// Shows roughly how the post will look as a Google result, live while the
// author types. Google cuts titles at about 600px and descriptions at about
// 155-160 letters; letter counts are a good-enough proxy for a non-technical
// author, and the counter turns red when the text will be cut off.
export default function SerpPreview({ title, slug, description, siteName = 'Numrexo' }: SerpPreviewProps) {
  const [mobile, setMobile] = useState(false);
  const shownTitle = (title || 'Your post title appears here').trim();
  const shownDesc = (description || 'Your meta description appears here. Write 120-160 letters that tell a reader why they should click.').trim();
  const cut = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);
  const titleMax = mobile ? 58 : 60;
  const descMax = mobile ? 130 : 160;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-ink-soft uppercase tracking-wider">Google preview</span>
        <div className="inline-flex rounded-lg border border-hairline overflow-hidden text-xs">
          <button
            type="button"
            onClick={() => setMobile(false)}
            className={`px-3 py-1 ${!mobile ? 'bg-blue-600 text-white' : 'bg-surface text-ink-soft'}`}
          >
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setMobile(true)}
            className={`px-3 py-1 ${mobile ? 'bg-blue-600 text-white' : 'bg-surface text-ink-soft'}`}
          >
            Mobile
          </button>
        </div>
      </div>

      <div className={`bg-white border border-hairline rounded-lg p-4 ${mobile ? 'max-w-sm' : ''}`}>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
            N
          </div>
          <div className="min-w-0">
            <div className="text-[13px] text-[#202124] leading-tight">{siteName}</div>
            <div className="text-[12px] text-[#4d5156] leading-tight truncate">
              https://numrexo.com › blog › {slug || 'your-post-slug'}
            </div>
          </div>
        </div>
        <div className="text-[19px] leading-snug text-[#1a0dab] font-normal">{cut(shownTitle, titleMax)}</div>
        <div className="text-[13px] leading-snug text-[#4d5156] mt-1">{cut(shownDesc, descMax)}</div>
      </div>

      <div className="flex gap-4 mt-2 text-xs">
        <span className={title.length > titleMax ? 'text-red-600' : 'text-ink-faint'}>
          Title: {title.length}/{titleMax}
        </span>
        <span className={description.length > descMax ? 'text-red-600' : 'text-ink-faint'}>
          Description: {description.length}/{descMax}
        </span>
      </div>
    </div>
  );
}
