'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '~/components/LanguageSwitcher';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent hydration mismatch by waiting for client-side render
  if (!isClient) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="text-gray-400">Loading...</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight mb-6">
            {t('landing.hero.title')} <span className="text-blue-400">{t('landing.hero.titleHighlight')}</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8">
            {t('landing.hero.subtitle')}
          </p>
          <p className="text-gray-400 text-lg mb-12">
            {t('landing.hero.description')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="text-3xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-2">{t('landing.features.customizable.title')}</h3>
            <p className="text-gray-400">
              {t('landing.features.customizable.description')}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="text-3xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-2">{t('landing.features.dateBased.title')}</h3>
            <p className="text-gray-400">
              {t('landing.features.dateBased.description')}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="text-3xl mb-4">🖨️</div>
            <h3 className="text-xl font-bold mb-2">{t('landing.features.printReady.title')}</h3>
            <p className="text-gray-400">
              {t('landing.features.printReady.description')}
            </p>
          </div>
        </div>

        {/* Primary CTA */}
        <Link
          href="/journal"
          className="mb-12 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg transition-colors transform hover:scale-105"
        >
          {t('landing.hero.startNow')}
        </Link>

      </div>

      {/* How It Works Section */}
      <div className="bg-gray-900/50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">{t('landing.howItWorks.title')}</h2>
          <p className="text-gray-400 text-center mb-16 text-lg">{t('landing.howItWorks.subtitle')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold">1</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{t('landing.howItWorks.step1.title')}</h3>
                  <p className="text-gray-400 mb-4">
                    {t('landing.howItWorks.step1.description')}
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
                  <h3 className="text-2xl font-bold mb-2">{t('landing.howItWorks.step2.title')}</h3>
                  <p className="text-gray-400 mb-4">
                    {t('landing.howItWorks.step2.description')}
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
                  <h3 className="text-2xl font-bold mb-2">{t('landing.howItWorks.step3.title')}</h3>
                  <p className="text-gray-400 mb-4">
                    {t('landing.howItWorks.step3.description')}
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
                  <h3 className="text-2xl font-bold mb-2">{t('landing.howItWorks.step4.title')}</h3>
                  <p className="text-gray-400 mb-4">
                    {t('landing.howItWorks.step4.description')}
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🖨️</div>
                  <p className="text-gray-400">{t('landing.howItWorks.step4Alt')}</p>
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
              {t('landing.howItWorks.cta')}
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center text-gray-400">
          <p className="text-sm mb-4">
            {t('landing.footer.builtWith')}{' '}
            <Link href="https://create.t3.gg" target="_blank" className="text-blue-400 hover:underline">
              T3 Stack
            </Link>
            {' '}• Next.js • Tailwind CSS • TypeScript
          </p>
          <p className="text-xs text-gray-500">
            {t('landing.footer.tagline')}
          </p>
        </div>
      </footer>
    </main>
  );
}
