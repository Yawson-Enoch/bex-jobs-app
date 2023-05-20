import DashboardHeader from '@/components/dashboard-header';

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
    </div>
  );
}
