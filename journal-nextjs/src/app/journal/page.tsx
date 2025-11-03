'use client';

import { useState } from 'react';
import Link from 'next/link';
import { A5JournalPage } from '~/components/A5JournalPage';
import { A5BackCover, A5FrontCover, A5TitleJournalPage } from '~/components/A5TitlePages';

export default function JournalPageRoute() {
  // Get today's date in YYYY-MM-DD format
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [numPages, setNumPages] = useState<number>(5);
  const [inputValue, setInputValue] = useState<string>('5');
  const inputMode = 'days';
  const [daysInput, setDaysInput] = useState<string>('22');
  const [startDate, setStartDate] = useState<string>(getTodayString());
  const [endDate, setEndDate] = useState<string>('');
  const [locale, setLocale] = useState<string>('de-DE');
  const [useDateRange, setUseDateRange] = useState<boolean>(true);
  const [customCategories, setCustomCategories] = useState<string[]>([
    'Ernährung & Gewicht',
    'Fitness & Physis',
    'Sozial- und Beziehungsleben',
    'Kreative Entfaltung, Kunst, Musik & Projekte',
    'Sauberkeit & Ordnung',
    'Finanzen',
  ]);
  const [showCategoryEditor, setShowCategoryEditor] = useState<boolean>(false);

  // Calculate total A5 pages (days)
  const calculateTotalA5Pages = () => {
    if (useDateRange && startDate && endDate) {
      return getDaysBetween(startDate, endDate);
    }
    return inputMode === 'days' ? parseInt(daysInput) || 0 : calculateDaysFromPages(parseInt(inputValue) || 0);
  };

  // Calculate days from A4 pages (deprecated but kept for non-date mode)
  const calculateDaysFromPages = (a4Pages: number) => {
    const titlePageDays = 2; // Title page has 2 journal sections at the bottom
    const additionalDays = a4Pages * 4; // Each A4 page has 4 A5 sections
    return titlePageDays + additionalDays;
  };

  // Calculate A4 pages needed for target days (deprecated but kept for non-date mode)
  const calculatePages = (days: number) => {
    if (days <= 2) return 0; // Title page alone provides 2 days
    const remainingDays = days - 2;
    return Math.ceil(remainingDays / 4); // Each A4 page provides 4 days
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

  // Get total days and generate dates
  const totalDays = calculateTotalA5Pages();
  const dates = useDateRange && startDate && endDate
    ? generateDates(startDate, totalDays)
    : generateDates(startDate || getTodayString(), totalDays);

  // Group A5 pages into A4 sheets (2x2 grid = 4 A5 pages per A4)
  const groupA5IntoA4 = (a5Pages: (Date | undefined)[]): (Date | undefined)[][] => {
    const a4Sheets: (Date | undefined)[][] = [];
    for (let i = 0; i < a5Pages.length; i += 4) {
      a4Sheets.push(a5Pages.slice(i, i + 4));
    }
    return a4Sheets;
  };

  // Prepare A5 pages: All pages including title pages
  const allA5Pages = dates.length > 0 ? dates : [];

  // Title page has 4 A5 sections: Back Cover, Front Cover, 2 Journal pages
  // We need at least 2 dates for the journal sections on title page
  const titleA5Dates = allA5Pages.slice(0, 2); // First 2 dates for title page journal sections
  const journalA5Dates = allA5Pages.slice(2); // Rest for journal pages

  // Group all pages into A4 sheets
  const journalA4Sheets = groupA5IntoA4(journalA5Dates);

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

        {/* Category Editor Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowCategoryEditor(!showCategoryEditor)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 flex items-center justify-between"
          >
            <span>✏️ Edit Categories ({customCategories.length})</span>
            <span>{showCategoryEditor ? '▼' : '▶'}</span>
          </button>
        </div>

        {showCategoryEditor && (
          <div className="mb-6 space-y-2 bg-gray-700 p-4 rounded">
            <div className="text-sm font-medium mb-2">Categories (Max 10)</div>
            {customCategories.map((category, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={category}
                  onChange={(e) => {
                    const newCategories = [...customCategories];
                    newCategories[index] = e.target.value;
                    setCustomCategories(newCategories);
                  }}
                  className="flex-1 px-2 py-1 bg-gray-600 border border-gray-500 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder={`Category ${index + 1}`}
                />
                <button
                  onClick={() => {
                    const newCategories = customCategories.filter((_, i) => i !== index);
                    setCustomCategories(newCategories);
                  }}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
            {customCategories.length < 10 && (
              <button
                onClick={() => setCustomCategories([...customCategories, ''])}
                className="w-full px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                + Add Category
              </button>
            )}
            <div className="text-xs text-gray-400 mt-2">
              Total: /{customCategories.length * 10}
            </div>
          </div>
        )}

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
                    setDaysInput(calculateDaysFromPages(numPages).toString());
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
                      setDaysInput(calculateDaysFromPages(numPages).toString());
                    }
                  }
                }}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <div className="mt-2 text-sm text-gray-300">
                = {numPages} page{numPages !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-80 print:ml-0">
        {/* Title page - A4 sheet with 4 A5 sections */}
        {totalDays > 0 && (
          <div className="w-[210mm] h-[297mm] mx-auto my-[10mm] bg-white grid grid-cols-2 grid-rows-2 gap-0 shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden print:m-0 print:shadow-none page-container">
            {/* Top-Left: Back Cover / Summary */}
            <div className="border-r-2 border-b-2 border-dashed border-gray-500 print:border-none">
              <A5BackCover />
            </div>
            {/* Top-Right: Front Cover */}
            <div className="border-b-2 border-dashed border-gray-500 print:border-none">
              <A5FrontCover />
            </div>
            {/* Bottom-Left: First Journal Page (only if we have at least 1 day) */}
            <div className="border-r-2 border-dashed border-gray-500 print:border-none">
              {titleA5Dates[0] ? (
                <A5TitleJournalPage
                  date={titleA5Dates[0]}
                  locale={locale}
                  customCategories={customCategories}
                />
              ) : (
                <div className="w-[105mm] h-[148.5mm] bg-gray-50"></div>
              )}
            </div>
            {/* Bottom-Right: Second Journal Page (only if we have at least 2 days) */}
            <div className="print:border-none">
              {titleA5Dates[1] ? (
                <A5TitleJournalPage
                  date={titleA5Dates[1]}
                  locale={locale}
                  customCategories={customCategories}
                />
              ) : (
                <div className="w-[105mm] h-[148.5mm] bg-gray-50"></div>
              )}
            </div>
          </div>
        )}

        {/* Then all journal A4 sheets */}
        {journalA4Sheets.map((a4Sheet, sheetIndex) => (
          <div
            key={sheetIndex}
            className="w-[210mm] h-[297mm] mx-auto my-[10mm] bg-white grid grid-cols-2 grid-rows-2 gap-0 shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden print:m-0 print:shadow-none page-container"
          >
            {/* Top-Left A5 */}
            <div className="border-r-2 border-b-2 border-dashed border-gray-500 print:border-none">
              {a4Sheet[0] ? (
                <A5JournalPage
                  date={a4Sheet[0]}
                  locale={locale}
                  customCategories={customCategories}
                />
              ) : (
                <div className="w-[105mm] h-[148.5mm] bg-gray-50"></div>
              )}
            </div>
            {/* Top-Right A5 */}
            <div className="border-b-2 border-dashed border-gray-500 print:border-none">
              {a4Sheet[1] ? (
                <A5JournalPage
                  date={a4Sheet[1]}
                  locale={locale}
                  customCategories={customCategories}
                />
              ) : (
                <div className="w-[105mm] h-[148.5mm] bg-gray-50"></div>
              )}
            </div>
            {/* Bottom-Left A5 */}
            <div className="border-r-2 border-dashed border-gray-500 print:border-none">
              {a4Sheet[2] ? (
                <A5JournalPage
                  date={a4Sheet[2]}
                  locale={locale}
                  customCategories={customCategories}
                />
              ) : (
                <div className="w-[105mm] h-[148.5mm] bg-gray-50"></div>
              )}
            </div>
            {/* Bottom-Right A5 */}
            <div className="print:border-none">
              {a4Sheet[3] ? (
                <A5JournalPage
                  date={a4Sheet[3]}
                  locale={locale}
                  customCategories={customCategories}
                />
              ) : (
                <div className="w-[105mm] h-[148.5mm] bg-gray-50"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
