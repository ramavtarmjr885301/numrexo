import { CalculatorType } from "@/data/calculators";

interface CalculatorCardProps {
  calculator: CalculatorType;
  onClick: () => void;
}

export default function CalculatorCard({ calculator, onClick }: CalculatorCardProps) {
  return (
    <button
      onClick={onClick}
      className="group bg-[#111827] border border-gray-800 rounded-xl p-6 text-left transition-all hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
        style={{ background: calculator.bg }}
      >
        {calculator.icon}
      </div>
      <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">
        {calculator.name}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed mb-4">{calculator.desc}</p>
      <div className="flex flex-wrap gap-2">
        {calculator.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}