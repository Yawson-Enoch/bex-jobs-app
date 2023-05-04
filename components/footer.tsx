export default function Footer() {
  return (
    <footer className="border-t bg-background dark:bg-background/10 dark:backdrop-blur-sm">
      <div className="container flex items-center justify-center gap-2 py-3">
        <p className="text-lg">&copy;</p>
        <p>{new Date().getFullYear()}</p>
        <p>GyBex</p>
      </div>
    </footer>
  );
}
