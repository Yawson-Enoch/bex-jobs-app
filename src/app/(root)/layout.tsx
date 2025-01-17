import Footer from '~/components/layout/root/footer';
import Header from '~/components/layout/root/header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative grid min-h-dvh grid-rows-[auto,_1fr,_auto]">
      <Header />
      <main className="container pb-6 pt-8 md:py-12">{children}</main>
      <Footer />
    </div>
  );
}
