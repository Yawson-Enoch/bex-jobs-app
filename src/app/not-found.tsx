import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { buttonVariants } from '~/components/ui/button';

function DecorativePattern() {
  return (
    <div
      aria-hidden="true"
      className="pattern-zigzag-3d fixed inset-0 -z-10 flex overflow-hidden pattern-bg-transparent pattern-gray-400 pattern-opacity-20 pattern-size-8 dark:pattern-gray-800"
    ></div>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-dm relative grid place-content-center">
      <main className="container space-y-3 text-center">
        <h2>Oops! Page not found</h2>
        <div className="gradient-text-stroke tracking-wide md:animate-in md:slide-in-from-top-7 md:duration-700 md:ease-linear">
          404
        </div>
        <div className="space-y-3 md:space-y-6">
          <p className="max-w-md">
            The page you&#39;re looking for seems to have gone on vacation.
            Please double-check the URL or navigate back to our homepage to
            continue exploring.
          </p>
          <Link
            href="/"
            className={twMerge(
              buttonVariants(),
              'rounded-full text-lg font-medium'
            )}
          >
            GO HOME
          </Link>
        </div>
      </main>
      <DecorativePattern />
    </div>
  );
}
