import Header from '~/components/layout/auth/header';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative grid min-h-dvh grid-rows-[auto,_1fr]">
      <Header />
      <main className="container grid h-full content-center py-6 md:py-12">
        {children}
      </main>
    </div>
  );
}
