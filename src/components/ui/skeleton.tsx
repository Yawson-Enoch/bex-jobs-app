import { twMerge } from 'tailwind-merge';

export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge('animate-pulse rounded-md bg-primary/20', className)}
      {...props}
    />
  );
}
