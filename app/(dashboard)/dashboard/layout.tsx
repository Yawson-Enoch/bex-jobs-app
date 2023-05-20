import DashboardHeader from '@/components/layout/dashboard-header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-grid-container relative min-h-screen">
      <div className="dashboard-header sticky top-0">
        <DashboardHeader />
      </div>
      <div className="dashboard-sidebar sticky top-0 hidden max-h-screen w-60 overflow-y-scroll overscroll-y-contain border-r bg-background/90 backdrop-blur-sm md:block"></div>
      <main className="dashboard-main">{children}</main>
      {/* decorative pattern */}
      <div
        aria-hidden="true"
        className="pattern-boxes fixed inset-0 -z-10 flex overflow-hidden pattern-bg-transparent pattern-gray-400 pattern-opacity-10 pattern-size-4 dark:pattern-gray-800"
        style={{
          maskImage: `linear-gradient(-45deg, rgb(var(--background)), transparent 70%)`,
          WebkitMaskImage: `linear-gradient(-45deg, rgb(var(--background)), transparent 70%)`,
        }}
      ></div>
    </div>
  );
}
