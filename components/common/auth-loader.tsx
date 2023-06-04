import { LoaderIcon } from 'lucide-react';

export default function AuthLoader() {
  return (
    <div className="mx-auto w-[min(100%,400px)] space-y-3 rounded-lg border border-border bg-background/70 p-3 md:space-y-6 md:p-6">
      <div role="status" className="flex items-center gap-2">
        <LoaderIcon aria-hidden="true" className="mr-2 h-6 w-6 animate-spin" />
        <span className="text-lg font-medium md:text-xl">
          Checking login status...
        </span>
      </div>
    </div>
  );
}
