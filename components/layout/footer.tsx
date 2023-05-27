import Link from 'next/link';

import { siteInfo } from '@/config/site';

export default function Footer() {
  return (
    <footer className="flex h-16 items-center border-t bg-background/70">
      <div className="container flex items-center justify-center gap-1">
        <span>Built</span>
        <span>by</span>
        <Link
          href={siteInfo.links.twitter}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          GyBex
        </Link>
      </div>
    </footer>
  );
}
