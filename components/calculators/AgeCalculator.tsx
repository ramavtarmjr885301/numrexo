"use client";

import { useEffect, useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
  { q: "How is my exact age calculated?", a: "The calculator counts whole years from your birth date to today, then whole months from your last birthday, then the leftover days. It does not divide by 365. That distinction matters: 30 April to 31 May is one month, and so is 31 January to 28 February, even though one is 31 days and the other 28. Counting in calendar units is how age is stated on every form that asks for it." },
  { q: "Why does the day count sometimes look off by one?", a: "Because the last partial month is measured against the length of the previous month, not a fixed 30 days. Someone born on the 31st has no 31st in a 30-day month, so the calculator rolls back to the end of that month before counting the remaining days. Every method has to make a choice here, and different tools make different ones — which is why two calculators can disagree by a day on the same birth date." },
  { q: "Does it account for leap years?", a: "Yes. The total-days figure counts the actual days that passed, leap days included, so anyone who has lived through a 29 February has that day in their total. The years-months-days figure is unaffected: a leap day does not add or remove a birthday." },
  { q: "What happens if I was born on 29 February?", a: "You get a birthday in leap years and a decision to make in the other three. Most legal systems treat 1 March as the day the age changes, on the reasoning that the full year is complete by then; a few treat 28 February as the anniversary. This calculator uses 1 March for the years-months-days figure. If it matters for a document, check the rule in the jurisdiction asking." },
  { q: "How many days old am I?", a: "The total-days figure above answers exactly that: the number of complete days between your birth date and today. It is a favourite for milestone posts — 10,000 days is just over 27 years and 4 months, 20,000 days a little over 54 years, and 1 billion seconds arrives at roughly 31 years and 8 months." },
  { q: "Where does an exact age actually get used?", a: "School entry cut-offs, visa and passport applications, insurance underwriting, paediatric medicine dosing by age in months, pension and annuity start dates, and any legal threshold — driving, voting, contracts, retirement. In most of these the day matters, not the year, which is why 'about 34' is not an answer any of them accept." },
  { q: "What is the difference between age in months and total months?", a: "Age in months is your years multiplied by twelve plus the leftover months — the figure a paediatrician or a nursery admissions form wants. Total months is the same number; what differs is the days column beside it, which shows how far into the current month you are. For an infant, that column is usually the one being asked about." },
  { q: "What is a lunar age, and why do some countries count differently?", a: "East Asian age reckoning traditionally counts a baby as one year old at birth and adds a year on New Year rather than on the birthday, which puts a person one or two years ahead of their international age. South Korea moved to international age for official purposes in June 2023, though the traditional count is still heard socially. This calculator gives international age." },
  { q: "Can I use this to work out someone else's age?", a: "Yes — enter their birth date instead of yours. It is the usual way to check whether a child meets a school cut-off, whether a relative has reached a pension age, or how old someone was on a particular past date, which genealogy work needs constantly." },
  { q: "Is my birth date stored anywhere?", a: "No. The calculation runs in your browser and nothing is sent to a server or written down. Close the tab and it is gone." },
];

