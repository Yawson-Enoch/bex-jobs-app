import DashboardHeader from '@/components/dashboard-header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-grid-container relative min-h-screen">
      <div className="dashboard-header h-fit w-full">
        <DashboardHeader />
      </div>
      <div className="dashboard-sidebar h-screen w-60 border-r bg-background/90 backdrop-blur-sm"></div>
      <main className="dashboard-main">{children}</main>
    </div>
  );
}
