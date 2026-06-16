import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Mesafeli Satış Sözleşmesi — RESINOVA",
  description: "RESINOVA mesafeli satış sözleşmesi ve alışveriş koşulları.",
};

const SECTIONS = [
  {
    title: "Madde 1 — Taraflar",
    content: `SATICI: RESINOVA Kimya Sanayi ve Ticaret A.Ş. | Adres: İstanbul Ticaret Üniversitesi Caddesi No:1, Kadıköy / İstanbul | Tel: +90 (212) 555 00 00 | E-posta: satis@resinova.com.tr

ALICI: Siteye üye olan veya sipariş veren gerçek ya da tüzel kişi.`,
  },
  {
    title: "Madde 2 — Konu",
    content: `İşbu sözleşmenin konusu; Alıcı'nın resinova.com.tr web sitesinden sipariş verdiği ürünlerin satış ve teslimi ile 6502 Sayılı Tüketicinin Korunması Hakkındaki Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri uyarınca tarafların hak ve yükümlülüklerinin belirlenmesidir.`,
  },
  {
    title: "Madde 3 — Ürün Bilgileri",
    content: `Ürünlerin temel nitelikleri, fiyatı ve KDV dahil toplam ödeme tutarı siparişin tamamlanması sırasında gösterilmektedir. Teslimat bilgisi, kargo ücreti ve tahmini teslimat süresi sipariş özeti sayfasında açıkça belirtilmektedir.`,
  },
  {
    title: "Madde 4 — Ödeme",
    content: `Alıcı; kredi/banka kartı, EFT/Havale veya kapıda ödeme seçeneklerinden birini kullanabilir. Kredi kartı ödemeleri iyzico ve PayTR üzerinden güvenli biçimde işlenmektedir. Taksit seçenekleri anlaşmalı bankalar için geçerlidir.`,
  },
  {
    title: "Madde 5 — Teslimat",
    content: `Sipariş onayını takiben ürünler 1-3 iş günü içinde kargoya verilmektedir. Teslimat, Alıcı'nın belirttiği adrese MNG Kargo, Aras Kargo veya Sürat Kargo aracılığıyla gerçekleştirilmektedir. ₺500 ve üzeri siparişlerde kargo ücretsizdir; altındaki siparişler için ₺59,90 kargo ücreti uygulanır.`,
  },
  {
    title: "Madde 6 — Cayma Hakkı",
    content: `Alıcı, teslim tarihinden itibaren 14 gün içinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin cayma hakkını kullanabilir. Cayma bildirimini iade@resinova.com.tr adresine iletebilir. Açılmamış ve orijinal ambalajında olan ürünler için cayma hakkı geçerlidir.`,
  },
  {
    title: "Madde 7 — İade Koşulları",
    content: `Cayma hakkı kullanımında ürünün orijinal ambalajında, açılmamış ve kullanılmamış olması gerekmektedir. Açılmış epoksi setleri hijyen ve güvenlik gerekçesiyle iade kapsamı dışındadır (TKHK m.15/f kapsamı). Kargo bedeli Alıcı'ya aittir.`,
  },
  {
    title: "Madde 8 — Gizlilik",
    content: `Alıcı'nın kişisel bilgileri KVKK kapsamında korunmakta ve üçüncü kişilerle sipariş ve teslimat işlemleri dışında paylaşılmamaktadır. Ayrıntılar için kvkk sayfamızı inceleyiniz.`,
  },
  {
    title: "Madde 9 — Uyuşmazlık Çözümü",
    content: `Sözleşmeden doğan uyuşmazlıklarda Gümrük ve Ticaret Bakanlığı'nca ilan edilen değer sınırı çerçevesinde Tüketici Hakem Heyetleri, bu sınırı aşan uyuşmazlıklarda ise İstanbul Anadolu Tüketici Mahkemeleri yetkilidir.`,
  },
];

export default function MesafeliSatisPage() {
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
              Mesafeli Satış Sözleşmesi
            </h1>
            <p className="text-white/60 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              6502 Sayılı Kanun ve Mesafeli Sözleşmeler Yönetmeliği Kapsamında
            </p>
          </div>
        </div>

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
                  className="text-[#4B5563] leading-relaxed whitespace-pre-line"
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
              satis@resinova.com.tr | +90 (212) 555 00 00
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
