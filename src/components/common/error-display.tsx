import { AlertCircleIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function ErrorDisplay({
  className,
  type,
  msg = 'Something went wrong!',
}: {
  type?: 'icon' | 'text';
  className?: string;
  msg: string;
}) {
  return (
    <div
      role="status"
      className={twMerge(
        'grid grid-cols-[auto,_1fr] items-center gap-1 text-destructive',
        className,
      )}
    >
      <AlertCircleIcon
        aria-hidden="true"
        className={type === 'text' ? 'hidden' : 'inline-block'}
      />
      <p
        className={
          type === 'icon' ? 'sr-only' : 'truncate text-sm text-destructive'
        }
      >
        {msg}
      </p>
    </div>
  );
}
