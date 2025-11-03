'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TitlePage } from '~/components/TitlePage';
import { JournalPage } from '~/components/JournalPage';

export default function JournalPageRoute() {
  const [numPages, setNumPages] = useState<number>(5);
  const [inputValue, setInputValue] = useState<string>('5');
  const [inputMode, setInputMode] = useState<'pages' | 'days'>('days');
  const [daysInput, setDaysInput] = useState<string>('22');

  // Calculate total days: Title page has 2 journal sections (bottom left & bottom right)
  // Each additional journal page has 4 sections (2x2 grid)
  const calculateDays = (pages: number) => {
    const titlePageDays = 2; // Title page has 2 journal sections at the bottom
    const additionalDays = pages * 4; // Each journal page has 4 A5 sections
    return titlePageDays + additionalDays;
  };

  // Calculate pages needed for target days
  const calculatePages = (days: number) => {
    if (days <= 2) return 0; // Title page alone provides 2 days
    const remainingDays = days - 2;
    return Math.ceil(remainingDays / 4); // Each page provides 4 days
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="fixed top-4 left-4 z-10 flex gap-2 print:hidden">
        <Link
          href="/"
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Back to Home
        </Link>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Print / Save as PDF
        </button>
        <div className="flex items-center gap-2 ml-4 bg-white px-4 py-2 rounded-lg shadow-sm">
          <div className="flex gap-2">
            <button
              onClick={() => setInputMode('pages')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                inputMode === 'pages'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pages
            </button>
            <button
              onClick={() => setInputMode('days')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                inputMode === 'days'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Days
            </button>
          </div>

          {inputMode === 'pages' ? (
            <>
              <label className="text-gray-800 font-medium">Pages:</label>
              <input
                type="number"
                min="0"
                max="100"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={() => {
                  const value = parseInt(inputValue);
                  if (!isNaN(value) && value >= 0 && value <= 100) {
                    setNumPages(value);
                    setDaysInput(calculateDays(value).toString());
                  } else {
                    setInputValue(numPages.toString());
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const value = parseInt(inputValue);
                    if (!isNaN(value) && value >= 0 && value <= 100) {
                      setNumPages(value);
                      setDaysInput(calculateDays(value).toString());
                    } else {
                      setInputValue(numPages.toString());
                    }
                  }
                }}
                className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-600 text-sm">
                = {calculateDays(numPages)} days
              </span>
            </>
          ) : (
            <>
              <label className="text-gray-800 font-medium">Days:</label>
              <input
                type="number"
                min="1"
                max="402"
                value={daysInput}
                onChange={(e) => setDaysInput(e.target.value)}
                onBlur={() => {
                  const value = parseInt(daysInput);
                  if (!isNaN(value) && value >= 1 && value <= 402) {
                    const pages = calculatePages(value);
                    setNumPages(pages);
                    setInputValue(pages.toString());
                    setDaysInput(value.toString());
                  } else {
                    setDaysInput(calculateDays(numPages).toString());
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const value = parseInt(daysInput);
                    if (!isNaN(value) && value >= 1 && value <= 402) {
                      const pages = calculatePages(value);
                      setNumPages(pages);
                      setInputValue(pages.toString());
                      setDaysInput(value.toString());
                    } else {
                      setDaysInput(calculateDays(numPages).toString());
                    }
                  }
                }}
                className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-600 text-sm">
                = {numPages} page{numPages !== 1 ? 's' : ''}
              </span>
            </>
          )}
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
