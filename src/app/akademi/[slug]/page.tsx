"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { blogPosts, getPostBySlug } from "@/data/blog";
import { products } from "@/data/products";
import { findRelatedProducts } from "@/data/keywordProductMap";
import { formatPrice } from "@/lib/utils";
import { Clock, User, Tag, ArrowRight, ArrowLeft, Share2, ShoppingCart } from "lucide-react";

const INTERNAL_LINKS: Record<string, { href: string; label: string }> = {
  "Kristal Berraklık": { href: "/urunler/resinova-pro-clear-ultra", label: "Pro Clear Ultra" },
  "Kalın Döküm Epoksi": { href: "/urunler/resinova-deep-pour-max", label: "Deep Pour Max" },
  "river table": { href: "/urunler?kategori=ahsap-epoksi", label: "Ahşap Epoksi Sistemleri" },
  "River Table": { href: "/urunler?kategori=ahsap-epoksi", label: "River Table Ürünleri" },
  "pigment": { href: "/urunler?kategori=pigment", label: "Pigment Koleksiyonu" },
  "hobi epoksi": { href: "/urunler?kategori=hobi", label: "Hobi Sistemleri" },
  "emprenye": { href: "/urunler?kategori=emprenye", label: "Emprenye Reçineleri" },
};

const ARTICLE_CONTENT: Record<string, {
  h1: string;
  sections: {
    h2: string;
    content: string;
    h3sections?: { h3: string; content: string }[];
  }[];
  relatedProductIds: string[];
}> = {
  "epoksi-masa-nasil-yapilir": {
    h1: "Epoksi Masa Nasıl Yapılır? Adım Adım Profesyonel Rehber",
    sections: [
      {
        h2: "1. Doğru Ahşap Seçimi",
        content: "River table yapımında ahşap seçimi en kritik adımdır. Ceviz, meşe veya zeytin ağacı gibi dayanıklı türler tercih edilmelidir. Ahşabın nem oranı %12'nin altında olmalı ve en az 6 ay kurutulmuş olmalıdır.",
        h3sections: [
          { h3: "Ahşap Kurutma Süresi", content: "Taze kesilen ahşabı kullanmak epoksi için büyük risk taşır. Nem içeriği yüksek ahşapta kabarcık oluşumu ve zayıf yapışma görülür." },
          { h3: "Ahşap Hazırlama", content: "Ahşap yüzeyini 80 zımpara ile temizleyin, tüm kabuk ve kirliliklerden arındırın. Zımpara tozunu silgili fırçayla tamamen temizleyin." },
        ],
      },
      {
        h2: "2. Kalıp Hazırlama",
        content: "Profesyonel river table için sağlam ve sızdırmaz bir kalıp şarttır. Melamin kaplı MDF veya silikon kaplı kontrplak kullanılabilir.",
        h3sections: [
          { h3: "Serbest Yağlama", content: "Kalıbın iç yüzeyini özel kalıp ayırıcı veya balmumu ile kaplayın. Bu işlem epoksinin kalıba yapışmasını önler." },
          { h3: "Kenar Sızdırmazlık", content: "Sıvı epoksi için kalıp kenarları mutlaka sızdırmazlık bandı ile desteklenmelidir." },
        ],
      },
      {
        h2: "3. Epoksi Seçimi ve Hesaplama",
        content: "River table için ağır döküm veya orta derinlik epoksi sistemleri kullanılır. Kristal Berraklık önceliğinizse Pro Clear Ultra idealdir. Derin kalıplar için Kalın Döküm Epoksi Deep Pour Max tercih edilmelidir.",
      },
      {
        h2: "4. Karışım ve Döküm",
        content: "A ve B bileşenlerini hassas terazi ile karışım oranında tartın. Yavaş ve uzun süreli karıştırma kabarcık oluşumunu azaltır. Karışımı 10-15 dakika dinlendirdikten sonra yavaşça dökün.",
        h3sections: [
          { h3: "Kabarcık Giderme", content: "Döküm sonrası yüzeyi ısı tabancasıyla tarayın. 15 cm mesafeden, sürekli hareket ettirerek 2-3 tur atın." },
        ],
      },
      {
        h2: "5. Kürleme ve Son İşlemler",
        content: "Epoksinin tam kürlenmesi için çevre sıcaklığı minimum 18°C olmalıdır. Pro Clear Ultra tam kürlenme için 7 gün bekler. Zımparalama, rendeleme ve cilalama işlemleri tam kürlenme sonrasında yapılmalıdır.",
      },
    ],
    relatedProductIds: ["pro-clear-ultra", "deep-pour-max"],
  },
  "epoksi-neden-sarar": {
    h1: "Epoksi Neden Sararır? Nedenleri ve Bilimsel Çözümleri",
    sections: [
      {
        h2: "Sararmayı Tetikleyen Etkenler",
        content: "Epoksi sararmalarının büyük çoğunluğu UV ışınlarına maruziyet, yüksek ısı ve oksidasyondan kaynaklanır.",
        h3sections: [
          { h3: "UV Işını Etkisi", content: "Standart epoksiler UV ışını altında fotooksidasyona uğrar. Bu süreç epoksi zincirini parçalayarak sarı renk veren kromofor grupları oluşturur." },
          { h3: "Isı Hasarı", content: "60°C'nin üzerindeki sıcaklıklar epoksi polimer yapısını bozabilir. Tezgah uygulamalarında sıcak bardak veya tencere doğrudan konmamalıdır." },
        ],
      },
      {
        h2: "RESINOVA'nın UV Çözümü",
        content: "RESINOVA Pro Clear Ultra formülünde kullanılan özel HALS (Hindered Amine Light Stabilizer) ve UV absorber kombinasyonu 10 yıl sararma garantisi sunar.",
      },
      {
        h2: "Önleme Yöntemleri",
        content: "UV dirençli epoksi seçin, bitmiş yüzeylere UV koruyucu cila uygulayın, direkt güneş ışığına uzun süre maruz kalmaktan kaçının.",
      },
    ],
    relatedProductIds: ["pro-clear-ultra"],
  },
  "river-table-rehberi": {
    h1: "River Table Yapım Rehberi: Başlangıçtan Profesyonelliğe",
    sections: [
      {
        h2: "River Table Nedir?",
        content: "River table, ahşabın iki parçası arasında epoksi reçine dökülerek oluşturulan, nehir görünümünü taklit eden premium masa türüdür. Sanat ile işlevselliği birleştirir.",
      },
      {
        h2: "Malzeme Listesi",
        content: "Başarılı bir river table için: Kurutulmuş ahşap plaka (ceviz veya meşe önerilir), Kristal Berraklık epoksi sistemi, hassas terazi, silikon kalıp seti ve özel pigmentler gereklidir.",
        h3sections: [
          { h3: "Ahşap Kalınlığı", content: "River table için 50-80 mm kalınlığında ahşap ideal sonuç verir." },
          { h3: "Epoksi Seçimi", content: "River table'da en popüler ürünler; ince yüzeyler için Pro Clear Ultra, derin kanallar için Deep Pour Max'tır." },
        ],
      },
      {
        h2: "Renk Tasarımı",
        content: "River table'da renk tasarımı marka farkınızı belirler. Okyanus mavisi pigment ile başlayın, ardından beyaz ve metalik altın kombinasyonu deneyin. Pigmentleri epoksiyle 1:20 oranında karıştırın.",
      },
    ],
    relatedProductIds: ["pro-clear-ultra", "deep-pour-max", "pigment-ocean-blue"],
  },
};

