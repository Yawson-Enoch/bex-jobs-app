import LoadingIndicator from './loading-indicator';

export default function AuthLoadingIndicator() {
  return (
    <div className="mx-auto w-[min(100%,_400px)] space-y-3 rounded-lg border bg-background/70 p-3 md:space-y-6 md:p-6">
      <LoadingIndicator
        type="both"
        msg="Checking login status..."
        className="text-lg font-medium md:text-xl"
      />
    </div>
  );
}
