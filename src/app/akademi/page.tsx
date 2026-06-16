import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { blogPosts } from "@/data/blog";
import { Clock, User, ArrowRight, BookOpen, Play, FileText, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Akademi — Epoksi Rehberleri & Video Eğitimler",
  description: "River table, epoksi döküm teknikleri ve profesyonel ipuçları için kapsamlı rehberler ve video eğitimler.",
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  "Rehber": { bg: "rgba(212,175,55,0.1)", text: "#D4AF37" },
  "Teknik": { bg: "rgba(16,59,115,0.08)", text: "#103B73" },
  "İlham": { bg: "rgba(107,79,53,0.08)", text: "#6B4F35" },
};

export default function AkademiPage() {
  const featured = blogPosts.filter((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <>
      <Header />
      <main style={{ background: "#FAFAF8" }}>
        {/* Hero */}
        <div
          className="relative pt-32 pb-20"
          style={{ background: "linear-gradient(135deg, #0A2342 0%, #103B73 60%, #6B4F35 100%)" }}
        >
          <div className="container-premium text-center relative z-10">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-2 rounded-full"
              style={{
                background: "rgba(212,175,55,0.15)",
                color: "#D4AF37",
                fontFamily: "'Montserrat', sans-serif",
                border: "1px solid rgba(212,175,55,0.3)",
              }}
            >
              RESINOVA Akademi
            </span>
            <h1
              className="text-4xl md:text-6xl font-black text-white mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.03em" }}
            >
              Bilginin Kaynağından
              <br />
              <span className="text-gradient-gold">Öğren</span>
            </h1>
            <p
              className="text-white/75 text-xl max-w-2xl mx-auto mb-12"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              River table&apos;dan sanat projelerine, epoksi dünyasında başarının sırrı
              doğru bilgiden geçer. Uzman ekibimizin hazırladığı içerikler burada.
            </p>

            {/* Quick links */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: <BookOpen size={18} />, label: "Blog & Rehberler", count: "50+" },
                { icon: <Play size={18} />, label: "Video Eğitimler", count: "30+" },
                { icon: <FileText size={18} />, label: "Teknik Dökümanlar", count: "TDS/SDS" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div className="text-[#D4AF37]">{item.icon}</div>
                  <div className="text-left">
                    <div className="text-white text-sm font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.label}</div>
                    <div className="text-white/70 text-xs">{item.count} İçerik</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: "linear-gradient(to top, #FAFAF8, transparent)" }} />
        </div>

        {/* Featured articles */}
        <section className="section-padding">
          <div className="container-premium">
            <div className="flex items-center justify-between mb-12">
              <h2
                className="text-3xl font-black text-[#111827]"
                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}
              >
                Öne Çıkan İçerikler
              </h2>
              <span className="text-sm text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
                {featured.length} içerik
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Large feature */}
              {featured[0] && (
                <div className="lg:col-span-2">
                  <Link href={`/akademi/${featured[0].slug}`} className="block group">
                    <div
                      className="relative h-96 lg:h-full min-h-[400px] rounded-3xl overflow-hidden"
                      style={{ boxShadow: "0 8px 32px rgba(10,35,66,0.12)" }}
                    >
                      <Image
                        src={featured[0].image}
                        alt={featured[0].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        priority
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(6,15,30,0.95) 0%, rgba(6,15,30,0.2) 60%, transparent 100%)" }}
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <span
                          className="inline-block px-3 py-1.5 rounded-lg text-xs font-bold mb-4 w-fit"
                          style={{
                            ...(categoryColors[featured[0].category] ?? { bg: "#D4AF37", text: "#0A2342" }),
                            background: categoryColors[featured[0].category]?.bg ?? "rgba(212,175,55,0.2)",
                            color: categoryColors[featured[0].category]?.text ?? "#D4AF37",
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          {featured[0].category}
                        </span>
                        <h2
                          className="text-2xl font-black text-white mb-3 leading-tight group-hover:text-[#D4AF37] transition-colors"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {featured[0].title}
                        </h2>
                        <p className="text-white/75 text-sm mb-4 line-clamp-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {featured[0].excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-white/65">
                          <span className="flex items-center gap-1.5"><User size={12} /> {featured[0].author.name}</span>
                          <span className="flex items-center gap-1.5"><Clock size={12} /> {featured[0].readTime} dk okuma</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Side features */}
              <div className="flex flex-col gap-6">
                {featured.slice(1, 3).map((post) => (
                  <Link key={post.id} href={`/akademi/${post.slug}`} className="block group flex-1">
                    <div
                      className="relative h-44 rounded-2xl overflow-hidden"
                      style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.08)" }}
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(6,15,30,0.9) 0%, transparent 60%)" }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <span
                          className="inline-block text-xs font-bold mb-2"
                          style={{
                            color: categoryColors[post.category]?.text ?? "#D4AF37",
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          {post.category}
                        </span>
                        <h3
                          className="text-sm font-bold text-white leading-tight group-hover:text-[#D4AF37] transition-colors line-clamp-2"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All articles */}
        <section
          className="section-padding"
          style={{ background: "#F3F4F6" }}
        >
          <div className="container-premium">
            <div className="flex items-center justify-between mb-12">
              <h2
                className="text-3xl font-black text-[#111827]"
                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}
              >
                Tüm İçerikler
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`/akademi/${post.slug}`} className="block group">
                  <div
                    className="bg-white rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col"
                    style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.06)" }}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="px-2.5 py-1 rounded-lg text-xs font-bold"
                          style={{
                            background: categoryColors[post.category]?.bg ?? "rgba(212,175,55,0.1)",
                            color: categoryColors[post.category]?.text ?? "#D4AF37",
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#6B7280]">
                          <Clock size={11} />
                          {post.readTime} dk
                        </span>
                      </div>
                      <h3
                        className="font-bold text-[#111827] mb-2 leading-tight group-hover:text-[#D4AF37] transition-colors line-clamp-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {post.title}
                      </h3>
                      <p
                        className="text-sm text-[#4B5563] mb-4 leading-relaxed line-clamp-2 flex-1"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(10,35,66,0.06)" }}>
                        <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                          <User size={12} />
                          <span>{post.author.name}</span>
                        </div>
                        <span
                          className="text-xs font-bold text-[#D4AF37] flex items-center gap-1 group-hover:gap-2 transition-all"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          Oku <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Tags cloud */}
        <section className="pt-12 pre-footer-cards container-premium">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6B7280]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <Tag size={14} className="inline mr-1" /> Etiketler:
            </span>
            {["River Table", "Epoksi Masa", "Kabarcık", "UV Direnci", "Pigment", "Döküm Teknikleri", "Sararma", "Kalıp", "Hobi", "2026 Trendler"].map((tag) => (
              <Link
                key={tag}
                href={`/akademi?tag=${tag.toLowerCase()}`}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:-translate-y-0.5"
                style={{
                  background: "rgba(10,35,66,0.06)",
                  color: "#374151",
                  fontFamily: "'Inter', sans-serif",
                  border: "1px solid rgba(10,35,66,0.08)",
                }}
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
