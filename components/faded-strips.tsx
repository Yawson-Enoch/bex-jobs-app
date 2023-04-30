export default function FadedStrips() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(var(--_gradient-strips) 0.05rem,transparent 0.05rem),
        linear-gradient(90deg, var(--_gradient-strips) 0.15rem, transparent 0.15rem)`,
        backgroundSize: '1.5rem 1.5rem',
        backgroundAttachment: 'fixed',
        maskImage: `linear-gradient(-45deg, var(--_background), transparent 77%)`,
        WebkitMaskImage: `linear-gradient(-45deg, var(--_background), transparent 77%)`,
      }}
    ></div>
  );
}
