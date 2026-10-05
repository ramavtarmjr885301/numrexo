// lib/htmlEntities.ts
//
// Some blog titles were migrated from WordPress with HTML entities already
// baked into the text ("Risk &amp; Market Performance"). React escapes text on
// output, so those showed up literally as "&amp;" in the admin list and in the
// page <title>. decodeEntities() turns them back into plain characters. It is
// applied when a post is read, so every page gets clean text and the next
// time a post is saved the database copy is clean too.

const NAMED: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  trade: "™",
  copy: "©",
  reg: "®",
  times: "×",
  deg: "°",
};

export function decodeEntities(input: string | null | undefined): string {
  if (!input || input.indexOf("&") === -1) return input || "";
  // Run twice so "&amp;amp;" (double-encoded) also settles to "&".
  let out = input;
  for (let i = 0; i < 2; i++) {
    out = out.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (match, body: string) => {
      if (body[0] === "#") {
        const code = body[1].toLowerCase() === "x" ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
        if (!Number.isFinite(code) || code < 32 || code > 0x10ffff) return match;
        try {
          return String.fromCodePoint(code);
        } catch {
          return match;
        }
      }
      const named = NAMED[body.toLowerCase()];
      return named !== undefined ? named : match;
    });
  }
  return out;
}
