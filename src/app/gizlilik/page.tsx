import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Gizlilik Politikası ve Çerez Politikası — RESINOVA",
  description: "RESINOVA gizlilik politikası ve çerez kullanım koşulları.",
};

const PRIVACY_SECTIONS = [
  {
    title: "Topladığımız Bilgiler",
    content: "resinova.com.tr'ye erişim sırasında; ad-soyad, e-posta adresi, teslimat adresi, ödeme bilgileri ve tarayıcı/cihaz bilgileri toplanmaktadır. Sosyal medya üzerinden giriş yapılması halinde profil bilgileri de işlenebilir.",
  },
  {
    title: "Bilgilerin Kullanım Amacı",
    content: "Toplanan veriler; sipariş işleme ve teslim, müşteri destek hizmetleri, yasal yükümlülüklerin yerine getirilmesi, site güvenliği, ve rızanız kapsamında pazarlama iletişimleri için kullanılmaktadır.",
  },
  {
    title: "Üçüncü Taraflarla Paylaşım",
    content: "Verileriniz; ödeme işlemcileri (iyzico, PayTR, Stripe), kargo şirketleri (MNG, Aras, Sürat), SMS/e-posta servis sağlayıcıları ve yasal zorunluluk halinde kamu kurumları ile paylaşılabilmektedir. Veri satışı yapılmamaktadır.",
  },
  {
    title: "Veri Güvenliği",
    content: "Ödeme verileri SSL/TLS şifrelemesi ile korunmaktadır. Sistemlerimiz düzenli güvenlik denetimine tabiidir. Şifreleme, güvenlik duvarı, erişim kontrolü ve izleme sistemleri kullanılmaktadır.",
  },
];

const COOKIE_TYPES = [
  { name: "Zorunlu Çerezler", desc: "Sitenin çalışması için gereklidir. Oturum, sepet ve kimlik doğrulama çerezleri.", canDisable: false },
  { name: "Analitik Çerezler", desc: "Google Analytics gibi araçlarla site performansı ve kullanım istatistikleri toplanır.", canDisable: true },
  { name: "Pazarlama Çerezleri", desc: "Kişiselleştirilmiş reklamlar sunmak için kullanılır (Meta Pixel, Google Ads).", canDisable: true },
  { name: "Tercih Çerezleri", desc: "Dil, bölge ve tasarım tercihlerinizi hatırlar.", canDisable: true },
];

export default function GizlilikPage() {
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
              Gizlilik & Çerez Politikası
            </h1>
            <p className="text-white/60 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              Son güncelleme: 7 Haziran 2026
            </p>
          </div>
        </div>

        <div className="container-premium pt-20 pre-footer max-w-3xl mx-auto space-y-16">
          {/* Privacy */}
          <section>
            <h2
              className="text-2xl font-black text-[#0A2342] mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Gizlilik Politikası
            </h2>
            <div className="space-y-8">
              {PRIVACY_SECTIONS.map((s) => (
                <div key={s.title}>
                  <h3
                    className="text-lg font-black text-[#0A2342] mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-[#4B5563] leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px" }}
                  >
                    {s.content}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2
              className="text-2xl font-black text-[#0A2342] mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Çerez Politikası
            </h2>
            <p
              className="text-[#4B5563] mb-8"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px" }}
            >
              Web sitemizde çerezler (cookies) kullanılmaktadır. Çerezler, tarayıcınıza kaydedilen küçük metin dosyalarıdır. Aşağıda kullandığımız çerez türleri ve nasıl yönetebileceğiniz açıklanmıştır.
            </p>
            <div className="space-y-4">
              {COOKIE_TYPES.map((cookie) => (
                <div
                  key={cookie.name}
                  className="flex gap-4 p-5 rounded-2xl"
                  style={{ background: "white", border: "1px solid rgba(10,35,66,0.08)", boxShadow: "0 2px 8px rgba(10,35,66,0.04)" }}
                >
                  <div className="flex-1">
                    <div
                      className="font-bold text-[#0A2342] mb-1 text-sm"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {cookie.name}
                    </div>
                    <p className="text-sm text-[#4B5563]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {cookie.desc}
                    </p>
                  </div>
                  <div className="flex-shrink-0 pt-1">
                    {cookie.canDisable ? (
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(34,197,94,0.1)", color: "#16A34A" }}
                      >
                        Devre Dışı Bırakılabilir
                      </span>
                    ) : (
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(10,35,66,0.07)", color: "#374151" }}
                      >
                        Zorunlu
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p
              className="mt-6 text-sm text-[#4B5563]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Çerez tercihlerinizi tarayıcınızın ayarlarından veya sitemizdeki çerez tercihleri panelinden yönetebilirsiniz.
            </p>
          </section>

          <div
            className="p-6 rounded-2xl"
            style={{ background: "rgba(10,35,66,0.04)", border: "1px solid rgba(10,35,66,0.08)" }}
          >
            <p className="text-sm text-[#4B5563]" style={{ fontFamily: "'Inter', sans-serif" }}>
              <strong className="text-[#0A2342]">İletişim:</strong>{" "}
              gizlilik@resinova.com.tr | +90 (212) 555 00 00
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
