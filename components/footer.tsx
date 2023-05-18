import Link from 'next/link';

import { siteInfo } from '@/config/site';

export default function Footer() {
  return (
    <footer className="border-t bg-background/90 backdrop-blur-sm">
      <div className="container flex items-center justify-center gap-1 py-3">
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
