import Link from 'next/link';

import { Button } from '~/components/ui/button';

export default function NotFound() {
  return (
    <div className="relative grid min-h-dvh place-content-center">
      <title>Page Not Found</title>
      <main className="container space-y-3 text-center">
        <h2>Oops! Page not found</h2>
        <div className="gradient-text-stroke tracking-wide md:duration-700 md:ease-linear md:animate-in md:slide-in-from-top-7">
          404
        </div>
        <div className="space-y-3 md:space-y-6">
          <p className="max-w-md">
            The page you&#39;re looking for seems to have gone on vacation.
            Please double-check the URL or navigate back to our homepage to
            continue exploring.
          </p>
          <Button asChild size="lg" className="rounded-full text-lg font-bold">
            <Link href="/">GO HOME</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
