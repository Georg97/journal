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
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [locale, setLocale] = useState<string>('de-DE');
  const [useDateRange, setUseDateRange] = useState<boolean>(false);

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

  // Calculate days between two dates
  const getDaysBetween = (start: string, end: string) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const diffTime = Math.abs(endTime - startTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end date
    return diffDays;
  };

  // Generate array of dates from start to end
  const generateDates = (start: string, totalDays: number): Date[] => {
    const dates: Date[] = [];
    const startDateObj = new Date(start);

    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(startDateObj);
      currentDate.setDate(startDateObj.getDate() + i);
      dates.push(currentDate);
    }

    return dates;
  };

  // Format date for display
  const formatDate = (date: Date, locale: string): string => {
    const dayName = date.toLocaleDateString(locale, { weekday: 'long' });
    const dateStr = date.toLocaleDateString(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    return `${dayName} ${dateStr}`;
  };

  // Generate dates array if using date range
  const dates = useDateRange && startDate
    ? generateDates(startDate, calculateDays(numPages))
    : [];

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="fixed top-4 left-4 right-4 z-10 flex flex-wrap gap-2 print:hidden bg-gray-800/90 p-4 rounded-lg">
        <Link
          href="/"
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Back to Home
        </Link>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Print / Save as PDF
        </button>

        {/* Date Range Toggle */}
        <label className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm cursor-pointer">
          <input
            type="checkbox"
            checked={useDateRange}
            onChange={(e) => setUseDateRange(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-gray-800 font-medium">Use Dates</span>
        </label>

        {useDateRange && (
          <>
            {/* Start Date */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <label className="text-gray-800 font-medium">Start:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (endDate && e.target.value) {
                    const days = getDaysBetween(e.target.value, endDate);
                    const pages = calculatePages(days);
                    setNumPages(pages);
                    setInputValue(pages.toString());
                    setDaysInput(days.toString());
                  }
                }}
                className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Date */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <label className="text-gray-800 font-medium">End:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  if (startDate && e.target.value) {
                    const days = getDaysBetween(startDate, e.target.value);
                    const pages = calculatePages(days);
                    setNumPages(pages);
                    setInputValue(pages.toString());
                    setDaysInput(days.toString());
                  }
                }}
                className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Locale Selector */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <label className="text-gray-800 font-medium">Locale:</label>
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="de-DE">🇩🇪 German</option>
                <option value="en-US">🇺🇸 English (US)</option>
                <option value="en-GB">🇬🇧 English (UK)</option>
                <option value="fr-FR">🇫🇷 French</option>
                <option value="es-ES">🇪🇸 Spanish</option>
                <option value="it-IT">🇮🇹 Italian</option>
              </select>
            </div>

            {/* Date Range Info */}
            {startDate && endDate && (
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-gray-800 text-sm">
                  📅 {getDaysBetween(startDate, endDate)} days = {numPages} page{numPages !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </>
        )}

        {!useDateRange && (
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
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
        )}
      </div>
      {/* Title page first */}
      <div className="page-container">
        <TitlePage
          dates={dates.length > 0 ? dates.slice(0, 2) : []}
          locale={locale}
        />
      </div>
      {/* Then all journal pages */}
      {Array.from({ length: numPages }).map((_, index) => {
        const pageStartIndex = 2 + (index * 4); // Title page has 2 days, each page has 4
        const pageDates = dates.length > 0 ? dates.slice(pageStartIndex, pageStartIndex + 4) : [];
        return (
          <div key={index} className="page-container">
            <JournalPage dates={pageDates} locale={locale} />
          </div>
        );
      })}
    </main>
  );
}
