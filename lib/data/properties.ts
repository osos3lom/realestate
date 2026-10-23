import { withBasePath } from "@/lib/utils";

export type PropertyType =
  | "شقة"
  | "فيلا"
  | "دوبلكس"
  | "استوديو"
  | "شاليه";

export type ListingType = "للبيع" | "للإيجار";

export interface PropertyCoordinates {
  lat: number;
  lng: number;
}

export interface PropertyAgent {
  name: string;
  phone: string;
  email: string;
  avatar?: string;
}

export interface Property {
  id: string;
  title: string;
  type: ListingType;
  propertyType: PropertyType;
  location: string;
  city: string;
  coordinates: PropertyCoordinates;
  bedrooms: number;
  bathrooms: number;
  beds?: number;
  guests?: number;
  area: number;
  price: number;
  pricePerNight?: number;
  pricePeriod?: "يومي" | "شهري" | "سنوي";
  description: string;
  features: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  isFavorite?: boolean;
  isNew?: boolean;
  featured?: boolean;
  agent: PropertyAgent;
}

export const propertyTypeLabels: Record<string, string> = {
  all: "الكل",
  شقة: "شقة",
  فيلا: "فيلا",
  دوبلكس: "دوبلكس",
  استوديو: "استوديو",
  شاليه: "شاليه",
};

export const saudiCities = [
  { name: "الرياض", lat: 24.7136, lng: 46.6753, zoom: 11 },
  { name: "جدة", lat: 21.5433, lng: 39.1728, zoom: 11 },
  { name: "الدمام", lat: 26.4207, lng: 50.0888, zoom: 11 },
  { name: "الخبر", lat: 26.2172, lng: 50.1971, zoom: 12 },
  { name: "مكة المكرمة", lat: 21.4225, lng: 39.8262, zoom: 12 },
];

