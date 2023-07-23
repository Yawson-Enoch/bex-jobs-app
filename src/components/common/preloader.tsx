import Image from 'next/image';

export default function Preloader() {
  return (
    <div className="pattern-isometric fixed inset-0 z-[9999] grid place-content-center overflow-hidden bg-background pattern-bg-transparent pattern-gray-400 pattern-opacity-100 pattern-size-16 dark:pattern-gray-900 dark:pattern-opacity-100">
      <Image
        src="/assets/logo.png"
        alt="Logo"
        priority
        width={150}
        height={150}
        className="animate-bounce"
      />
    </div>
  );
}
