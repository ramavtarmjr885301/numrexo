export default function AboutPage() {
  return (
    <div className="px-6 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About Numrexo</h1>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-8">
          <p className="text-gray-300 leading-relaxed mb-4">
            Numrexo is a free, fast, and SEO-optimized calculator platform built to help users make informed decisions.
            Our calculators are built with accuracy, speed, and mobile-first design in mind.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            No login required — ever. All calculations happen in your browser, ensuring your privacy is protected.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Whether you're tracking your health metrics, planning a loan, or calculating taxes,
            Numrexo provides instant, accurate results with a clean, intuitive interface.
          </p>
        </div>
      </div>
    </div>
  );
}