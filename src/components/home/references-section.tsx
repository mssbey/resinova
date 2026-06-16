"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const projects = [
  {
    id: 1,
    before: "/images/hero/epoxy-river-table.jpg",
    after:  "/images/hero/epoxy-art.jpg",
    title:    "200 cm Ceviz River Table",
    location: "İstanbul, Türkiye",
    product:  "Pro Clear Ultra 15 kg",
    tag:      "River Table",
  },
  {
    id: 2,
    before: "/images/hero/resin-craft.jpg",
    after:  "/images/hero/wood-epoxy.jpg",
    title:    "Okyanus Temalı Yemek Masası",
    location: "Ankara, Türkiye",
    product:  "Deep Pour Max + Ocean Blue Pigment",
    tag:      "Sanat Projesi",
  },
];

const testimonials = [
  {
    id: 1,
    name:   "Mehmet Yılmaz",
    role:   "Marangoz Ustası",
    city:   "İstanbul",
    image:  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    rating: 5,
    text:   "RESINOVA Pro Clear Ultra ile yaptığım river tablolar artık sergide satılıyor. Kabarcık sorunu sıfıra indi, rengi 2 yıldır hiç değişmedi.",
    product: "Pro Clear Ultra",
  },
  {
    id: 2,
    name:   "Zeynep Kara",
    role:   "Sanat Tasarımcısı",
    city:   "İzmir",
    image:  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    text:   "Hobi Crystal ile ürettiğim takılar beni profesyonelliğe taşıdı. Kristal berraklığı başka hiçbir üründe görmedim. Gönül rahatlığıyla tavsiye ediyorum.",
    product: "Hobi Crystal",
  },
  {
    id: 3,
    name:   "Ahmet Demir",
    role:   "Fabrika Sahibi",
    city:   "Bursa",
    image:  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    text:   "Toptan alımlarımızda tutarlı kalite ve hızlı teslimat. 3 yıldır RESINOVA ile çalışıyoruz ve hiç hayal kırıklığı yaşamadık.",
    product: "Toptan B2B",
  },
];

function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pos);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-72 rounded-2xl overflow-hidden cursor-ew-resize select-none"
      onMouseMove={(e) => isDragging && handleMove(e.clientX)}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      style={{
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      {/* After (full) */}
      <Image src={after} alt="Sonra" fill className="object-cover" sizes="500px" />
      <div
        className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider"
        style={{
          background: "rgba(16,59,115,0.75)",
          backdropFilter: "blur(8px)",
          color: "white",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        SONRA
      </div>

      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <Image src={before} alt="Önce" fill className="object-cover" sizes="500px" />
        <div
          className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider"
          style={{
            background: "rgba(107,79,53,0.75)",
            backdropFilter: "blur(8px)",
            color: "white",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          ÖNCE
        </div>
      </div>

      {/* Drag handle */}
      <div
        className="absolute top-0 bottom-0 flex items-center justify-center"
        style={{ left: `calc(${sliderPos}% - 1px)` }}
      >
        {/* Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5"
          style={{
            background: "linear-gradient(180deg, transparent, white 15%, white 85%, transparent)",
          }}
        />
        {/* Handle knob */}
        <div
          className="relative w-10 h-10 rounded-full flex items-center justify-center z-10 transition-transform duration-200"
          style={{
            background: "white",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            transform: isDragging ? "scale(1.15)" : "scale(1)",
          }}
        >
          <div className="flex items-center gap-0.5">
            <ChevronLeft size={11} className="text-[#0A2342]" />
            <ChevronRight size={11} className="text-[#0A2342]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReferencesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section
      ref={ref}
      className="relative section-padding overflow-hidden"
      style={{ background: "#060F1E" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-8"
        style={{
          backgroundImage: "url('/images/hero/epoxy-coating.jpg')",
        }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(6,15,30,0.98) 0%, rgba(10,35,66,0.92) 50%, rgba(6,15,30,0.98) 100%)",
        }}
      />

      {/* Top gold line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.8), transparent)" }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(212,175,55,0.07), transparent 70%)",
        }}
      />

      <div className="relative z-10 container-premium">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span
            className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] mb-5"
            style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
          >
            Referanslar & Yorumlar
          </span>
          <h2
            className="text-5xl md:text-6xl font-black text-white leading-[0.9]"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.04em" }}
          >
            Gerçek Projeler
            <br />
            <span className="text-gradient-gold">Gerçek Sonuçlar</span>
          </h2>
        </motion.div>

        {/* Before/After Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.15 * i, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="group"
            >
              <div
                className="p-6 rounded-3xl transition-all duration-400 hover:-translate-y-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <BeforeAfterSlider before={project.before} after={project.after} />
                <div className="mt-5">
                  {/* Tag */}
                  <span
                    className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-3"
                    style={{
                      background: "rgba(212,175,55,0.12)",
                      color: "#D4AF37",
                      border: "1px solid rgba(212,175,55,0.2)",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {project.tag}
                  </span>
                  <h3
                    className="text-base font-black text-white mb-1.5"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {project.location} — <span className="text-white/75">{project.product}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Active testimonial header */}
          <div className="text-center mb-10">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.25)" }}
            >
              <Quote size={20} className="text-[#D4AF37]" />
            </div>
            <p
              className="text-xl md:text-2xl text-white/88 leading-relaxed max-w-2xl mx-auto italic mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              &ldquo;{testimonials[activeTestimonial].text}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  fill className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {testimonials[activeTestimonial].name}
                </div>
                <div className="text-xs text-white/55">
                  {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].city}
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                className="text-left transition-all duration-400 p-6 rounded-2xl cursor-pointer group"
                style={{
                  background: activeTestimonial === i ? "rgba(212,175,55,0.10)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${activeTestimonial === i ? "rgba(212,175,55,0.35)" : "rgba(255,255,255,0.08)"}`,
                  backdropFilter: "blur(8px)",
                  transform: activeTestimonial === i ? "translateY(-4px)" : "none",
                  boxShadow: activeTestimonial === i ? "0 20px 40px rgba(0,0,0,0.2), 0 0 30px rgba(212,175,55,0.08)" : "none",
                }}
                onClick={() => setActiveTestimonial(i)}
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={13} className="fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>

                {/* Product badge */}
                <span
                  className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold mb-3"
                  style={{
                    background: "rgba(212,175,55,0.10)",
                    color: "#D4AF37",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {t.product}
                </span>

                <p
                  className="text-sm text-white/75 leading-relaxed mb-5 line-clamp-3"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={t.image} alt={t.name} fill className="object-cover" sizes="36px" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {t.name}
                    </div>
                    <div className="text-[11px] text-white/50">
                      {t.role}, {t.city}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(212,175,55,0.03) 50%, rgba(212,175,55,0.06))",
        }}
      />
    </section>
  );
}
