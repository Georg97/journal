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

const BackCover = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="text-center mb-[12mm]">
        <div className="text-[18pt] font-bold text-gray-800 mb-[3mm] tracking-wide">
          What I Learned
        </div>
        <div className="text-[9pt] text-gray-500 font-normal">
          A Summary of My Journey
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="mb-[10mm]">
          <div className="text-[11pt] font-semibold text-gray-800 mb-[5mm]">
            Key Insights
          </div>
          <div className="flex-1 border-none bg-[repeating-linear-gradient(to_bottom,transparent,transparent_12px,#f0f0f0_12px,#f0f0f0_13px)] bg-[length:100%_13px] bg-[position:0_0] min-h-[40mm]"></div>
        </div>
      </div>

      <div className="text-center text-[8pt] text-gray-400 pt-[8mm] mt-[8mm] border-t border-gray-300">
        Reflect and grow
      </div>
    </div>
  );
};

const FrontCover = () => {
  return (
    <div className="flex flex-col items-center justify-between text-center h-full">
      <div>
        <div className="text-[32pt] font-bold text-gray-800 mb-[10mm] tracking-[2px]">
          Journal
        </div>
        <div className="w-[80mm] h-[2px] bg-gradient-to-r from-transparent via-gray-800 to-transparent my-[15mm]"></div>
      </div>
      <div className="flex flex-col gap-[12mm] mt-auto pt-[20mm]">
        <div className="flex flex-col gap-[3mm]">
          <div className="text-[9pt] font-semibold text-gray-500 uppercase tracking-wide">
            Journal Name
          </div>
          <div className="border-b border-gray-800 pb-[2mm] text-[11pt] text-gray-800 min-h-[5mm]"></div>
        </div>
        <div className="flex flex-col gap-[3mm]">
          <div className="text-[9pt] font-semibold text-gray-500 uppercase tracking-wide">
            From — To
          </div>
          <div className="border-b border-gray-800 pb-[2mm] text-[11pt] text-gray-800 min-h-[5mm]"></div>
        </div>
      </div>
      <div className="text-[9pt] text-gray-400 mt-[12mm] text-center">
        Begin whenever you&apos;re ready
      </div>
    </div>
  );
};

// Summary/Back Cover A5 Page
export const A5BackCover: React.FC = () => {
  return (
    <div className="w-[105mm] h-[148.5mm] p-[15mm_12mm] flex flex-col bg-white">
      <BackCover />
    </div>
  );
};

// Front Cover A5 Page
export const A5FrontCover: React.FC = () => {
  return (
    <div className="w-[105mm] h-[148.5mm] p-[15mm_12mm] flex flex-col bg-white">
      <FrontCover />
    </div>
  );
};

// Journal Entry A5 Page (for title page bottom sections)
interface A5TitleJournalPageProps {
  date?: Date;
  locale?: string;
  customCategories?: string[];
}

export const A5TitleJournalPage: React.FC<A5TitleJournalPageProps> = ({
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
    <div className="w-[105mm] h-[148.5mm] p-[12mm_10mm] flex flex-col bg-white">
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
