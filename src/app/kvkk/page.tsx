import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "KVKK Aydınlatma Metni — RESINOVA",
  description: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında RESINOVA aydınlatma metni.",
};

const SECTIONS = [
  {
    title: "1. Veri Sorumlusu",
    content: `RESINOVA Kimya Sanayi ve Ticaret A.Ş. (bundan sonra "RESINOVA" olarak anılacaktır), 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatını taşımaktadır. Bu metin, kişisel verilerinizin işlenmesine ilişkin sizi bilgilendirmek amacıyla hazırlanmıştır.`,
  },
  {
    title: "2. Hangi Kişisel Verilerinizi İşliyoruz?",
    content: `RESINOVA olarak; ad-soyad, T.C. kimlik numarası, vergi kimlik numarası, iletişim bilgileri (telefon, e-posta, adres), ödeme bilgileri, sipariş ve işlem geçmişi, çerez ve web kullanım verileri ile hesap bilgilerini işlemekteyiz. Bu veriler yalnızca hizmet sunumuna yönelik olup yetkisiz erişime karşı korunmaktadır.`,
  },
  {
    title: "3. Kişisel Verilerinizin İşlenme Amaçları",
    content: `Kişisel verileriniz; sipariş işleme, teslimat ve kargo takibi, ödeme işlemleri ve fatura düzenleme, müşteri hizmetleri ve destek, yasal yükümlülüklerin yerine getirilmesi, kampanya ve promosyon bildirimleri (açık rızanız kapsamında), web sitesi güvenliği ve sahtekarlıkla mücadele amaçlarıyla işlenmektedir.`,
  },
  {
    title: "4. Kişisel Verilerin Aktarılması",
    content: `Kişisel verileriniz; ödeme altyapı sağlayıcıları (iyzico, PayTR, Stripe), kargo şirketleri (MNG, Aras, Sürat), SMS/e-posta servisi sağlayıcıları ile hukuki zorunluluk gerektiren durumlarda yetkili kamu kurumlarına aktarılabilmektedir. Bu aktarımlar KVKK'nın 8. ve 9. maddelerine uygun biçimde gerçekleştirilmektedir.`,
  },
  {
    title: "5. Veri Saklama Süreleri",
    content: `Verileriniz, ilgili mevzuatın öngördüğü süreler boyunca saklanmaktadır. Ticari kayıtlar 10 yıl, fatura kayıtları 5 yıl, müşteri hesap verileri hesap silme talebine kadar tutulmaktadır. Bu sürelerin sona ermesi halinde verileriniz silinmekte, yok edilmekte veya anonim hale getirilmektedir.`,
  },
  {
    title: "6. KVKK Kapsamındaki Haklarınız",
    content: `KVKK'nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenme amacını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik ya da yanlış işlenmiş verilerin düzeltilmesini isteme, KVKK'nın 7. maddesinde öngörülen şartlar dahilinde silinmesini ya da yok edilmesini isteme, işlemenin münhasıran otomatik sistemler aracılığıyla yapılması halinde ortaya çıkan aleyhte sonuca itiraz etme ve zarara uğramanız halinde tazminat talep etme haklarına sahipsiniz.`,
  },
  {
    title: "7. Başvuru Yöntemi",
    content: `KVKK kapsamındaki haklarınızı kullanmak için; kvkk@resinova.com.tr e-posta adresine başvurabilir veya İstanbul Ticaret Üniversitesi Caddesi No:1, Kadıköy / İstanbul adresine kimlik doğrulamalı yazılı başvuru yapabilirsiniz. Başvurularınız en geç 30 gün içinde yanıtlanacaktır.`,
  },
];

export default function KVKKPage() {
  return (
    <>
      <Header />
      <main style={{ background: "#FAFAF8" }}>
        {/* Hero */}
        <div
          className="py-24"
          style={{ background: "linear-gradient(135deg, #0A2342, #103B73)" }}
        >
          <div className="container-premium text-center">
            <h1
              className="text-4xl font-black text-white mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}
            >
              KVKK Aydınlatma Metni
            </h1>
            <p className="text-white/60 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              Son güncelleme: 7 Haziran 2026 — 6698 Sayılı KVKK Kapsamında Hazırlanmıştır
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container-premium pt-20 pre-footer max-w-3xl mx-auto">
          <div className="space-y-10">
            {SECTIONS.map((section) => (
              <section key={section.title}>
                <h2
                  className="text-xl font-black text-[#0A2342] mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {section.title}
                </h2>
                <p
                  className="text-[#4B5563] leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px" }}
                >
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          <div
            className="mt-12 p-6 rounded-2xl"
            style={{ background: "rgba(10,35,66,0.04)", border: "1px solid rgba(10,35,66,0.08)" }}
          >
            <p className="text-sm text-[#4B5563]" style={{ fontFamily: "'Inter', sans-serif" }}>
              <strong className="text-[#0A2342]">İletişim:</strong>{" "}
              kvkk@resinova.com.tr | +90 (212) 555 00 00
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
