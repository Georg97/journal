'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TitlePage } from '~/components/TitlePage';
import { JournalPage } from '~/components/JournalPage';

export default function JournalPageRoute() {
  // Get today's date in YYYY-MM-DD format
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [numPages, setNumPages] = useState<number>(5);
  const [inputValue, setInputValue] = useState<string>('5');
  const [inputMode, setInputMode] = useState<'pages' | 'days'>('days');
  const [daysInput, setDaysInput] = useState<string>('22');
  const [startDate, setStartDate] = useState<string>(getTodayString());
  const [endDate, setEndDate] = useState<string>('');
  const [locale, setLocale] = useState<string>('de-DE');
  const [useDateRange, setUseDateRange] = useState<boolean>(true);

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
    <main className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 text-white p-6 print:hidden overflow-y-auto fixed left-0 top-0 bottom-0 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Journal Settings</h2>

        {/* Navigation */}
        <div className="mb-6 space-y-2">
          <Link
            href="/"
            className="block w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 text-center"
          >
            ← Back to Home
          </Link>
          <button
            onClick={() => window.print()}
            className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            🖨️ Print / Save as PDF
          </button>
        </div>

        <hr className="border-gray-600 my-6" />

        {/* Date Range Toggle */}
        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer bg-gray-700 p-3 rounded hover:bg-gray-600">
            <input
              type="checkbox"
              checked={useDateRange}
              onChange={(e) => setUseDateRange(e.target.checked)}
              className="w-5 h-5"
            />
            <span className="font-medium">Use Date Range</span>
          </label>
        </div>

        {useDateRange ? (
          <div className="space-y-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
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
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
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
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>

            {/* Locale Selector */}
            <div>
              <label className="block text-sm font-medium mb-2">Date Format</label>
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
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
              <div className="bg-blue-600 p-3 rounded">
                <div className="text-sm font-medium">
                  📅 {getDaysBetween(startDate, endDate)} days
                </div>
                <div className="text-sm text-blue-100">
                  = {numPages} page{numPages !== 1 ? 's' : ''}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Mode Toggle */}
            <div>
              <label className="block text-sm font-medium mb-2">Input Mode</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setInputMode('pages')}
                  className={`flex-1 px-4 py-2 rounded font-medium transition-colors ${
                    inputMode === 'pages'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Pages
                </button>
                <button
                  onClick={() => setInputMode('days')}
                  className={`flex-1 px-4 py-2 rounded font-medium transition-colors ${
                    inputMode === 'days'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Days
                </button>
              </div>
            </div>

            {inputMode === 'pages' ? (
              <div>
                <label className="block text-sm font-medium mb-2">Number of Pages</label>
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
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
                <div className="mt-2 text-sm text-gray-300">
                  = {calculateDays(numPages)} days
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">Number of Days</label>
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
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
                <div className="mt-2 text-sm text-gray-300">
                  = {numPages} page{numPages !== 1 ? 's' : ''}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-80 print:ml-0">
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
      </div>
    </main>
  );
}
