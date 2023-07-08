import { twMerge } from 'tailwind-merge';

import Footer from '~/components/layout/root/footer';
import Header from '~/components/layout/root/header';

const patterns = [
  'pattern-zigzag',
  'pattern-rectangles',
  'pattern-rhombus',
  'pattern-isometric',
];
const randomIndex = Math.floor(Math.random() * patterns.length);
const randomPattern = patterns[randomIndex];

function DecorativePattern() {
  return (
    <div
      aria-hidden="true"
      className={twMerge(
        'fixed inset-0 -z-10 flex overflow-hidden pattern-bg-transparent pattern-gray-400 pattern-opacity-5 pattern-size-4 dark:pattern-gray-800 dark:pattern-opacity-10',
        randomPattern,
      )}
    ></div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dm relative grid grid-rows-[auto,_1fr,_auto]">
      <Header />
      <main className="container pb-6 pt-8 md:py-12">{children}</main>
      <Footer />
      <DecorativePattern />
    </div>
  );
}
