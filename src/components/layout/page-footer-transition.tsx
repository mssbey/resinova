export default function PageFooterTransition() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative w-full"
      style={{ height: "200px", marginBottom: "-1px" }}
    >
      {/* Smooth dark-to-darker gradient — no white, no blur */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(6,10,20,0.55) 45%, rgba(2,8,23,0.88) 75%, #020817 100%)",
        }}
      />
      {/* Subtle gold ambient at midpoint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(212,175,55,0.04), transparent 70%)",
        }}
      />
    </div>
  );
}
