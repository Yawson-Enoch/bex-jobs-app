import DashboardHeader from '@/components/layout/dashboard-header';
import DashboardSidebar from '@/components/layout/dashboard-sidebar';

function DecorativePattern() {
  return (
    <div
      aria-hidden="true"
      className="pattern-boxes fixed inset-0 -z-10 flex overflow-hidden pattern-bg-transparent pattern-gray-400 pattern-opacity-10 pattern-size-4 dark:pattern-gray-800"
      style={{
        maskImage: `linear-gradient(-45deg, rgb(var(--background)), transparent 70%)`,
        WebkitMaskImage: `linear-gradient(-45deg, rgb(var(--background)), transparent 70%)`,
      }}
    ></div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-grid-container relative min-h-screen">
      <DashboardHeader />
      <DashboardSidebar />
      <main className="dashboard-main">{children}</main>
      <DecorativePattern />
    </div>
  );
}
