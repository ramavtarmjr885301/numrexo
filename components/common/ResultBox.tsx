"use client";

import { ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import { CALCULATORS_REGISTRY, CATEGORIES } from "@/data/calculatorsRegistry";
import ResultActions from "./ResultActions";
import type { ShareCardData } from "@/lib/shareCard";

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
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <div className="text-4xl mb-3 opacity-30">{emptyIcon}</div>
            <div className="text-sm">{emptyText}</div>
          </div>
        ) : (
          <>
            {mainResult && (
              <div className="text-center pb-6 mb-6 border-b border-panel-soft">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">{mainResult.label}</div>
                <div className={`text-4xl md:text-5xl font-bold font-mono ${mainResult.color || "text-blue-400"}`}>
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
                    <span className={`text-sm font-mono font-semibold ${row.valueColor || "text-white"}`}>
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