import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "İptal ve İade Politikası — RESINOVA",
  description: "RESINOVA iptal ve iade koşulları, iade süreci.",
};

const STEPS = [
  { num: "01", title: "Bildirim", desc: "iade@resinova.com.tr adresine sipariş numaranızı ve iade gerekçenizi bildirin. 24 saat içinde yanıt alırsınız." },
  { num: "02", title: "Onay", desc: "Ekibimiz iade talebinizi değerlendirir ve onay e-postasını gönderir. Bu e-postada iade adresi ve kargo bilgileri yer alır." },
  { num: "03", title: "Kargo", desc: "Ürünü orijinal ambalajında kargo şirketine teslim edin. Kargo barkodunu e-posta ile bize iletin." },
  { num: "04", title: "İnceleme & Geri Ödeme", desc: "Ürün bize ulaştıktan sonra 5 iş günü içinde incelenir ve ödeme iadeniz aynı ödeme yöntemiyle yapılır." },
];

const NOT_ELIGIBLE = [
  "Açılmış, kullanılmış veya orijinal ambalajı bozulmuş epoksi setleri",
  "Hazırlanmış veya karıştırılmış ürünler",
  "İndirimli / outlet ürünler (ayrıca belirtilmedikçe)",
  "Sipariş üzeri özel üretim ürünler",
  "Teslimattan 14 gün sonra yapılan başvurular",
];

export default function IadePage() {
  return (
    <>
      <Header />
      <main style={{ background: "#FAFAF8" }}>
        <div className="py-24" style={{ background: "linear-gradient(135deg, #0A2342, #103B73)" }}>
          <div className="container-premium text-center">
            <h1
              className="text-4xl font-black text-white mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}
            >
              İptal ve İade Politikası
            </h1>
            <p className="text-white/60 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              14 günlük yasal cayma hakkı kapsamında kolay iade süreci
            </p>
          </div>
        </div>

        <div className="container-premium pt-20 pre-footer max-w-3xl mx-auto space-y-16">
          {/* Steps */}
          <section>
            <h2
              className="text-2xl font-black text-[#0A2342] mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              İade Süreci
            </h2>
            <div className="space-y-6">
              {STEPS.map((step) => (
                <div key={step.num} className="flex gap-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #0A2342, #103B73)",
                      color: "#D4AF37",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {step.num}
                  </div>
                  <div className="pt-2">
                    <h3
                      className="font-bold text-[#0A2342] mb-1"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-[#4B5563] text-sm leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Not eligible */}
          <section>
            <h2
              className="text-2xl font-black text-[#0A2342] mb-5"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              İade Edilemeyen Ürünler
            </h2>
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)" }}
            >
              <ul className="space-y-3">
                {NOT_ELIGIBLE.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-[#4B5563]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <span className="mt-1 w-4 h-4 rounded-full flex-shrink-0" style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", minWidth: "16px" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Contact */}
          <div
            className="p-6 rounded-2xl"
            style={{ background: "rgba(10,35,66,0.04)", border: "1px solid rgba(10,35,66,0.08)" }}
          >
            <h3 className="font-bold text-[#0A2342] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              İade & İptal İletişim
            </h3>
            <p className="text-sm text-[#4B5563]" style={{ fontFamily: "'Inter', sans-serif" }}>
              E-posta: iade@resinova.com.tr | Telefon: +90 (212) 555 00 00 (Hafta içi 09:00–18:00)
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
