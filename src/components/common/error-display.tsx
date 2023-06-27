import { AlertCircleIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

function DisplayOptions({
  type,
  msg = 'Something went wrong',
}: {
  type?: 'icon' | 'text';
  msg: string;
}) {
  if (type === 'icon') {
    return (
      <>
        <span className="sr-only">{msg}</span>
        <AlertCircleIcon aria-hidden="true" />
      </>
    );
  }
  if (type === 'text') {
    return <p className="truncate text-sm text-destructive">{msg}</p>;
  }
  return (
    <>
      <AlertCircleIcon aria-hidden="true" />
      <p className="truncate text-sm text-destructive">{msg}</p>
    </>
  );
}

export default function ErrorDisplay({
  type,
  className,
  msg,
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
        className
      )}
    >
      <DisplayOptions type={type} msg={msg} />
    </div>
  );
}
