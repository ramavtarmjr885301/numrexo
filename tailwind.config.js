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
        cream: "#f4f3ec", // page background (a little deeper so white cards stand out)
        surface: "#ffffff", // cards, inputs, the header/footer's opposite number
        ink: "#111111", // primary text / headings
        "ink-soft": "#374151", // secondary/body text (~gray-700)
        "ink-faint": "#6b7280", // labels/tertiary text (~gray-500, passes WCAG AA on white)
        panel: "#0f172a", // the dark navy "results" card (slate-900)
        "panel-soft": "#1e293b", // lighter fill inside a panel (slate-800)
        hairline: "#cbd5e1", // card/input borders (~slate-300; was gray-200, too faint for low vision)
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};