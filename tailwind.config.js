/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sora)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      colors: {
        // Patch 16 redesign tokens - a light, cream-and-ink theme replacing
        // the old bg-[#0a0e1a]/bg-[#111827] dark palette site-wide. Named
        // semantically (not "gray-50" etc.) so a future palette change is a
        // one-line edit here instead of a find-and-replace across ~200 files.
        cream: "#faf9f5", // page background
        surface: "#ffffff", // cards, inputs, the header/footer's opposite number
        ink: "#111111", // primary text / headings
        "ink-soft": "#4b5563", // secondary/body text (~gray-600)
        "ink-faint": "#9ca3af", // placeholder/tertiary text (~gray-400)
        panel: "#0f172a", // the dark navy "results" card (slate-900)
        "panel-soft": "#1e293b", // lighter fill inside a panel (slate-800)
        hairline: "#e5e7eb", // card/input borders (~gray-200)
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};