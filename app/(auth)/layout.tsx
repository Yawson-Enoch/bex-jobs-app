import AuthHeader from '@/components/layout/auth-header';
import Footer from '@/components/layout/footer';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthHeader />
      {children}
      <Footer />
      {/* decorative pattern */}
      <div
        aria-hidden="true"
        className="pattern-dots fixed inset-0 -z-10 flex overflow-hidden pattern-bg-transparent pattern-gray-400 pattern-opacity-10 pattern-size-4 dark:pattern-gray-800"
      ></div>
    </>
  );
}
