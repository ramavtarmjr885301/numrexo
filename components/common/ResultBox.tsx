"use client";

import { ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import { CALCULATORS_REGISTRY, CATEGORIES } from "@/data/calculatorsRegistry";
import ResultActions from "./ResultActions";
import type { ShareCardData } from "@/lib/shareCard";
import { shareHeadlineFor } from "@/lib/shareHeadline";

interface ResultBoxProps {
  title: string;
  isEmpty: boolean;
  emptyIcon: string;
  emptyText: string;
  children?: ReactNode;
  mainResult?: {
    label: string;
    value: string;
    unit?: string;
    color?: string;
  };
  extraRows?: Array<{
    label: string;
    value: string;
    valueColor?: string;
  }>;
}

// Calculators pass light-theme colours (text-green-600, text-yellow-700 ...) for
// values, but this panel is dark navy, where those shades fail WCAG contrast.
// Map them to the readable -300/-400 shade of the same hue. Written out in full
// so Tailwind keeps every class in the CSS bundle.
const ON_DARK: Record<string, string> = {
  green: "text-green-400", emerald: "text-emerald-400", lime: "text-lime-300", teal: "text-teal-300",
  cyan: "text-cyan-300", sky: "text-sky-300", blue: "text-blue-300", indigo: "text-indigo-300",
  violet: "text-violet-300", purple: "text-purple-300", pink: "text-pink-300", rose: "text-rose-300",
  red: "text-red-400", orange: "text-orange-300", amber: "text-amber-300", yellow: "text-yellow-300",
};

function onDark(cls: string | undefined): string | undefined {
  if (!cls) return cls;
  return cls.replace(/\btext-([a-z]+)-(500|600|700|800|900)\b/g, (m, hue: string) => ON_DARK[hue] ?? m);
}

export default function ResultBox({
  title,
  isEmpty,
  emptyIcon,
  emptyText,
  children,
  mainResult,
  extraRows,
}: ResultBoxProps) {
  // Result actions (Patch 19 share card, Patch 20 PDF + email). Every calculator
  // that renders its answer through this component gets them automatically: built
  // from the same title / main result / extra rows shown on screen, plus the
  // current calculator's name, icon and colour looked up from the registry.
  const pathname = usePathname() || "";
  const calc = useMemo(
    () => CALCULATORS_REGISTRY.find((c) => c.path === pathname.replace(/\/$/, "")),
    [pathname],
  );
  const canShare = !isEmpty && Boolean(mainResult && mainResult.value && String(mainResult.value).trim());

  const shareData: ShareCardData | null = useMemo(() => {
    if (!canShare || !mainResult) return null;
    const category = calc ? CATEGORIES[calc.category as keyof typeof CATEGORIES] : undefined;
    return {
      calcName: calc?.name || title,
      calcIcon: calc?.icon || "🧮",
      accent: calc?.color || "#3b82f6",
      categoryLabel: category?.name || "Calculator",
      label: mainResult.label,
      value: String(mainResult.value),
      unit: mainResult.unit,
      rows: (extraRows || []).map((r) => ({ label: r.label, value: r.value })),
      headline: shareHeadlineFor(calc?.slug, extraRows || [])?.headline,
      displayUrl: `numrexo.com${calc?.path || pathname}`,
    };
  }, [canShare, mainResult, extraRows, calc, title, pathname]);

  // This is the one shared component that stays dark - it is the mockup's
  // dark-navy "results" card, deliberately set apart from the light input
  // card next to it. Used by ~120 of the 122 calculators, so this is the
  // single highest-leverage file for the Patch 16 redesign: restyling it
  // here reskins the results panel everywhere at once.
  return (
    <div className="bg-panel border border-panel-soft rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-panel-soft">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</h3>
      </div>

      <div className="p-6">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <div className="text-4xl mb-3 opacity-30">{emptyIcon}</div>
            <div className="text-sm">{emptyText}</div>
          </div>
        ) : (
          <>
            {mainResult && (
              <div className="text-center pb-6 mb-6 border-b border-panel-soft">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">{mainResult.label}</div>
                <div className={`text-4xl md:text-5xl font-bold font-mono ${onDark(mainResult.color) || "text-blue-400"}`}>
                  {mainResult.value}
                </div>
                {mainResult.unit && <div className="text-xs text-gray-400 mt-1">{mainResult.unit}</div>}
                {children}
              </div>
            )}

            {extraRows && extraRows.length > 0 && (
              <div className="space-y-2">
                {extraRows.map((row, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-panel-soft rounded-lg border border-panel-soft"
                  >
                    <span className="text-xs text-gray-400">{row.label}</span>
                    <span className={`text-sm font-mono font-semibold ${onDark(row.valueColor) || "text-white"}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {shareData && <ResultActions data={shareData} calcPath={calc?.path || pathname} />}
      </div>

    </div>
  );
}