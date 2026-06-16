export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  count: number;
  color: string;
  gradient: string;
}

export const categories: Category[] = [
  {
    id: "ahsap-epoksi",
    slug: "ahsap-epoksi",
    name: "Ahşap Epoksi Sistemleri",
    description: "River table ve büyük yüzey dökümleri için ultra berrak profesyonel sistemler",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=90",
    count: 8,
    color: "#0A2342",
    gradient: "from-[#0A2342] to-[#103B73]",
  },
  {
    id: "hobi",
    slug: "hobi",
    name: "Hobi Sistemleri",
    description: "Takı, tablo ve küçük sanat projeleri için crystal clear sistemler",
    image: "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?w=800&q=90",
    count: 5,
    color: "#6B4F35",
    gradient: "from-[#6B4F35] to-[#A67C52]",
  },
  {
    id: "emprenye",
    slug: "emprenye",
    name: "Emprenye Reçineleri",
    description: "Ahşap sertleştirme ve koruma için derin nüfuzlu özel formüller",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=90",
    count: 4,
    color: "#103B73",
    gradient: "from-[#103B73] to-[#0A2342]",
  },
  {
    id: "pigment",
    slug: "pigment",
    name: "Pigmentler & Katkılar",
    description: "Ultra konsantre UV kararlı organik pigmentler ve özel katkı maddeleri",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=90",
    count: 24,
    color: "#D4AF37",
    gradient: "from-[#D4AF37] to-[#C9A15A]",
  },
];
