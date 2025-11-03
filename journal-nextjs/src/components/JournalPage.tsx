import React from 'react';

const categories = [
  'Ernährung & Gewicht',
  'Fitness & Physis',
  'Sozial- und Beziehungsleben',
  'Kreative Entfaltung, Kunst, Musik & Projekte',
  'Sauberkeit & Ordnung',
  'Finanzen',
];

interface JournalEntryProps {
  category: string;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ category }) => {
  return (
    <div className="flex flex-1 flex-col mb-0">
      <div className="flex items-center justify-between border-b border-gray-500 pb-1 mb-1.5 text-gray-500 flex-shrink-0">
        <span className="text-[8pt] font-bold">{category}</span>
        <span className="text-[7pt] font-normal">/10</span>
      </div>
      <div className="flex-1 border-b border-gray-300 mb-0 relative bg-[repeating-linear-gradient(to_bottom,transparent,transparent_18px,#f0f0f0_18px,#f0f0f0_19px)] bg-[length:100%_19px] bg-[position:0_0] last:border-b-0"></div>
    </div>
  );
};

const SummarySection = () => {
  return (
    <div className="flex flex-row gap-[8mm] mt-[2mm] text-[6pt] text-gray-400">
      <div className="flex gap-[2mm] items-center">
        <span className="font-normal">Total</span>
        <span className="border-b-[0.5px] border-gray-400 w-[10mm] text-right">/60</span>
      </div>
      <div className="flex gap-[2mm] items-center">
        <span className="font-normal">Rating</span>
        <span className="border-b-[0.5px] border-gray-400 w-[10mm] text-right">= /10</span>
      </div>
    </div>
  );
};

interface A5PageProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const A5Page: React.FC<A5PageProps> = ({ position }) => {
  const borderClasses = {
    'top-left': 'border-r-2 border-b-2 border-dashed border-gray-500 print:border-none',
    'top-right': 'border-b-2 border-dashed border-gray-500 print:border-none',
    'bottom-left': 'border-r-2 border-dashed border-gray-500 print:border-none',
    'bottom-right': 'print:border-none',
  };

  return (
    <div
      className={`w-full h-full p-[12mm_10mm] flex flex-col border border-gray-200 print:border-none overflow-hidden ${borderClasses[position]}`}
    >
      {categories.map((category, index) => (
        <JournalEntry key={index} category={category} />
      ))}
      <SummarySection />
    </div>
  );
};

export const JournalPage = () => {
  return (
    <div className="w-[210mm] h-[297mm] mx-auto my-[10mm] bg-white grid grid-cols-2 grid-rows-2 gap-0 shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden print:m-0 print:shadow-none">
      <A5Page position="top-left" />
      <A5Page position="top-right" />
      <A5Page position="bottom-left" />
      <A5Page position="bottom-right" />
    </div>
  );
};
