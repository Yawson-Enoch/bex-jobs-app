import GradientLogo from './gradient-logo';
import { ThemeToggle } from './theme-toggle';

export default function Header() {
  return (
    <header className="bg-background/10 px-2 pt-2 backdrop-blur-sm">
      <div className="container flex items-center justify-between gap-3 rounded-full border py-2 md:gap-5">
        <GradientLogo />
        <ThemeToggle />
      </div>
    </header>
  );
}
