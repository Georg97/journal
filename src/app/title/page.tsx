'use client';

import Link from 'next/link';
import { TitlePage } from '~/components/TitlePage';

export default function TitlePageRoute() {
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
      </div>
      <div className="page-container">
        <TitlePage />
      </div>
    </main>
  );
}
