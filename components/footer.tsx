export default function Footer() {
  return (
    <footer className="border-t bg-background/10 backdrop-blur-sm">
      <div className="container flex items-center justify-center gap-2 py-3">
        <p className="pt-[3px] text-lg">&copy;</p>
        <p>{new Date().getFullYear()}</p>
        <p>GyBex</p>
      </div>
    </footer>
  );
}
