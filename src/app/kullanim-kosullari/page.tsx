import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Kullanım Koşulları — RESINOVA",
  description: "RESINOVA web sitesi kullanım koşulları.",
};

const SECTIONS = [
  {
    title: "1. Hizmet Kapsamı",
    content: "resinova.com.tr web sitesi, RESINOVA Kimya Sanayi ve Ticaret A.Ş. tarafından işletilmektedir. Bu site üzerinden epoksi reçine ve ilgili ürünlerin satışı gerçekleştirilmektedir. Siteyi kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.",
  },
  {
    title: "2. Kullanıcı Sorumlulukları",
    content: "Kullanıcılar siteyi yalnızca hukuka uygun amaçlarla kullanabilir. Sisteme zarar verebilecek eylemler, yetkisiz erişim girişimleri, fikri mülkiyet haklarını ihlal eden davranışlar ve yanıltıcı bilgi paylaşımı kesinlikle yasaktır.",
  },
  {
    title: "3. Fikri Mülkiyet",
    content: "Sitede yer alan tüm içerikler (görseller, metinler, logo, marka adı) RESINOVA'ya ait olup izinsiz kullanımı yasaktır. Ürün bilgileri ve teknik dokümanlar yalnızca kişisel ve ticari bilgilendirme amaçlı kullanılabilir.",
  },
  {
    title: "4. Sorumluluk Sınırı",
    content: "RESINOVA, teknik arızalar, hatalı kullanım kaynaklı zararlar veya üçüncü taraf içeriklerinden doğan zararlardan sorumlu değildir. Ürünler teknik veri sayfalarında belirtilen koşullarda ve amacına uygun kullanılmalıdır.",
  },
  {
    title: "5. Değişiklik Hakkı",
    content: "RESINOVA, işbu kullanım koşullarını, fiyatları ve ürün bilgilerini önceden haber vermeksizin değiştirme hakkını saklı tutar. Güncel koşullar her zaman bu sayfada yayımlanmaktadır.",
  },
  {
    title: "6. Uygulanacak Hukuk",
    content: "İşbu koşullar Türk Hukuku'na tabidir. Olası uyuşmazlıklarda İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.",
  },
];

export default function KullanimKosullariPage() {
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
              Kullanım Koşulları
            </h1>
            <p className="text-white/60 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              Son güncelleme: 7 Haziran 2026
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
                  className="text-[#4B5563] leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px" }}
                >
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
