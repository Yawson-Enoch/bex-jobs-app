'use client';

import { useRouter } from 'next/navigation';

import { Button } from './ui/button';

export default function SignUpBtn({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Button size="sm" onClick={() => router.push('/signup')}>
      {children}
    </Button>
  );
}
