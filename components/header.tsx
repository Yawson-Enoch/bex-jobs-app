import GradientLogo from './gradient-logo';
import { ThemeToggle } from './theme-toggle';

export default function Header() {
  return (
    <header className="px-2 pt-2">
      <div className="container flex items-center justify-between gap-3 rounded-full border bg-background/10 py-2 backdrop-blur-sm md:gap-5">
        <GradientLogo />
        <ThemeToggle />
      </div>
    </header>
  );
}