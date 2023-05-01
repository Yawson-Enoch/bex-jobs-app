'use client';

import { useRouter } from 'next/navigation';

import { Button } from './ui/button';

export default function LoginBtn({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => router.push('/login')}
    >
      {children}
    </Button>
  );
}
