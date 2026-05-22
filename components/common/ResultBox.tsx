import { ReactNode } from "react";

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
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-800">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</h3>
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
              <div className="text-center pb-6 mb-6 border-b border-gray-800">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">{mainResult.label}</div>
                <div className={`text-4xl md:text-5xl font-bold font-mono ${mainResult.color || "text-blue-400"}`}>
                  {mainResult.value}
                </div>
                {mainResult.unit && <div className="text-xs text-gray-500 mt-1">{mainResult.unit}</div>}
                {children}
              </div>
            )}

            {extraRows && extraRows.length > 0 && (
              <div className="space-y-2">
                {extraRows.map((row, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-[#0f1525] rounded-lg border border-gray-800"
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
      </div>
    </div>
  );
}