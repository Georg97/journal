import React from 'react';
import { categories, getTotalPoints } from '~/lib/categories';

interface JournalEntryProps {
  category: string;
  date?: string;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ category, date }) => {
  return (
    <div className="flex flex-1 flex-col mb-0">
      {date && (
        <div className="text-[7pt] text-gray-400 mb-1 font-normal">
          {date}
        </div>
      )}
      <div className="flex items-center justify-between border-b border-gray-500 pb-1 mb-1.5 text-gray-500 flex-shrink-0">
        <span className="text-[8pt] font-bold">{category}</span>
        <span className="text-[7pt] font-normal">/10</span>
      </div>
      <div className="flex-1 border-b border-gray-300 mb-0 relative bg-[repeating-linear-gradient(to_bottom,transparent,transparent_18px,#f0f0f0_18px,#f0f0f0_19px)] bg-[length:100%_19px] bg-[position:0_0] last:border-b-0"></div>
    </div>
  );
};

const SummarySection = () => {
  const totalPoints = getTotalPoints();

  return (
    <div className="flex flex-row gap-[8mm] mt-[2mm] text-[6pt] text-gray-400">
      <div className="flex gap-[2mm] items-center">
        <span className="font-normal">Total</span>
        <span className="border-b-[0.5px] border-gray-400 w-[10mm] text-right">/{totalPoints}</span>
      </div>
      <div className="flex gap-[2mm] items-center">
        <span className="font-normal">Rating</span>
        <span className="border-b-[0.5px] border-gray-400 w-[10mm] text-right">= /10</span>
      </div>
    </div>
  );
};

interface A5JournalPageProps {
  date?: Date;
  locale?: string;
  customCategories?: string[];
}

export const A5JournalPage: React.FC<A5JournalPageProps> = ({
  date,
  locale = 'de-DE',
  customCategories
}) => {
  const categoriesToUse = customCategories && customCategories.length > 0 ? customCategories : categories;
  const totalPoints = categoriesToUse.length * 10;

  const formatDate = (date: Date): string => {
    const dayName = date.toLocaleDateString(locale, { weekday: 'long' });
    const dateStr = date.toLocaleDateString(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    return `${dayName} ${dateStr}`;
  };

  return (
    <div className="w-[105mm] h-[148.5mm] p-[12mm_10mm] flex flex-col border border-gray-200 print:border-none overflow-hidden bg-white">
      {categoriesToUse.map((category, index) => (
        <JournalEntry
          key={index}
          category={category}
          date={index === 0 && date ? formatDate(date) : undefined}
        />
      ))}
      <div className="flex flex-row gap-[8mm] mt-[2mm] text-[6pt] text-gray-400">
        <div className="flex gap-[2mm] items-center">
          <span className="font-normal">Total</span>
          <span className="border-b-[0.5px] border-gray-400 w-[10mm] text-right">/{totalPoints}</span>
        </div>
        <div className="flex gap-[2mm] items-center">
          <span className="font-normal">Rating</span>
          <span className="border-b-[0.5px] border-gray-400 w-[10mm] text-right">= /10</span>
        </div>
      </div>
    </div>
  );
};
