import Link from 'next/link';

export default function HomePage() {
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
          <Link
            href="/title"
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-6 text-white hover:bg-white/20 transition-colors"
          >
            <h3 className="text-2xl font-bold">Title Page →</h3>
            <div className="text-lg">
              View and print the title page with cover, summary section, and initial journal pages.
            </div>
          </Link>
          <Link
            href="/journal"
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-6 text-white hover:bg-white/20 transition-colors"
          >
            <h3 className="text-2xl font-bold">Full Journal →</h3>
            <div className="text-lg">
              Generate and print a complete journal with customizable number of pages or days.
            </div>
          </Link>
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
