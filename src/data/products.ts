export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  unit: string;
  sizes: string[];
  images: string[];
  badge?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  description: string;
  features: string[];
  relatedProducts?: string[];
  specs: {
    mixRatio: string;
    maxPour: string;
    gelTime: string;
    fullCure: string;
    density: string;
    hardness: string;
    color: string;
    viscosity: string;
  };
  usageSteps: {
    step: number;
    title: string;
    description: string;
    icon: string;
  }[];
  applications: string[];
  tags: string[];
}

export const products: Product[] = [
  {
    id: "pro-clear-ultra",
    slug: "resinova-pro-clear-ultra",
    name: "RESINOVA Pro Clear Ultra",
    shortName: "Pro Clear Ultra",
    category: "Ahşap Epoksi Sistemleri",
    categorySlug: "ahsap-epoksi",
    price: 1290,
    originalPrice: 1590,
    unit: "set",
    sizes: ["1.5 kg Set", "3 kg Set", "7.5 kg Set", "15 kg Set", "30 kg Set"],
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=90",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=90",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=90",
    ],
    badge: "ÇOK SATAN",
    isBestseller: true,
    rating: 4.9,
    reviewCount: 312,
    shortDescription:
      "River table ve büyük yüzey dökümleri için ultra kristal berraklıkta profesyonel epoksi sistemi.",
    description:
      "RESINOVA Pro Clear Ultra, river table yapımı ve büyük döküm yüzeyler için özel olarak formüle edilmiş ultra berrak epoksi reçinesidir. Maksimum 6 cm tek seferde döküm kapasitesi ile uzun çalışma süresi sağlar. İstanbul fabrikamızda üretilen bu sistem, Türkiye'nin en gelişmiş epoksi teknolojisini yansıtmaktadır.",
    features: [
      "UV & Sararma Direnci — 10 yıl garanti",
      "Kolay Kabarcık Giderme — %99 kabarcıksız sonuç",
      "Kokusuz & Solvent İçermez",
      "Kaya Gibi Sertlik — Shore D 85",
      "Kristal Berraklık — 95%+ ışık geçirgenliği",
      "Düşük Büzülme",
    ],
    specs: {
      mixRatio: "Ağırlıkça 2:1 (A:B)",
      maxPour: "6 cm tek seferlik döküm",
      gelTime: "24-36 saat (20°C)",
      fullCure: "7 gün (20°C)",
      density: "1.08 g/cm³",
      hardness: "Shore D 85",
      color: "Su Berraklığında Şeffaf",
      viscosity: "900 mPas @ 25°C",
    },
    usageSteps: [
      {
        step: 1,
        title: "Doğru Ölçüm",
        description: "A ve B bileşenlerini hassas terazi ile 2:1 ağırlık oranında ölçün.",
        icon: "scale",
      },
      {
        step: 2,
        title: "Homojen Karışım",
        description: "5 dakika boyunca yavaş ve dikkatli şekilde karıştırın. Kenar ve dip kısımları kazıyın.",
        icon: "mix",
      },
      {
        step: 3,
        title: "Dinlendirme",
        description: "Karışımı 10-15 dakika bekletin, havacıkların yüzeye çıkmasını sağlayın.",
        icon: "wait",
      },
      {
        step: 4,
        title: "Döküm",
        description: "Yavaşça döküp ısı tabancası ile yüzeydeki kabarcıkları giderin.",
        icon: "pour",
      },
    ],
    applications: ["River Table", "Epoksi Masa", "Büyük Panel Döküm", "Sanat Çalışmaları", "Endüstriyel Yüzey"],
    tags: ["river-table", "ahsap-epoksi", "profesyonel", "ultra-berrak"],
  },
  {
    id: "hobi-crystal",
    slug: "resinova-hobi-crystal",
    name: "RESINOVA Hobi Crystal",
    shortName: "Hobi Crystal",
    category: "Hobi Sistemleri",
    categorySlug: "hobi",
    price: 449,
    unit: "set",
    sizes: ["750 ml Set", "1.5 kg Set", "3 kg Set"],
    images: [
      "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?w=800&q=90",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=90",
    ],
    isNew: true,
    badge: "YENİ",
    rating: 4.8,
    reviewCount: 156,
    shortDescription:
      "Takı, tablo ve küçük sanat projeleri için mükemmel ince döküm epoksi sistemi.",
    description:
      "Hobi Crystal, sanat severlerin ve hobicilerin tercihi olan, küçük ölçekli çalışmalar için özel formüle edilmiş crystal clear epoksi reçinesidir. Takı yapımından ahşap baskıya, tablo kaplamasından dekoratif objelere kadar geniş uygulama yelpazesiyle ideal seçim.",
    features: [
      "Yüksek UV direnci",
      "Çok düşük viskozite — mükemmel yayılma",
      "Kendiliğinden düzelen yüzey",
      "Kokusuz formül",
      "Geniş pigment uyumluluğu",
      "Kabarcık bırakmayan özel formül",
    ],
    specs: {
      mixRatio: "Hacimce 1:1 (A:B)",
      maxPour: "0.5 cm tek seferlik",
      gelTime: "12-18 saat (23°C)",
      fullCure: "3-5 gün (23°C)",
      density: "1.06 g/cm³",
      hardness: "Shore D 78",
      color: "Kristal Şeffaf",
      viscosity: "350 mPas @ 25°C",
    },
    usageSteps: [
      {
        step: 1,
        title: "Doğru Ölçüm",
        description: "A ve B bileşenlerini eşit hacimlerde ölçün.",
        icon: "scale",
      },
      {
        step: 2,
        title: "Karışım",
        description: "3 dakika boyunca iyice karıştırın.",
        icon: "mix",
      },
      {
        step: 3,
        title: "Döküm",
        description: "Yavaşça kalıba dökün.",
        icon: "pour",
      },
      {
        step: 4,
        title: "Kürleme",
        description: "24 saat sonra kısmen sertleşir, 5 gün tam kürleme.",
        icon: "wait",
      },
    ],
    applications: ["Takı Yapımı", "Tablo Kaplama", "Ahşap Baskı", "Kalıp Döküm", "Dekoratif Objeler"],
    tags: ["hobi", "tablo", "takı", "sanat", "kristal"],
  },
  {
    id: "emprenye-pro",
    slug: "resinova-emprenye-pro",
    name: "RESINOVA Emprenye Pro",
    shortName: "Emprenye Pro",
    category: "Emprenye Reçineleri",
    categorySlug: "emprenye",
    price: 890,
    unit: "set",
    sizes: ["3 kg Set", "7.5 kg Set", "15 kg Set"],
    images: [
      "https://images.unsplash.com/photo-1599999905050-e4f5e3f2b8b5?w=800&q=90",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=90",
    ],
    rating: 4.7,
    reviewCount: 89,
    shortDescription:
      "Ahşap sertleştirme ve derin nüfuz için özel formüle edilmiş düşük viskoziteli emprenye reçinesi.",
    description:
      "Emprenye Pro, çürümüş veya yumuşak ahşabı güçlendirmek, çatlakları doldurmak ve derin nüfuz ile sağlamlaştırmak için geliştirilmiş profesyonel emprenye reçinesidir. Çok düşük viskozitesi sayesinde ahşabın içine nüfuz eder.",
    features: [
      "Ultra düşük viskozite — derin nüfuz",
      "Ahşabı kristalize eder",
      "Çürümüş ahşabı sertleştirir",
      "Su ve nem bariyeri oluşturur",
      "Boyanabilir ve zımparalanabilir yüzey",
      "Uzun açık süre",
    ],
    specs: {
      mixRatio: "Ağırlıkça 3:1 (A:B)",
      maxPour: "Sınırsız — emprenye uygulaması",
      gelTime: "4-6 saat (20°C)",
      fullCure: "5-7 gün (20°C)",
      density: "1.04 g/cm³",
      hardness: "Shore D 70",
      color: "Sarımsı Şeffaf",
      viscosity: "150 mPas @ 25°C",
    },
    usageSteps: [
      {
        step: 1,
        title: "Ahşap Hazırlama",
        description: "Ahşabı temizleyin ve kurutun.",
        icon: "prepare",
      },
      {
        step: 2,
        title: "Karışım",
        description: "3:1 oranında karıştırın.",
        icon: "mix",
      },
      {
        step: 3,
        title: "Uygulama",
        description: "Fırça veya rulo ile uygulayın.",
        icon: "apply",
      },
      {
        step: 4,
        title: "Kürleme",
        description: "7 gün kürleme süresi bekleyin.",
        icon: "wait",
      },
    ],
    applications: ["Ahşap Sertleştirme", "Çatlak Doldurma", "Nem Bariyeri", "Yüzey Sağlamlaştırma"],
    tags: ["emprenye", "ahsap-guclendir", "dolgu", "profesyonel"],
  },
  {
    id: "pigment-ocean-blue",
    slug: "resinova-pigment-ocean-blue",
    name: "RESINOVA Pigment — Ocean Blue",
    shortName: "Ocean Blue Pigment",
    category: "Pigmentler",
    categorySlug: "pigment",
    price: 189,
    unit: "adet",
    sizes: ["50 ml", "150 ml", "500 ml"],
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=90",
    ],
    isNew: true,
    badge: "YENİ",
    rating: 4.9,
    reviewCount: 67,
    shortDescription:
      "Derin okyanus mavisi elde etmek için ultra konsantre epoksi uyumlu pigment.",
    description:
      "RESINOVA Pigment serisi, epoksi reçinelerinizle mükemmel uyum sağlayan ultra konsantre organik pigmentlerden oluşur. Ocean Blue rengi, derin okyanus mavisi ve turkuvaz tonları arasında zengin geçişler sunar.",
    features: [
      "Ultra konsantre formül",
      "Tüm epoksi sistemleriyle uyumlu",
      "UV kararlı — solmaz",
      "Yüksek saydamlık",
      "Kolay dozlama",
      "Silikon içermez",
    ],
    specs: {
      mixRatio: "Toplam reçine ağırlığının %1-5'i",
      maxPour: "—",
      gelTime: "—",
      fullCure: "—",
      density: "0.9 g/ml",
      hardness: "—",
      color: "Okyanus Mavisi",
      viscosity: "Düşük viskozite",
    },
    usageSteps: [
      {
        step: 1,
        title: "Reçine Hazırlama",
        description: "Epoksi reçinenizi karıştırın.",
        icon: "prepare",
      },
      {
        step: 2,
        title: "Pigment Ekleme",
        description: "Toplam ağırlığın %1-5'i oranında pigment ekleyin.",
        icon: "add",
      },
      {
        step: 3,
        title: "Karışım",
        description: "Homojen renk elde edene dek karıştırın.",
        icon: "mix",
      },
      {
        step: 4,
        title: "Döküm",
        description: "Standart döküm prosedürünü uygulayın.",
        icon: "pour",
      },
    ],
    applications: ["River Table", "Sanat Çalışmaları", "Deniz Temalı Objeler", "Tablo"],
    tags: ["pigment", "mavi", "renk", "ocean"],
  },
  {
    id: "deep-pour-max",
    slug: "resinova-deep-pour-max",
    name: "RESINOVA Deep Pour Max",
    shortName: "Deep Pour Max",
    category: "Ahşap Epoksi Sistemleri",
    categorySlug: "ahsap-epoksi",
    price: 1890,
    unit: "set",
    sizes: ["7.5 kg Set", "15 kg Set", "30 kg Set"],
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=90",
    ],
    badge: "PRO",
    rating: 4.8,
    reviewCount: 134,
    shortDescription:
      "Tek seferde 20 cm'e kadar döküm yapabilen profesyonel derin döküm epoksi sistemi.",
    description:
      "Deep Pour Max, derin kalıplar ve büyük heykeller için özel geliştirilmiş ultra düşük ekzotermik formülü ile tek seferde 20 cm dökümü mümkün kılan profesyonel epoksi sistemidir.",
    features: [
      "20 cm tek seferde döküm",
      "Düşük ekzotermik reaksiyon",
      "Minimum büzülme",
      "Çatlamaz",
      "Kristal berraklık",
      "Uzun çalışma süresi",
    ],
    specs: {
      mixRatio: "Ağırlıkça 3:1 (A:B)",
      maxPour: "20 cm tek seferlik döküm",
      gelTime: "36-48 saat (20°C)",
      fullCure: "10-14 gün (20°C)",
      density: "1.09 g/cm³",
      hardness: "Shore D 75",
      color: "Kristal Şeffaf",
      viscosity: "700 mPas @ 25°C",
    },
    usageSteps: [
      {
        step: 1,
        title: "Kalıp Hazırlama",
        description: "Kalıbınızı hazırlayın ve sızdırmazlığını kontrol edin.",
        icon: "prepare",
      },
      {
        step: 2,
        title: "Hassas Ölçüm",
        description: "3:1 oranında hassas tartın.",
        icon: "scale",
      },
      {
        step: 3,
        title: "Yavaş Karışım",
        description: "Hava kabarcığı oluşturmadan yavaşça karıştırın.",
        icon: "mix",
      },
      {
        step: 4,
        title: "Döküm",
        description: "Yavaşça dökün, gerekmiyorsa ısı tabancası kullanmayın.",
        icon: "pour",
      },
    ],
    applications: ["Derin Kalıp", "Heykel", "Sanat İskeleti", "Büyük Masa", "Sütun ve Ayak"],
    tags: ["derin-dokum", "agir-dokum", "profesyonel", "berrak"],
  },
  {
    id: "coating-ultra",
    slug: "resinova-coating-ultra",
    name: "RESINOVA Coating Ultra",
    shortName: "Coating Ultra",
    category: "Ahşap Epoksi Sistemleri",
    categorySlug: "ahsap-epoksi",
    price: 750,
    unit: "set",
    sizes: ["3 kg Set", "7.5 kg Set"],
    images: [
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=90",
    ],
    rating: 4.7,
    reviewCount: 201,
    shortDescription:
      "Ahşap ve beton yüzeyler için ultra sert, kimyasal dirençli kaplama epoksisi.",
    description:
      "Coating Ultra, zemin, tezgah ve yüzey kaplamaları için formüle edilmiş, kimyasal maddelere ve aşınmaya karşı üstün dirençli epoksi kaplama sistemidir.",
    features: [
      "Ekstra sert yüzey",
      "Kimyasal direnç",
      "Aşınma direnci",
      "Su geçirmez",
      "Kolay temizleme",
      "Cila kalitesinde yüzey",
    ],
    specs: {
      mixRatio: "Ağırlıkça 2:1 (A:B)",
      maxPour: "2-3 mm kaplama",
      gelTime: "6-8 saat (20°C)",
      fullCure: "5-7 gün (20°C)",
      density: "1.12 g/cm³",
      hardness: "Shore D 90",
      color: "Kristal Şeffaf",
      viscosity: "500 mPas @ 25°C",
    },
    usageSteps: [
      {
        step: 1,
        title: "Yüzey Hazırlama",
        description: "Yüzeyi zımparalayın ve tozu temizleyin.",
        icon: "prepare",
      },
      {
        step: 2,
        title: "Karışım",
        description: "2:1 oranında karıştırın.",
        icon: "mix",
      },
      {
        step: 3,
        title: "Kaplama",
        description: "Rulo veya dökme yöntemi ile uygulayın.",
        icon: "apply",
      },
      {
        step: 4,
        title: "Kürleme",
        description: "7 gün tam kürleme bekleyin.",
        icon: "wait",
      },
    ],
    applications: ["Zemin Kaplama", "Tezgah Kaplama", "Bar ve Mutfak", "Endüstriyel Yüzey"],
    tags: ["kaplama", "zemin", "tezgah", "sert"],
  },
];

export const getFeaturedProducts = () => products.slice(0, 4);

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (categorySlug: string) =>
  products.filter((p) => p.categorySlug === categorySlug);
