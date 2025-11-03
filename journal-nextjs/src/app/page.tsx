'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TitlePage } from '~/components/TitlePage';
import { JournalPage } from '~/components/JournalPage';

export default function HomePage() {
  const [view, setView] = useState<'home' | 'title' | 'journal'>('home');
  const [numPages, setNumPages] = useState<number>(5);
  const [inputValue, setInputValue] = useState<string>('5');

  if (view === 'title') {
    return (
      <main className="min-h-screen bg-gray-100">
        <div className="fixed top-4 left-4 z-10 flex gap-2 print:hidden">
          <button
            onClick={() => setView('home')}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Back to Home
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Print / Save as PDF
          </button>
        </div>
        <div className="page-container">
          <TitlePage />
        </div>
      </main>
    );
  }

  if (view === 'journal') {
    return (
      <main className="min-h-screen bg-gray-100">
        <div className="fixed top-4 left-4 z-10 flex gap-2 print:hidden">
          <button
            onClick={() => setView('home')}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Back to Home
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Print / Save as PDF
          </button>
          <div className="flex items-center gap-2 ml-4">
            <label className="text-gray-800 font-medium">Journal Pages:</label>
            <input
              type="number"
              min="1"
              max="100"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={() => {
                const value = parseInt(inputValue);
                if (!isNaN(value) && value >= 1 && value <= 100) {
                  setNumPages(value);
                } else {
                  setInputValue(numPages.toString());
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const value = parseInt(inputValue);
                  if (!isNaN(value) && value >= 1 && value <= 100) {
                    setNumPages(value);
                  } else {
                    setInputValue(numPages.toString());
                  }
                }
              }}
              className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-600 text-sm">(Title + {numPages} page{numPages !== 1 ? 's' : ''})</span>
          </div>
        </div>
        {/* Title page first */}
        <div className="page-container">
          <TitlePage />
        </div>
        {/* Then all journal pages */}
        {Array.from({ length: numPages }).map((_, index) => (
          <div key={index} className="page-container">
            <JournalPage />
          </div>
        ))}
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          DIY <span className="text-blue-400">Journal</span>
        </h1>
        <p className="text-xl text-gray-300 text-center max-w-2xl">
          Create beautiful printable journal pages in A5 format. Print on A4 paper,
          cut horizontally, and stack to create your physical journal.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <button
            onClick={() => setView('title')}
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-6 text-white hover:bg-white/20 transition-colors"
          >
            <h3 className="text-2xl font-bold">Title Page →</h3>
            <div className="text-lg">
              View and print the title page with cover, summary section, and initial journal pages.
            </div>
          </button>
          <button
            onClick={() => setView('journal')}
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-6 text-white hover:bg-white/20 transition-colors"
          >
            <h3 className="text-2xl font-bold">Journal Pages →</h3>
            <div className="text-lg">
              View and print journal pages with 6 life categories and rating system.
            </div>
          </button>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p className="text-sm">
            Built with{' '}
            <Link href="https://create.t3.gg" target="_blank" className="text-blue-400 hover:underline">
              T3 Stack
            </Link>
            {' '}• Next.js • Tailwind CSS • TypeScript
          </p>
        </div>
      </div>
    </main>
  );
}
