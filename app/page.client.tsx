'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import useAuth from '@/hooks/useAuth';
import LandingPageContent from '@/components/common/landing-page-content';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

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
        'fixed inset-0 -z-10 flex overflow-hidden pattern-bg-transparent pattern-gray-400 pattern-opacity-10 pattern-size-4 dark:pattern-gray-800',
        randomPattern
      )}
    ></div>
  );
}

export default function IndexPageClient() {
  const router = useRouter();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/dashboard');
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <Header />
      <main className="container py-6 md:py-12">
        <LandingPageContent />
      </main>
      <Footer />
      <DecorativePattern />
    </>
  );
}
