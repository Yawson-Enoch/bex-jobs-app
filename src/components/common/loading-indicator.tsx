import { LoaderIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

function DisplayOptions({
  type = 'icon',
  msg = 'Loading...',
}: {
  type?: 'icon' | 'text' | 'both';
  msg: string;
}) {
  if (type === 'icon') {
    return (
      <>
        <span className="sr-only">{msg}</span>
        <LoaderIcon aria-hidden="true" className="animate-spin" />
      </>
    );
  }
  if (type === 'text') {
    return <p className="truncate">{msg}</p>;
  }
  return (
    <>
      <LoaderIcon aria-hidden="true" className="animate-spin" />
      <p className="truncate">{msg}</p>
    </>
  );
}

export default function LoadingIndicator({
  type,
  className,
  msg,
}: {
  type?: 'icon' | 'text' | 'both';
  className?: string;
  msg: string;
}) {
  return (
    <div
      role="status"
      className={twMerge(
        'grid grid-cols-[auto,_1fr] items-center gap-1',
        className
      )}
    >
      <DisplayOptions type={type} msg={msg} />
    </div>
  );
}
