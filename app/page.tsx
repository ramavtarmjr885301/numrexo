"use client";

import { useRouter } from "next/navigation";
import { Calculator, Zap, Smartphone, Lock, TrendingUp } from "lucide-react";
import CalculatorCard from "@/components/common/CalculatorCard";
import { CALCULATORS } from "@/data/calculators";

export default function HomePage() {
  const router = useRouter();

  const benefits = [
    { icon: Zap, title: "Lightning Fast", desc: "Instant results without page reloads. No waiting, no lag." },
    { icon: Smartphone, title: "Mobile First", desc: "Optimized for all screen sizes — phone, tablet, or desktop." },
    { icon: Lock, title: "Privacy Safe", desc: "All calculations happen in your browser. We never store your data." },
    { icon: TrendingUp, title: "SEO Optimized", desc: "Content-rich pages with structured data for better discoverability." },
  ];

  const stats = [
    { value: "10+", label: "Calculators" },
    { value: "100%", label: "Free Forever" },
    { value: "0", label: "Sign-up Required" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative px-6 py-16 md:py-20 lg:py-24 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(59,130,246,0.12)_0%,transparent_70%)]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
            <span className="text-sm font-semibold text-blue-400">✦ Free · Fast · Accurate</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Smart Calculators<br />
            for <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Every Need</span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Accurate, free online calculators for health, finance, and more — designed for speed and simplicity.
          </p>
          
          <button
            onClick={() => router.push("/calculators")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            <Calculator size={20} />
            Browse Calculators →
          </button>
          
          <div className="flex justify-center gap-8 md:gap-12 mt-12 pt-8 border-t border-gray-800">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold font-mono">
                  {stat.value}<span className="text-blue-500">{stat.value.includes("+") ? "+" : stat.value.includes("%") ? "%" : ""}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators Section */}
      <section className="px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Popular Tools</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-3">Our Calculators</h2>
            <p className="text-gray-400">Accurate results, clean UI, no registration required.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CALCULATORS.map((calc) => (
              <CalculatorCard key={calc.id} calculator={calc} onClick={() => router.push(calc.path)} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-12 md:py-16 bg-[#0f1525]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Why Numrexo</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Built for Everyone</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
                <benefit.icon className="w-10 h-10 text-blue-400 mb-4" />
                <h4 className="text-lg font-bold mb-2">{benefit.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
