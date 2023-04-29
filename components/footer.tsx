export default function Footer() {
  return (
    <footer className="border-t bg-background/10 backdrop-blur-sm">
      <div className="container flex items-center justify-center py-5">
        <p>&copy; {new Date().getFullYear()} GyBex</p>
      </div>
    </footer>
  );
}
