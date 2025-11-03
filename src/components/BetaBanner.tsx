export function BetaBanner() {
  const deployment = process.env.DEPLOYMENT;

  if (deployment !== 'beta') {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-400 text-black text-center py-2 px-4 font-bold z-[100] print:hidden">
      <span className="text-sm md:text-base">
        ⚠️ BETA VERSION - This is a preview deployment
      </span>
    </div>
  );
}
