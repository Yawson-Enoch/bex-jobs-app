'use client';

import { useRouter } from 'next/navigation';

import { Button } from './ui/button';

export default function SignUpCTABtn({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Button
      type="button"
      size="lg"
      className="text-lg"
      onClick={() => router.push('/signup')}
    >
      {children}
    </Button>
  );
}
