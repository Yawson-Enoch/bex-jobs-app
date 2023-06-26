import { AlertCircleIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function ErrorDisplay({ msg = 'Something went wrong' }) {
  return (
    <div className="flex items-center gap-0.5 text-destructive md:gap-1">
      <AlertCircleIcon size={15} />
      <p
        className={twMerge(
          'max-w-[4rem] truncate text-xs text-destructive sm:max-w-prose sm:text-sm'
        )}
      >
        {msg}
      </p>
    </div>
  );
}