export default function AgeCalculator() {
  const [day, setDay] = useState("15");
  const [month, setMonth] = useState("6");
  const [year, setYear] = useState("1990");
  const [result, setResult] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculate = () => {
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();

    if (isNaN(birthDate.getTime())) { setResult(null); return; }
    if (birthDate > today) { setResult(null); return; }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) { months--; const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0); days += lastMonth.getDate(); }
    if (months < 0) { years--; months += 12; }

    const totalDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResult({ years, months, days, totalDays, totalWeeks, totalMonths, daysToNextBirthday });
  };

  // Results update as you type — the answer is no longer hidden behind a button press.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { calculate(); }, [day, month, year]);

  const resetForm = () => {
    setDay("15");
    setMonth("6");
    setYear("1990");
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <li><a href="https://numrexo.com" className="hover:text-gray-300">Home</a></li>
          <li className="text-gray-700">/</li>
          <li><a href="https://numrexo.com/math" className="hover:text-gray-300">Math Calculators</a></li>
          <li className="text-gray-700">/</li>
          <li><span className="text-gray-300">Age Calculator</span></li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Birth Date</h3></div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div><label className="block text-xs font-semibold text-gray-400 mb-2">Day</label><input type="number" placeholder="15" min="1" max="31" value={day} onChange={(e) => setDay(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /></div>
              <div><label className="block text-xs font-semibold text-gray-400 mb-2">Month</label><input type="number" placeholder="6" min="1" max="12" value={month} onChange={(e) => setMonth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /></div>
              <div><label className="block text-xs font-semibold text-gray-400 mb-2">Year</label><input type="number" placeholder="1990" min="1900" max={new Date().getFullYear()} value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /></div>
            </div>
            <div className="flex gap-3">
              <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-pink-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Age →</button>
              <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
            </div>
          </div>
        </div>

        <ResultBox
          title="Your Age"
          isEmpty={!result}
          emptyIcon="🎂"
          emptyText="Enter a birth date to see the exact age"
          mainResult={result ? { label: "Your Exact Age", value: `${result.years} years, ${result.months} months, ${result.days} days`, color: "text-pink-400" } : undefined}
          extraRows={result ? [
            { label: "Total Months", value: `${result.totalMonths} months` },
            { label: "Total Weeks", value: `${result.totalWeeks} weeks` },
            { label: "Total Days", value: `${result.totalDays.toLocaleString()} days` },
            { label: "Days Until Next Birthday", value: `${result.daysToNextBirthday} days` },
          ] : undefined}
        />
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">About This Age Calculator</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          This tool gives your age the way official forms ask for it: whole years, then whole months since your
          last birthday, then the days left over. It also gives the running totals — months, weeks and days lived —
          which are the numbers people usually want for a milestone rather than a form.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          Everything is worked out in your browser from the date you type. Nothing is sent anywhere, and nothing is
          stored.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">How the Calculation Works</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 space-y-3">
          <p className="text-white font-mono text-sm">years, months, days = calendar difference (today − birth date)</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            The count goes in calendar units, not in fixed 30-day blocks. Whole years come off first, then whole
            months from the last birthday, then whatever days remain. If the day-of-month has not been reached yet,
            one month is borrowed and its actual length — 28, 29, 30 or 31 days — is added to the day count.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            The total-days figure is measured separately, as the real elapsed time between the two dates, so every
            leap day you have lived through is included in it.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">A Worked Example</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            Take a birth date of <span className="text-white">31 March 2000</span> and a current date of{" "}
            <span className="text-white">30 June 2024</span>.
          </p>
          <ul className="text-gray-400 text-sm space-y-1.5 list-disc list-inside">
            <li>Whole years from 31 March 2000 to 31 March 2024: <span className="text-white">24</span></li>
            <li>Whole months from 31 March 2024 to 30 June 2024: June has no 31st, so the count borrows from May and lands at <span className="text-white">2 months and 30 days</span></li>
            <li>Elapsed days across the whole period, leap days included: <span className="text-white">8,857</span></li>
          </ul>
          <p className="text-gray-500 text-xs mt-3">
            This is the edge case where calculators disagree. Some report 2 months 30 days, others 3 months 0 days.
            Neither is wrong; they resolve the missing 31st differently.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Where an Exact Age Is Needed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-pink-400 mb-2">School and nursery admission</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Entry cut-offs are set to a date, not a year. A child born days either side of it can start a full year apart, so the exact age on the cut-off date is what decides the place.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-pink-400 mb-2">Medicine and paediatrics</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Dosage and vaccination schedules for young children are set in months, not years. Growth charts are plotted the same way, which is why the months figure matters far more than the years one early on.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-pink-400 mb-2">Legal thresholds</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Driving, voting, signing a contract, drawing a pension — each turns on a birthday, and in most systems the age changes at the start of the birthday itself rather than at the moment of birth.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-pink-400 mb-2">Forms and applications</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Visa, passport and insurance forms often ask for age as at a specific date rather than today. Enter that date&apos;s figures and read the years-months-days line.</p>
          </div>
        </div>
      </section>

      <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
    </>
  );
}