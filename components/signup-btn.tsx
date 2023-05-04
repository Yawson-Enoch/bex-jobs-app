'use client';

import { useRouter } from 'next/navigation';

import { Button } from './ui/button';

export default function SignupBtn({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Button type="button" size="sm" onClick={() => router.push('/signup')}>
      {children}
    </Button>
  );
}
