import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight mb-6">
            Create Your Own <span className="text-blue-400">Printable Journal</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8">
            Design beautiful, personalized journal pages in A5 format. Print on A4 paper,
            cut horizontally, and bind them into your perfect custom journal.
          </p>
          <p className="text-gray-400 text-lg mb-12">
            Customize categories, set date ranges, and generate the exact number of pages you need.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="text-3xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-2">Fully Customizable</h3>
            <p className="text-gray-400">
              Edit categories, choose locale, and personalize your journal to match your needs.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="text-3xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-2">Date-Based Generation</h3>
            <p className="text-gray-400">
              Set start and end dates to automatically generate the perfect number of journal pages.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="text-3xl mb-4">🖨️</div>
            <h3 className="text-xl font-bold mb-2">Print Ready</h3>
            <p className="text-gray-400">
              Export to PDF and print on standard A4 paper. No waste, no hassle.
            </p>
          </div>
        </div>

        {/* Primary CTA */}
        <Link
          href="/journal"
          className="mb-12 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg transition-colors transform hover:scale-105"
        >
          🚀 Start Now
        </Link>

      </div>

      {/* How It Works Section */}
      <div className="bg-gray-900/50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-gray-400 text-center mb-16 text-lg">Get started in just a few simple steps</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold">1</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Customize Your Categories</h3>
                  <p className="text-gray-400 mb-4">
                    Click "Edit Categories" to personalize the tracking categories for your journal. Add, remove, or modify up to 10 categories that matter to you.
                  </p>
                </div>
              </div>
              <img
                src="/product-images/categories-section-opened.jpg"
                alt="Categories editor showing customizable categories"
                className="rounded-lg border border-gray-700 w-full"
              />
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold">2</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Choose Your Date Range</h3>
                  <p className="text-gray-400 mb-4">
                    Enable "Use Date Range" to set start and end dates, or disable it to manually enter the number of days you need.
                  </p>
                </div>
              </div>
              <img
                src="/product-images/marked-use-date-range-checkbox.jpg"
                alt="Date range checkbox in journal settings"
                className="rounded-lg border border-gray-700 w-full"
              />
            </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold">3</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Preview Your Journal</h3>
                  <p className="text-gray-400 mb-4">
                    See your custom journal pages with your categories, dates, and layout in real-time. Each page includes space for daily tracking and reflection.
                  </p>
                </div>
              </div>
              <img
                src="/product-images/full-journal-page.jpg"
                alt="Full journal page preview"
                className="rounded-lg border border-gray-700 w-full"
              />
            </div>

            {/* Step 4 */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold">4</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Print & Assemble</h3>
                  <p className="text-gray-400 mb-4">
                    Click "Print / Save as PDF" to generate your journal. Print on A4 paper, cut horizontally to create A5 pages, and bind them together.
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🖨️</div>
                  <p className="text-gray-400">Your custom journal is ready to print!</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA after instructions */}
          <div className="text-center mt-16">
            <Link
              href="/journal"
              className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg transition-colors transform hover:scale-105"
            >
              Create Your Journal Now
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center text-gray-400">
          <p className="text-sm mb-4">
            Built with{' '}
            <Link href="https://create.t3.gg" target="_blank" className="text-blue-400 hover:underline">
              T3 Stack
            </Link>
            {' '}• Next.js • Tailwind CSS • TypeScript
          </p>
          <p className="text-xs text-gray-500">
            Design your journal, print it, and start journaling today.
          </p>
        </div>
      </footer>
    </main>
  );
}