const rawProperties: Property[] = [
  {
    id: "1",
    title: "شقة للبيع بتصميم حديث",
    type: "للبيع",
    propertyType: "شقة",
    location: "جدة - الحمدانية",
    city: "جدة",
    coordinates: { lat: 21.7584, lng: 39.1983 },
    bedrooms: 4,
    bathrooms: 3,
    beds: 4,
    guests: 6,
    area: 287,
    price: 229994,
    pricePerNight: 350,
    pricePeriod: "سنوي",
    description:
      "شقة فاخرة للبيع في حي الحمدانية بجدة، تتميز بتصميم عصري وتشطيبات راقية. تحتوي على 4 غرف نوم واسعة، صالة كبيرة، ومطبخ مجهز بالكامل. موقع استراتيجي قريب من جميع الخدمات.",
    features: ["مواقف سيارات", "مصعد", "حراسة أمنية", "حديقة", "تكييف مركزي"],
    images: [
      "/modern-apartment-exterior.png",
      "/luxury-apartment-living-room.png",
      "/cozy-apartment-bedroom-interior.jpg",
    ],
    rating: 4.8,
    reviewCount: 34,
    isNew: true,
    featured: true,
    agent: {
      name: "أحمد العمري",
      phone: "0500000000",
      email: "ahmed@example.com",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: "2",
    title: "شقة فاخرة بإطلالة مفتوحة",
    type: "للبيع",
    propertyType: "شقة",
    location: "جدة - المنار",
    city: "جدة",
    coordinates: { lat: 21.5794, lng: 39.2289 },
    bedrooms: 4,
    bathrooms: 2,
    beds: 4,
    guests: 5,
    area: 200,
    price: 200000,
    pricePerNight: 300,
    pricePeriod: "سنوي",
    description:
      "شقة فاخرة بتشطيبات عالية الجودة في حي المنار. تتميز بإطلالة رائعة وموقع مميز قريب من المراكز التجارية والمدارس.",
    features: ["مواقف سيارات", "مصعد", "غرفة خادمة", "بلكونة"],
    images: [
      "/luxury-apartment-living-room.png",
      "/modern-apartment-exterior.png",
    ],
    rating: 4.7,
    reviewCount: 28,
    featured: true,
    agent: {
      name: "محمد السعيد",
      phone: "0511111111",
      email: "mohammed@example.com",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: "3",
    title: "فيلا عصرية فخمة",
    type: "للبيع",
    propertyType: "فيلا",
    location: "الرياض - النرجس",
    city: "الرياض",
    coordinates: { lat: 24.8488, lng: 46.6622 },
    bedrooms: 5,
    bathrooms: 4,
    beds: 6,
    guests: 10,
    area: 450,
    price: 1500000,
    pricePerNight: 950,
    pricePeriod: "سنوي",
    description:
      "فيلا عصرية فخمة في حي النرجس بالرياض. تصميم معماري فريد مع مساحات واسعة وتشطيبات فاخرة. تحتوي على مسبح خاص وحديقة كبيرة.",
    features: ["مسبح خاص", "حديقة", "غرفة سائق", "مجلس خارجي", "جراج مغطى"],
    images: [
      "/modern-villa-exterior-white-architecture.jpg",
      "/luxury-villa-pool.png",
    ],
    rating: 4.9,
    reviewCount: 42,
    isNew: true,
    featured: true,
    agent: {
      name: "خالد الشمري",
      phone: "0522222222",
      email: "khaled@example.com",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: "4",
    title: "شقة مريحة للإيجار",
    type: "للإيجار",
    propertyType: "شقة",
    location: "الدمام - الفيصلية",
    city: "الدمام",
    coordinates: { lat: 26.4025, lng: 50.0768 },
    bedrooms: 3,
    bathrooms: 2,
    beds: 3,
    guests: 5,
    area: 150,
    price: 35000,
    pricePerNight: 220,
    pricePeriod: "سنوي",
    description:
      "شقة مريحة للإيجار السنوي في حي الفيصلية بالدمام. موقع هادئ وقريب من جميع الخدمات الأساسية والمدارس والمستشفيات.",
    features: ["مواقف سيارات", "مصعد", "تكييف سبليت", "واي فاي"],
    images: [
      "/cozy-apartment-bedroom-interior.jpg",
      "/family-apartment-living-room.png",
    ],
    rating: 4.6,
    reviewCount: 19,
    featured: true,
    agent: {
      name: "سعد القحطاني",
      phone: "0533333333",
      email: "saad@example.com",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: "5",
    title: "دوبلكس فخم بتشطيبات ملكية",
    type: "للبيع",
    propertyType: "دوبلكس",
    location: "الرياض - العليا",
    city: "الرياض",
    coordinates: { lat: 24.7088, lng: 46.6811 },
    bedrooms: 6,
    bathrooms: 5,
    beds: 7,
    guests: 12,
    area: 380,
    price: 1800000,
    pricePerNight: 800,
    pricePeriod: "سنوي",
    description:
      "دوبلكس فخم في قلب حي العليا بالرياض، بالقرب من أهم المراكز المالية والتجارية، تشطيبات سوبر ديلوكس.",
    features: ["تكييف مركزي", "غرفة خادمة", "مصعد بانورامي", "موقف خاص", "أمن 24/7"],
    images: [
      "/luxury-duplex-interior.jpg",
      "/luxury-apartment-living-room.png",
    ],
    rating: 4.9,
    reviewCount: 31,
    agent: {
      name: "فهد الدوسري",
      phone: "0544444444",
      email: "fahad@example.com",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: "6",
    title: "استوديو عصري متكامل",
    type: "للإيجار",
    propertyType: "استوديو",
    location: "جدة - الروضة",
    city: "جدة",
    coordinates: { lat: 21.5642, lng: 39.1558 },
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    guests: 2,
    area: 55,
    price: 18000,
    pricePerNight: 180,
    pricePeriod: "سنوي",
    description:
      "استوديو حديث ومؤثث بالكامل في حي الروضة الحيوي بجدة. مثالي للمهنيين ورواد الأعمال.",
    features: ["مفروش بالكامل", "إنترنت فائق السرعة", "صالة رياضية", "موقف سيارة"],
    images: [
      "/modern-studio-apartment.png",
      "/cozy-apartment-bedroom-interior.jpg",
    ],
    rating: 4.5,
    reviewCount: 22,
    agent: {
      name: "أحمد العمري",
      phone: "0500000000",
      email: "ahmed@example.com",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: "7",
    title: "فيلا واسعة مع مسبح خاص",
    type: "للبيع",
    propertyType: "فيلا",
    location: "الخبر - الراكة",
    city: "الخبر",
    coordinates: { lat: 26.3537, lng: 50.1983 },
    bedrooms: 7,
    bathrooms: 6,
    beds: 8,
    guests: 14,
    area: 600,
    price: 2500000,
    pricePerNight: 1100,
    pricePeriod: "سنوي",
    description:
      "فيلا رحبة مع مسبح خاص وحديقة خضراء في حي الراكة بالخبر. موقع هادئ قريب من البحر والخدمات.",
    features: ["مسبح خاص", "حديقة خضراء", "غرفة سائق وخادمة", "مجلس رجال مستقل", "مواقف متعددة"],
    images: [
      "/luxury-villa-pool.png",
      "/modern-villa-exterior-white-architecture.jpg",
    ],
    rating: 4.9,
    reviewCount: 50,
    agent: {
      name: "سعد القحطاني",
      phone: "0533333333",
      email: "saad@example.com",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: "8",
    title: "شقة عائلية رحبة",
    type: "للإيجار",
    propertyType: "شقة",
    location: "مكة - العزيزية",
    city: "مكة المكرمة",
    coordinates: { lat: 21.4082, lng: 39.8697 },
    bedrooms: 4,
    bathrooms: 3,
    beds: 5,
    guests: 8,
    area: 180,
    price: 45000,
    pricePerNight: 280,
    pricePeriod: "سنوي",
    description:
      "شقة عائلية مريحة في حي العزيزية بمكة المكرمة، قريبة من الحرم المكي الشريف والمراكز التجارية.",
    features: ["مواقف سيارات", "مصعد", "تكييف مركزي", "قريب من الحرم"],
    images: [
      "/family-apartment-living-room.png",
      "/modern-apartment-exterior.png",
    ],
    rating: 4.8,
    reviewCount: 65,
    agent: {
      name: "محمد السعيد",
      phone: "0511111111",
      email: "mohammed@example.com",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: "9",
    title: "شقة فاخرة بإطلالة على واجهة جدة البحرية",
    type: "للإيجار",
    propertyType: "شقة",
    location: "جدة - الشاطئ",
    city: "جدة",
    coordinates: { lat: 21.5892, lng: 39.1128 },
    bedrooms: 3,
    bathrooms: 3,
    beds: 4,
    guests: 6,
    area: 195,
    price: 55000,
    pricePerNight: 480,
    pricePeriod: "شهري",
    description:
      "شقة أنيقة بإطلالة ساحرة على البحر الأحمر مباشرة في حي الشاطئ بجدة، تتميز بديكورات فاخرة وشرفة واسعة.",
    features: ["إطلالة بحرية", "مسبح برج", "نادي صحي", "موقف مغطى", "أمن وخدمات فندقية"],
    images: [
      "/modern-apartment-exterior.png",
      "/luxury-apartment-living-room.png",
      "/cozy-apartment-bedroom-interior.jpg",
    ],
    rating: 4.95,
    reviewCount: 44,
    isNew: true,
    agent: {
      name: "أحمد العمري",
      phone: "0500000000",
      email: "ahmed@example.com",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: "10",
    title: "فيلا منتجع هادئة في حطين",
    type: "للإيجار",
    propertyType: "فيلا",
    location: "الرياض - حطين",
    city: "الرياض",
    coordinates: { lat: 24.7739, lng: 46.6028 },
    bedrooms: 4,
    bathrooms: 4,
    beds: 5,
    guests: 8,
    area: 420,
    price: 90000,
    pricePerNight: 750,
    pricePeriod: "شهري",
    description:
      "فيلا راقية بنمط منتجع في حي حطين الراقي بالرياض، قريبة من بوليفارد رياض سيتي والمطاعم العالمية.",
    features: ["مسبح خارجي", "حديقة خاصة", "شرفة علوية", "واي فاي مجاني", "مطبخ مجهز"],
    images: [
      "/luxury-villa-pool.png",
      "/luxury-duplex-interior.jpg",
      "/modern-villa-exterior-white-architecture.jpg",
    ],
    rating: 4.9,
    reviewCount: 38,
    isNew: true,
    agent: {
      name: "خالد الشمري",
      phone: "0522222222",
      email: "khaled@example.com",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: "11",
    title: "شقة مودرن بتصميم فندقي في العليا",
    type: "للإيجار",
    propertyType: "شقة",
    location: "الرياض - العليا",
    city: "الرياض",
    coordinates: { lat: 24.7188, lng: 46.6711 },
    bedrooms: 2,
    bathrooms: 2,
    beds: 2,
    guests: 4,
    area: 110,
    price: 40000,
    pricePerNight: 350,
    pricePeriod: "شهري",
    description:
      "شقة عصرية بطابع فندقي متميز تقع في قلب الرياض المالي بحي العليا، مجهزة بأحدث وسائل الراحة.",
    features: ["مفروش بالكامل", "تكييف ذكي", "دخول ذكي", "موقف سيارة", "مصعد"],
    images: [
      "/luxury-apartment-living-room.png",
      "/modern-studio-apartment.png",
    ],
    rating: 4.85,
    reviewCount: 29,
    agent: {
      name: "فهد الدوسري",
      phone: "0544444444",
      email: "fahad@example.com",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: "12",
    title: "شقة شاطئية أنيقة على كورنيش الخبر",
    type: "للإيجار",
    propertyType: "شقة",
    location: "الخبر - الكورنيش",
    city: "الخبر",
    coordinates: { lat: 26.2842, lng: 50.2178 },
    bedrooms: 3,
    bathrooms: 2,
    beds: 3,
    guests: 5,
    area: 160,
    price: 48000,
    pricePerNight: 380,
    pricePeriod: "شهري",
    description:
      "شقة مطلة على كورنيش الخبر مع إمكانية الوصول السريع إلى المقاهي والممشى البحري.",
    features: ["إطلالة بحرية", "بلكونة", "مواقف خاصة", "واي فاي", "قريب من المطاعم"],
    images: [
      "/cozy-apartment-bedroom-interior.jpg",
      "/family-apartment-living-room.png",
    ],
    rating: 4.75,
    reviewCount: 36,
    agent: {
      name: "سعد القحطاني",
      phone: "0533333333",
      email: "saad@example.com",
      avatar: "/placeholder-user.jpg",
    },
  },
];

export const allProperties: Property[] = rawProperties.map((property) => ({
  ...property,
  images: property.images.map(withBasePath),
  agent: {
    ...property.agent,
    avatar: property.agent.avatar ? withBasePath(property.agent.avatar) : undefined,
  },
}));

export function getAllProperties(): Property[] {
  return allProperties;
}

export function getRentalProperties(): Property[] {
  return allProperties.filter((p) => p.type === "للإيجار");
}

export function getFeaturedProperties(): Property[] {
  return allProperties.filter((p) => p.featured);
}

export function getPropertyById(id: string): Property | undefined {
  return allProperties.find((p) => p.id === id);
}
