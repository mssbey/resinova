export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  image: string;
  date: string;
  author: {
    name: string;
    role: string;
  };
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "epoksi-masa-nasil-yapilir",
    title: "Epoksi Masa Nasıl Yapılır? Adım Adım Profesyonel Rehber",
    excerpt:
      "River table ve epoksi masanın sırlarını öğrenin. Ahşap seçiminden son kat cilalamaya kadar her adımı detaylandırdık.",
    category: "Rehber",
    readTime: 12,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=90",
    date: "2026-05-15",
    author: { name: "Ahmet Kaya", role: "Ürün Direktörü" },
    tags: ["river-table", "ahsap-masa", "rehber"],
    featured: true,
  },
  {
    id: "2",
    slug: "epoksi-neden-sarar",
    title: "Epoksi Neden Sararır? Nedenleri ve Çözümleri",
    excerpt:
      "UV ışınları, ısı ve oksidasyonun epoksi üzerindeki etkileri. Sararmayı önlemenin bilimsel yöntemleri.",
    category: "Teknik",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=90",
    date: "2026-05-08",
    author: { name: "Dr. Selin Arslan", role: "Kimya Mühendisi" },
    tags: ["sarama", "uv", "teknik"],
    featured: true,
  },
  {
    id: "3",
    slug: "kabarcik-problemi-cozumleri",
    title: "Epokside Kabarcık Problemleri ve Kesin Çözümleri",
    excerpt:
      "Kabarcık oluşumunun gerçek nedenleri ve sizi bir daha hiç kabarcıkla karşılaştırmayacak teknikler.",
    category: "Teknik",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=90",
    date: "2026-04-22",
    author: { name: "Mehmet Demir", role: "Uygulamalar Uzmanı" },
    tags: ["kabarcık", "sorun-giderme", "teknik"],
  },
  {
    id: "4",
    slug: "river-table-rehberi",
    title: "River Table Yapım Rehberi: Başlangıçtan Profesyonelliğe",
    excerpt:
      "Doğru ahşap seçiminden kalıp hazırlamaya, döküm tekniğinden son işlemlere kadar eksiksiz river table rehberi.",
    category: "Rehber",
    readTime: 18,
    image: "https://images.unsplash.com/photo-1599999905050-e4f5e3f2b8b5?w=800&q=90",
    date: "2026-04-10",
    author: { name: "Ahmet Kaya", role: "Ürün Direktörü" },
    tags: ["river-table", "rehber", "ahsap"],
    featured: true,
  },
  {
    id: "5",
    slug: "2026-epoksi-trend",
    title: "2026 Epoksi Tasarım Trendleri: Bu Yıl Ne Popüler?",
    excerpt:
      "Organik formlar, mavi-yeşil tonlar ve metalik efektler. 2026'nın en çok tercih edilen epoksi tasarım trendlerini keşfedin.",
    category: "İlham",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=90",
    date: "2026-04-01",
    author: { name: "Zeynep Yıldız", role: "Tasarım Direktörü" },
    tags: ["trend", "tasarım", "2026"],
  },
  {
    id: "6",
    slug: "dogru-pigment-secimi",
    title: "Epoksi Projeniz İçin Doğru Pigment Seçimi",
    excerpt:
      "Transparan, metalik, florasanlı. Epoksi pigment türlerini ve hangi proje için hangisinin ideal olduğunu anlattık.",
    category: "Rehber",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=90",
    date: "2026-03-15",
    author: { name: "Dr. Selin Arslan", role: "Kimya Mühendisi" },
    tags: ["pigment", "renk", "seçim"],
  },
];

export const getFeaturedPosts = () => blogPosts.filter((p) => p.featured);

export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);
