// lib/faqs.ts
//
// Shared validation for the optional FAQ block on a blog post. Used by both
// admin API routes (create/update) so a malformed or junk `faqs` value from
// the client can never reach the database - only rows with a real, non-empty
// question and answer survive, and anything that isn't an array at all
// becomes an empty one rather than throwing.

import { BlogFaq } from './blogTypes';

const MAX_FAQS = 20;

export function sanitizeFaqs(value: unknown): BlogFaq[] {
  if (!Array.isArray(value)) return [];
  const cleaned: BlogFaq[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') continue;
    const question = typeof (item as any).question === 'string' ? (item as any).question.trim() : '';
    const answer = typeof (item as any).answer === 'string' ? (item as any).answer.trim() : '';
    if (question && answer) {
      cleaned.push({ question, answer });
    }
    if (cleaned.length >= MAX_FAQS) break;
  }
  return cleaned;
}
