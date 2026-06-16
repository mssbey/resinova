export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#FAFAF8" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
          style={{
            borderTopColor: "#D4AF37",
            borderRightColor: "rgba(212,175,55,0.3)",
          }}
        />
        <span
          className="text-sm font-medium tracking-widest uppercase"
          style={{ fontFamily: "'Montserrat', sans-serif", color: "#6B7280" }}
        >
          Yükleniyor
        </span>
      </div>
    </div>
  );
}
