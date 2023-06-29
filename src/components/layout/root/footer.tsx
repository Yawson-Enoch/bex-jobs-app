import { siteInfo } from '~/config/site';

export default function Footer() {
  return (
    <footer className="h-16 border-t bg-background/70">
      <div className="container flex h-full items-center justify-center lg:gap-1">
        <p>Built by</p>
        <a
          href={siteInfo.links.twitter}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          GyBex
        </a>
      </div>
    </footer>
  );
}
