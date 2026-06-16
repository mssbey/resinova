import { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Users, Globe, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Kurumsal — RESINOVA Hakkında",
  description: "RESINOVA, 15 yıllık deneyimi ve İstanbul'daki üretim tesisiyle Türkiye'nin premium epoksi markasıdır.",
};

const values = [
  { icon: <Award size={28} />, title: "Kalite", desc: "ISO 9001 sertifikalı üretim. Her ürün 23 noktada kalite kontrolden geçer." },
  { icon: <Zap size={28} />, title: "İnovasyon", desc: "15 kişilik Ar-Ge ekibiyle sürekli yeni formüller ve teknolojiler geliştiriyoruz." },
  { icon: <Users size={28} />, title: "Topluluk", desc: "50.000+ kullanıcı, 300+ bayi ortağı ve aktif bir epoksi topluluğu." },
  { icon: <Globe size={28} />, title: "Sürdürülebilirlik", desc: "REACH uyumlu, çevre dostu bileşenler. Karbon ayak izimizi her yıl azaltıyoruz." },
];

const timeline = [
  { year: "2010", title: "Kuruluş", desc: "Küçük bir atölyeden yola çıkarak epoksi alanında uzmanlaştık." },
  { year: "2014", title: "İlk Fabrika", desc: "İstanbul'daki ilk üretim tesisimizi açtık. Kapasite: 10 ton/ay." },
  { year: "2018", title: "ISO 9001", desc: "Kalite yönetim sistemimiz uluslararası sertifikasını aldı." },
  { year: "2021", title: "Dijital Dönüşüm", desc: "E-ticaret platformunu ve Akademi bölümünü hayata geçirdik." },
  { year: "2024", title: "Yeni Tesis", desc: "120 ton/ay kapasiteli modern fabrikamıza taşındık." },
  { year: "2026", title: "Bugün", desc: "Türkiye'nin lider epoksi markası olarak Avrupa'ya ihracat yapıyoruz." },
];

export default function KurumsalPage() {
  return (
    <>
      <Header />
      <main style={{ background: "#FAFAF8" }}>
        {/* Hero */}
        <div
          className="relative pt-32 pb-24 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0A2342, #103B73)" }}
        >
          <div className="container-premium relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span
                  className="inline-block text-xs font-bold uppercase tracking-widest mb-6"
                  style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
                >
                  Hakkımızda
                </span>
                <h1
                  className="text-5xl md:text-6xl font-black text-white leading-none mb-6"
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.03em" }}
                >
                  Şeffaflığı
                  <br />
                  <span className="text-gradient-gold">Sanatla</span>
                  <br />
                  Buluşturduk
                </h1>
                <p
                  className="text-white/78 text-lg leading-relaxed mb-8"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  2010&apos;dan bu yana Türkiye&apos;nin en inovatif epoksi üreticisiyiz.
                  İstanbul&apos;daki modern tesisimizden dünyaya açılıyoruz.
                </p>
                <Link
                  href="/iletisim"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  İletişime Geç <ArrowRight size={16} />
                </Link>
              </div>
              <div className="relative h-96 rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=90"
                  alt="RESINOVA Fabrika"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,35,66,0.4), transparent)" }} />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: "linear-gradient(to top, #FAFAF8, transparent)" }} />
        </div>

        {/* Values */}
        <section className="section-padding">
          <div className="container-premium">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                Değerlerimiz
              </span>
              <h2 className="text-4xl font-black text-[#111827]" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}>
                Bizi Biz Yapan
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="p-8 rounded-2xl transition-all hover:-translate-y-1"
                  style={{ background: "white", boxShadow: "0 4px 16px rgba(10,35,66,0.06)", border: "1px solid rgba(10,35,66,0.06)" }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: i % 2 === 0 ? "rgba(212,175,55,0.1)" : "rgba(10,35,66,0.06)", color: i % 2 === 0 ? "#D4AF37" : "#0A2342" }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{v.title}</h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding" style={{ background: "#0A2342" }}>
          <div className="container-premium">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                Tarihçemiz
              </span>
              <h2 className="text-4xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}>
                15 Yıllık Yolculuk
              </h2>
            </div>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: "rgba(212,175,55,0.3)" }} />
              {timeline.map((item, i) => (
                <div key={item.year} className="flex gap-8 mb-10 relative">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black z-10"
                    style={{
                      background: i === timeline.length - 1 ? "linear-gradient(135deg, #D4AF37, #C9A15A)" : "#0A2342",
                      border: "2px solid",
                      borderColor: i === timeline.length - 1 ? "#D4AF37" : "rgba(212,175,55,0.3)",
                      color: i === timeline.length - 1 ? "#0A2342" : "#D4AF37",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.6rem",
                    }}
                  >
                    {item.year}
                  </div>
                  <div className="flex-1 pb-2">
                    <h3 className="font-bold text-white mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h3>
                    <p className="text-sm text-white/72" style={{ fontFamily: "'Inter', sans-serif" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Factory CTA */}
        <section className="section-padding pre-footer" style={{ paddingBottom: "120px" }}>
          <div className="container-premium">
            <div
              className="relative rounded-3xl overflow-hidden p-12 text-center"
              style={{ background: "linear-gradient(135deg, #D4AF37, #C9A15A)" }}
            >
              <h2
                className="text-3xl md:text-4xl font-black text-[#0A2342] mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}
              >
                Fabrikamızı Ziyaret Edin
              </h2>
              <p className="text-[#0A2342]/85 text-lg mb-8 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
                Üretim sürecimizi yerinde görmek, ürün testleri yapmak ve
                teknik ekibimizle tanışmak için fabrika turumuza başvurun.
              </p>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm"
                style={{ background: "#0A2342", color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
              >
                Ziyaret Talebi Oluştur <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
