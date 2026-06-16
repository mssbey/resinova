"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, BookOpen, Play, FileText, User } from "lucide-react";
import { getFeaturedPosts } from "@/data/blog";

const categoryStyle: Record<string, { bg: string; color: string }> = {
  Rehber:  { bg: "rgba(212,175,55,0.15)",  color: "#D4AF37" },
  Teknik:  { bg: "rgba(16,59,115,0.15)",   color: "#5B8ED4" },
  İlham:   { bg: "rgba(107,79,53,0.15)",   color: "#C39872" },
};

export default function AcademySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const posts = getFeaturedPosts();
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  const featured = posts[0];
  const secondary = posts.slice(1, 4);

  return (
    <section
      ref={ref}
      className="relative section-padding overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F3F4F6 0%, #EAECEF 100%)" }}
    >
      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 container-premium">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <span
              className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] mb-5"
              style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
            >
              RESINOVA Akademi
            </span>
            <h2
              className="text-5xl md:text-6xl font-black text-[#111827] leading-[0.9]"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.04em" }}
            >
              Bilginin
              <br />
              <span className="text-gradient-gold">Kaynağından Öğren</span>
            </h2>
          </div>
          <Link
            href="/akademi"
            className="group flex items-center gap-2 text-sm font-bold text-[#0A2342] hover:text-[#D4AF37] transition-colors duration-300"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Tüm İçerikler
            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">

          {/* ─── Featured post — Netflix hero card (3/5 columns) ───── */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-3"
              onMouseEnter={() => setHoveredPost(featured.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <Link href={`/akademi/${featured.slug}`} className="block h-full group">
                <div
                  className="relative h-full min-h-[480px] rounded-3xl overflow-hidden"
                  style={{
                    boxShadow:
                      hoveredPost === featured.id
                        ? "0 32px 64px rgba(10,35,66,0.2), 0 0 0 1px rgba(212,175,55,0.2)"
                        : "0 12px 40px rgba(10,35,66,0.12)",
                    transform: hoveredPost === featured.id ? "translateY(-4px)" : "none",
                    transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
                  }}
                >
                  {/* Background image */}
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    style={{
                      transform: hoveredPost === featured.id ? "scale(1.05)" : "scale(1)",
                      transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1)",
                    }}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(6,15,30,0.08) 0%, rgba(6,15,30,0.3) 40%, rgba(6,15,30,0.92) 100%)",
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                    {/* Category */}
                    <div className="mb-4">
                      <span
                        className="inline-block px-3.5 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider"
                        style={{
                          background:
                            categoryStyle[featured.category]?.bg ?? "rgba(212,175,55,0.15)",
                          color: categoryStyle[featured.category]?.color ?? "#D4AF37",
                          backdropFilter: "blur(8px)",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        {featured.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight transition-colors duration-300"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: hoveredPost === featured.id ? "#D4AF37" : "white",
                      }}
                    >
                      {featured.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      className="text-sm text-white/72 mb-6 line-clamp-2 leading-relaxed max-w-xl"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {featured.excerpt}
                    </p>

                    {/* Meta bar */}
                    <div
                      className="flex items-center gap-5 pt-5"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
                    >
                      <span className="text-xs text-white/75 font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {featured.author.name}
                      </span>
                      <span className="text-white/30">·</span>
                      <span className="flex items-center gap-1.5 text-xs text-white/60">
                        <Clock size={11} />
                        {featured.readTime} dk okuma
                      </span>
                      <span className="text-white/30">·</span>
                      <span className="flex items-center gap-1.5 text-xs text-white/60">
                        <User size={11} />
                        {featured.author.role}
                      </span>
                    </div>
                  </div>

                  {/* "NEW" ribbon if applicable */}
                  <div className="absolute top-6 right-6">
                    <div
                      className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider"
                      style={{
                        background: "rgba(212,175,55,0.15)",
                        border: "1px solid rgba(212,175,55,0.3)",
                        color: "#D4AF37",
                        backdropFilter: "blur(12px)",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      Öne Çıkan
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* ─── Secondary posts — editorial cards (2/5 columns) ─── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {secondary.map((post, i) => {
              const catStyle = categoryStyle[post.category] ?? { bg: "rgba(212,175,55,0.12)", color: "#D4AF37" };
              const isHov = hoveredPost === post.id;

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                  animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                  transition={{ delay: 0.15 * (i + 1), duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                  className="flex-1"
                >
                  <Link href={`/akademi/${post.slug}`} className="block h-full group editorial-card">
                    <div
                      className="relative h-full rounded-2xl overflow-hidden bg-white flex flex-col transition-all duration-500"
                      style={{
                        boxShadow: isHov
                          ? "0 20px 40px rgba(10,35,66,0.14), 0 0 0 1px rgba(212,175,55,0.15)"
                          : "0 4px 16px rgba(10,35,66,0.07)",
                        transform: isHov ? "translateY(-4px)" : "none",
                      }}
                    >
                      {/* Thumbnail */}
                      <div className="relative h-36 overflow-hidden flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          style={{
                            transform: isHov ? "scale(1.06)" : "scale(1)",
                            transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
                          }}
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                        {/* Category chip overlay */}
                        <div className="absolute bottom-3 left-3">
                          <span
                            className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider"
                            style={{
                              background: catStyle.bg,
                              color: catStyle.color,
                              backdropFilter: "blur(8px)",
                              border: `1px solid ${catStyle.color}40`,
                              fontFamily: "'Montserrat', sans-serif",
                            }}
                          >
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Text content */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3
                          className="text-sm font-black text-[#111827] mb-2 line-clamp-2 leading-tight transition-colors duration-300"
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                            color: isHov ? "#0A2342" : "#111827",
                          }}
                        >
                          {post.title}
                        </h3>
                        <p
                          className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed mb-auto"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div
                          className="flex items-center gap-3 mt-4 pt-3"
                          style={{ borderTop: "1px solid rgba(10,35,66,0.06)" }}
                        >
                          <span className="text-[11px] text-[#6B7280] font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            {post.author.name}
                          </span>
                          <span className="ml-auto flex items-center gap-1 text-[11px] text-[#9CA3AF]">
                            <Clock size={10} />
                            {post.readTime} dk
                          </span>
                        </div>
                      </div>

                      {/* Bottom gold accent line */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-500"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${catStyle.color}, transparent)`,
                          opacity: isHov ? 0.7 : 0,
                        }}
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── Academy type cards ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            {
              icon: <BookOpen size={22} />,
              label: "Blog & Rehberler",
              count: "50+ İçerik",
              desc: "Adım adım teknik rehberler",
              href: "/akademi",
              color: "#0A2342",
              accent: "rgba(10,35,66,0.08)",
            },
            {
              icon: <Play size={22} />,
              label: "Video Eğitimler",
              count: "30+ Video",
              desc: "Profesyonel uygulama videoları",
              href: "/akademi/videolar",
              color: "#D4AF37",
              accent: "rgba(212,175,55,0.08)",
            },
            {
              icon: <FileText size={22} />,
              label: "Teknik Dökümanlar",
              count: "TDS & SDS",
              desc: "ISO sertifikası ve teknik veriler",
              href: "/akademi/teknik",
              color: "#6B4F35",
              accent: "rgba(107,79,53,0.08)",
            },
          ].map((type) => (
            <Link key={type.label} href={type.href}>
              <div
                className="flex items-center gap-4 p-5 rounded-2xl bg-white cursor-pointer group transition-all duration-400 hover:-translate-y-1"
                style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.07)" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: type.accent,
                    color: type.color,
                    border: `1px solid ${type.color}22`,
                  }}
                >
                  {type.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-sm font-black text-[#111827] group-hover:text-[#0A2342] transition-colors"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {type.label}
                  </div>
                  <div className="text-xs text-[#6B7280] mt-0.5">{type.count} · {type.desc}</div>
                </div>
                <ArrowRight
                  size={15}
                  className="flex-shrink-0 text-[#9CA3AF] group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all"
                />
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
