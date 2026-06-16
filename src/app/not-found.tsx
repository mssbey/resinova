import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        className="min-h-[80vh] flex items-center justify-center"
        style={{ background: "#FAFAF8" }}
      >
        <div className="text-center px-4 max-w-lg mx-auto">
          <div
            className="text-8xl font-black mb-4 tracking-tight"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              background: "linear-gradient(135deg, #D4AF37, #C9A15A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </div>
          <h1
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif", color: "#0A2342" }}
          >
            Sayfa Bulunamadı
          </h1>
          <p
            className="mb-8 text-base"
            style={{ fontFamily: "'Inter', sans-serif", color: "#4B5563" }}
          >
            Aradığınız sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #C9A15A)",
                color: "#0A2342",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Ana Sayfaya Dön
            </Link>
            <Link
              href="/urunler"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{
                border: "1.5px solid rgba(10,35,66,0.18)",
                color: "#0A2342",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Ürünleri İncele
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