function addInternalLinks(text: string): React.ReactNode {
  const entries = Object.entries(INTERNAL_LINKS);
  let lastIdx = 0;
  const parts: React.ReactNode[] = [];
  const lowerText = text.toLowerCase();

  entries.forEach(([keyword, link]) => {
    const idx = lowerText.indexOf(keyword.toLowerCase());
    if (idx !== -1) {
      parts.push(text.slice(lastIdx, idx));
      parts.push(
        <Link
          key={`${keyword}-${idx}`}
          href={link.href}
          className="font-semibold underline decoration-dotted underline-offset-2 transition-colors hover:no-underline"
          style={{ color: "#D4AF37" }}
        >
          {text.slice(idx, idx + keyword.length)}
        </Link>
      );
      lastIdx = idx + keyword.length;
    }
  });
  parts.push(text.slice(lastIdx));
  return <>{parts}</>;
}

export default function AkademiPostPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? "";
  const post = getPostBySlug(slug);
  const article = ARTICLE_CONTENT[slug];
  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <>
        <Header />
        <div className="container-premium pt-40 pb-20 text-center">
          <h1 className="text-3xl font-black text-[#111827]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Makale Bulunamadı
          </h1>
          <Link href="/akademi" className="btn-primary inline-flex items-center gap-2 mt-6">
            <ArrowLeft size={16} /> Akademiye Dön
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const relatedProducts = article?.relatedProductIds
    ? products.filter((p) => article.relatedProductIds.includes(p.id))
    : findRelatedProducts(`${post.title} ${post.excerpt} ${post.tags.join(" ")}`);

  return (
    <>
      <Header />
      <main style={{ background: "#FAFAF8" }}>
        {/* Hero */}
        <div className="relative pt-32 pb-16 overflow-hidden" style={{ background: "#0A2342" }}>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('${post.image}')` }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,35,66,0.7), rgba(10,35,66,0.98))" }} />
          <div className="container-premium relative z-10 max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-white/30 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <Link href="/" className="hover:text-[#D4AF37] transition-colors">Ana Sayfa</Link>
              <span>/</span>
              <Link href="/akademi" className="hover:text-[#D4AF37] transition-colors">Akademi</Link>
              <span>/</span>
              <span className="text-white/50">{post.category}</span>
            </nav>

            <span
              className="inline-block px-3 py-1.5 rounded-lg text-xs font-bold mb-5"
              style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
            >
              {post.category}
            </span>
            <h1
              className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}
            >
              {article?.h1 ?? post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className="flex items-center gap-1.5"><User size={14} /> {post.author.name} — {post.author.role}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime} dk okuma</span>
              <span>{new Date(post.date).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
          </div>
        </div>

        {/* Article + Sidebar */}
        <div className="container-premium pt-16 pre-footer max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article */}
            <article className="lg:col-span-2">
              {/* Featured image */}
              <div className="relative h-72 rounded-3xl overflow-hidden mb-10">
                <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" priority />
              </div>

              {/* Article content */}
              {article ? (
                <div className="prose-custom">
                  {article.sections.map((section, i) => (
                    <div key={i} className="mb-10">
                      <h2
                        className="text-2xl font-black text-[#111827] mb-4"
                        style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.01em" }}
                      >
                        {section.h2}
                      </h2>
                      <p
                        className="text-[#374151] leading-relaxed mb-4"
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", lineHeight: "1.8" }}
                      >
                        {addInternalLinks(section.content)}
                      </p>
                      {section.h3sections?.map((h3s, j) => (
                        <div key={j} className="ml-4 mb-4 pl-4" style={{ borderLeft: "3px solid rgba(212,175,55,0.3)" }}>
                          <h3
                            className="text-lg font-bold text-[#111827] mb-2"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            {h3s.h3}
                          </h3>
                          <p
                            className="text-[#6B7280] leading-relaxed"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {addInternalLinks(h3s.content)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="prose max-w-none">
                  <p className="text-[#374151] leading-relaxed text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {post.excerpt}
                  </p>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-10 pt-8" style={{ borderTop: "1px solid rgba(10,35,66,0.08)" }}>
                <Tag size={14} className="text-[#9CA3AF]" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{
                      background: "rgba(10,35,66,0.06)",
                      color: "#374151",
                      fontFamily: "'Inter', sans-serif",
                      border: "1px solid rgba(10,35,66,0.08)",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share */}
              <div
                className="mt-8 p-5 rounded-2xl flex items-center justify-between"
                style={{ background: "rgba(10,35,66,0.04)", border: "1px solid rgba(10,35,66,0.08)" }}
              >
                <div>
                  <div className="text-sm font-bold text-[#111827]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Bu makaleyi paylaşın</div>
                  <div className="text-xs text-[#9CA3AF]" style={{ fontFamily: "'Inter', sans-serif" }}>Epoksi topluluğuna katkıda bulunun</div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5" style={{ background: "#0A2342", color: "white", fontFamily: "'Montserrat', sans-serif" }}>
                  <Share2 size={16} /> Paylaş
                </button>
              </div>

              {/* Related Products — article-matched */}
              {relatedProducts.length > 0 && (
                <div className="mt-10">
                  <h3
                    className="text-xl font-black text-[#111827] mb-6"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Bu Makalede Kullanılan Ürünler
                  </h3>
                  <div className="space-y-4">
                    {relatedProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/urunler/${product.slug}`}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white group hover:-translate-y-0.5 transition-all block"
                        style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.06)" }}
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0" style={{ background: "#F3F4F6" }}>
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="64px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-[#9CA3AF] mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>{product.category}</div>
                          <div className="font-bold text-[#111827] group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>{product.shortName}</div>
                          <div className="text-sm text-[#9CA3AF]">{product.shortDescription.slice(0, 60)}...</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-black text-[#0A2342]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{formatPrice(product.price)}</div>
                          <div className="flex items-center justify-end gap-1 mt-2 text-xs text-[#D4AF37] font-semibold group-hover:gap-2 transition-all" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            İncele <ArrowRight size={12} />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Author */}
              <div
                className="p-6 rounded-2xl"
                style={{ background: "white", boxShadow: "0 4px 16px rgba(10,35,66,0.06)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: "rgba(10,35,66,0.05)" }}
                >
                  👤
                </div>
                <div className="font-bold text-[#111827] mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>{post.author.name}</div>
                <div className="text-xs text-[#9CA3AF] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>{post.author.role}</div>
                <p className="text-xs text-[#6B7280] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  RESINOVA uzman kadrosunun deneyimli üyesi. Epoksi kimyası ve uygulama teknikleri konusunda 10+ yıl deneyim.
                </p>
              </div>

              {/* Table of contents */}
              {article && (
                <div
                  className="p-6 rounded-2xl sticky top-24"
                  style={{ background: "white", boxShadow: "0 4px 16px rgba(10,35,66,0.06)" }}
                >
                  <h4
                    className="text-xs font-bold uppercase tracking-widest mb-4"
                    style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    İçindekiler
                  </h4>
                  <nav className="space-y-2">
                    {article.sections.map((s, i) => (
                      <div key={i} className="text-sm text-[#6B7280] hover:text-[#D4AF37] cursor-pointer transition-colors py-1 border-b border-[rgba(10,35,66,0.04)] last:border-0" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {s.h2}
                      </div>
                    ))}
                  </nav>
                </div>
              )}

              {/* Other posts */}
              <div
                className="p-6 rounded-2xl"
                style={{ background: "white", boxShadow: "0 4px 16px rgba(10,35,66,0.06)" }}
              >
                <h4
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
                >
                  Benzer Makaleler
                </h4>
                <div className="space-y-4">
                  {otherPosts.map((p) => (
                    <Link key={p.id} href={`/akademi/${p.slug}`} className="flex gap-3 group">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={p.image} alt={p.title} fill className="object-cover" sizes="56px" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#111827] group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {p.title}
                        </div>
                        <div className="text-xs text-[#9CA3AF] mt-1 flex items-center gap-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                          <Clock size={10} /> {p.readTime} dk
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8" style={{ borderTop: "1px solid rgba(10,35,66,0.08)" }}>
            <Link href="/akademi" className="flex items-center gap-2 text-sm font-semibold text-[#6B7280] hover:text-[#D4AF37] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <ArrowLeft size={16} /> Tüm Makaleler
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
