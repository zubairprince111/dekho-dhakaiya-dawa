export interface ReceiptItem {
  label: string;
  amount: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  area?: string;
  timeAgo: string;
  rating: 1 | 2 | 3 | 4 | 5;
  ratingLabel: string;
  category: string;
  items: ReceiptItem[];
  total: number;
  story: string;
  sames: number;
}

export const reviews: Review[] = [
  {
    id: "demo-new",
    author: "ঢাকার ওস্তাদ",
    location: "পাসপোর্ট অফিস",
    area: "আগারগাঁও, ঢাকা",
    timeAgo: "এইমাত্র",
    rating: 5,
    ratingLabel: "রক্ত চুইষা খাইসে!",
    category: "পরিচয় ও পাসপোর্ট (Identity)",
    items: [
      { label: "দালাল মামা (বাইরের কন্ট্রাক্ট)", amount: 5000 },
      { label: "পুলিশ ভেরিফিকেশন ফি", amount: 2000 },
      { label: "অফিসিয়াল চা-পানি", amount: 500 },
    ],
    total: 7500,
    story:
      "মামা, পাসপোর্ট করাইতে গিয়া তো পুরাই ফতুর! দালালে কয় ৫ হাজার ছাড়া নাকি ফাইল নড়বই না। লগে আবার পুলিশের চা-পানির খরচ আলাদা। এলাকাটা আগারগাঁও হইলেও পকেট কিন্তু পুরো দেশী স্টাইলে কাটসে!",
    sames: 0,
  },
  {
    id: "1",
    author: "গুলিস্তানের জেমস বন্ড",
    location: "গুলশান সাব-রেজিস্ট্রি",
    timeAgo: "২ ঘণ্টা আগে",
    rating: 5,
    ratingLabel: "একদম মাখন!",
    category: "सरकारी দফতর",
    items: [
      { label: "দালাল মামা", amount: 1000 },
      { label: "ফাইল মুভমেন্ট ফি", amount: 2500 },
      { label: "চা-নাস্তা", amount: 600 },
      { label: "স্যারের 'খু খুশি'", amount: 2500 },
    ],
    total: 6600,
    story:
      "ভাইরে ভাই, সকাল ৮টায় গেসিলাম, ভাবসিলাম কাজ হইয়া যাইব। শেষে দেখি লাইনে দাঁড়াইতেই দালাল মামা আইসা কয় - 'বস, সিস্টেমে যান, নাইলে ৩ মাসেও হইব না।' সিস্টেম মানে কী, পরে বুঝলাম। মাখনের মতো কাজ হইসে, পকেট ফাঁকা।",
    sames: 89,
  },
  {
    id: "2",
    author: "মিরপুরের বাটপার",
    location: "বিআরটিএ মিরপুর",
    timeAgo: "৫ ঘণ্টা আগে",
    rating: 4,
    ratingLabel: "ভালোই কোপ",
    category: "সরকারি দফতর",
    items: [
      { label: "দালাল commission", amount: 1500 },
      { label: "ফিটনেস 'পাশ'", amount: 3000 },
      { label: "ইন্সপেক্টর সাহেব", amount: 2000 },
    ],
    total: 6500,
    story:
      "গাড়ির ফিটনেস করতে গেসি। দালাল ছাড়া ঢুকতেও দেয় না। ভিতরে গিয়া দেখি স্যারের মুখ গোমরা। ২ হাজার দিতেই হাসি ফুটল। বাংলাদেশ এগিয়ে যাচ্ছে!",
    sames: 156,
  },
];

export interface RateItem {
  service: string;
  location: string;
  avgPrice: number;
  trend: "up" | "down" | "same";
}

export const rates: RateItem[] = [
  { service: "পাসপোর্ট ভেরিফিকেশন", location: "যেকোনো থানা", avgPrice: 3500, trend: "up" },
  { service: "ড্রাইভিং লাইসেন্স", location: "বিআরটিএ", avgPrice: 5000, trend: "up" },
  { service: "জমির নামজারি", location: "সাব-রেজিস্ট্রি", avgPrice: 15000, trend: "same" },
  { service: "ট্রেড লাইসেন্স রিনিউ", location: "সিটি কর্পোরেশন", avgPrice: 4500, trend: "down" },
  { service: "জন্ম নিবন্ধন সনদ", location: "সিটি কর্পোরেশন", avgPrice: 800, trend: "up" },
];

export interface Leader {
  rank: number;
  name: string;
  cases: number;
  totalDamage: number;
  badge: string;
}

export const leaders: Leader[] = [
  { rank: 1, name: "বিআরটিএ মিরপুর", cases: 234, totalDamage: 1240000, badge: "ধান্দা সম্রাট" },
  { rank: 2, name: "গুলশান সাব-রেজিস্ট্রি", cases: 189, totalDamage: 980000, badge: "কোপ মাস্টার" },
  { rank: 3, name: "ওয়াসা কারওয়ান বাজার", cases: 156, totalDamage: 450000, badge: "বিল সম্রাট" },
  { rank: 4, name: "ঢাকা পাসপোর্ট অফিস", cases: 134, totalDamage: 670000, badge: "চিপা চ্যাম্প" },
  { rank: 5, name: "তেজগাঁও থানা", cases: 98, totalDamage: 320000, badge: "নবাগত ধান্দাবাজ" },
];

export const tickerItems = [
  "ওয়াসা: পানির লাইনের নতুন সংযোগ ফি বাড়সে",
  "মিরপুর বিআরটিএ: আজকে ৪ জন দালালকে মাখন সার্ভিস দেওয়া হইসে",
  "গুলশান সাব-রেজিস্ট্রি: ফাইল মুভমেন্ট ফি বাড়সে ১৫%",
  "পুরান ঢাকায় ট্রেড লাইসেন্স রেট কমসে",
  "ভূমি অফিসে নতুন নামজারি ফি দ্বিগুণ",
];
