import AuthHeader from '~/components/layout/auth-header';

function DecorativePattern() {
  return (
    <div
      aria-hidden="true"
      className="pattern-dots fixed inset-0 -z-10 flex overflow-hidden pattern-bg-transparent pattern-gray-400 pattern-opacity-10 pattern-size-4 dark:pattern-gray-800"
    ></div>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <AuthHeader />
      <main className="container py-6 md:py-12">{children}</main>
      <DecorativePattern />
    </div>
  );
}
