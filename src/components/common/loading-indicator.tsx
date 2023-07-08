import { LoaderIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function LoadingIndicator({
  className,
  type = 'icon',
  msg = 'Loading...',
}: {
  className?: string;
  type?: 'icon' | 'text' | 'both';
  msg: string;
}) {
  return (
    <div
      role="status"
      className={twMerge(
        'grid grid-cols-[auto,_1fr] items-center gap-1',
        className,
      )}
    >
      <LoaderIcon
        aria-hidden="true"
        className={type === 'text' ? 'hidden' : 'inline-block animate-spin'}
      />
      <p className={type === 'icon' ? 'sr-only' : 'truncate'}>{msg}</p>
    </div>
  );
}
