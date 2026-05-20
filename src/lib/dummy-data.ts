export interface ReceiptItem {
  label: string;
  amount: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  timeAgo: string;
  rating: 1 | 2 | 3 | 4 | 5;
  ratingLabel: string;
  category: string;
  items: ReceiptItem[];
  total: number;
  story: string;
  laughs: number;
  sames: number;
  caps: number;
}

export const reviews: Review[] = [
  {
    id: "1",
    author: "গুলিস্তানের জেমস বন্ড",
    location: "গুলশান সাব-রেজিস্ট্রি",
    timeAgo: "২ ঘণ্টা আগে",
    rating: 5,
    ratingLabel: "একদম মাখন!",
    category: "সরকারি দফতর",
    items: [
      { label: "দালাল মামা", amount: 1000 },
      { label: "ফাইল মুভমেন্ট ফি", amount: 2500 },
      { label: "চা-নাস্তা", amount: 600 },
      { label: "স্যারের 'খুশি'", amount: 2500 },
    ],
    total: 6600,
    story:
      "ভাইরে ভাই, সকাল ৮টায় গেসিলাম, ভাবসিলাম কাজ হইয়া যাইব। শেষে দেখি লাইনে দাঁড়াইতেই দালাল মামা আইসা কয় - 'বস, সিস্টেমে যান, নাইলে ৩ মাসেও হইব না।' সিস্টেম মানে কী, পরে বুঝলাম। মাখনের মতো কাজ হইসে, পকেট ফাঁকা।",
    laughs: 234,
    sames: 89,
    caps: 12,
  },
  {
    id: "2",
    author: "মিরপুরের বাটপার",
    location: "বিআরটিএ মিরপুর",
    timeAgo: "৫ ঘণ্টা আগে",
    rating: 4,
    ratingLabel: "ভালোই বাঁশ",
    category: "সরকারি দফতর",
    items: [
      { label: "দালাল কমিশন", amount: 1500 },
      { label: "ফিটনেস 'পাশ'", amount: 3000 },
      { label: "ইন্সপেক্টর সাহেব", amount: 2000 },
    ],
    total: 6500,
    story:
      "গাড়ির ফিটনেস করতে গেসি। দালাল ছাড়া ঢুকতেও দেয় না। ভিতরে গিয়া দেখি স্যারের মুখ গোমরা। ২ হাজার দিতেই হাসি ফুটল। বাংলাদেশ এগিয়ে যাচ্ছে!",
    laughs: 412,
    sames: 156,
    caps: 8,
  },
  {
    id: "3",
    author: "ফার্মগেটের ফেলুদা",
    location: "লোকাল বাস সিন্ডিকেট",
    timeAgo: "১ দিন আগে",
    rating: 3,
    ratingLabel: "মাঝারি বাঁশ",
    category: "লোকাল সিন্ডিকেট",
    items: [
      { label: "অতিরিক্ত ভাড়া", amount: 50 },
      { label: "হেল্পারের 'টিপস'", amount: 20 },
    ],
    total: 70,
    story:
      "১৫ টাকার ভাড়া ৩৫ নিল। কইলাম 'মামা এত কেন?' - উত্তর 'তেলের দাম বাড়সে মামা।' তেল কি স্বর্ণ হইয়া গেসে?",
    laughs: 89,
    sames: 567,
    caps: 23,
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
  { service: "বাস ছাদে ওঠার রেট", location: "গাবতলী", avgPrice: 500, trend: "up" },
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
  { rank: 2, name: "গুলশান সাব-রেজিস্ট্রি", cases: 189, totalDamage: 980000, badge: "বাঁশ মাস্টার" },
  { rank: 3, name: "গাবতলী বাস টার্মিনাল", cases: 156, totalDamage: 450000, badge: "সিন্ডিকেট কিং" },
  { rank: 4, name: "ঢাকা পাসপোর্ট অফিস", cases: 134, totalDamage: 670000, badge: "চিপা চ্যাম্প" },
  { rank: 5, name: "তেজগাঁও থানা", cases: 98, totalDamage: 320000, badge: "নবাগত ধান্দাবাজ" },
];

export const tickerItems = [
  "গাবতলীতে বাসের ছাদে উঠার রেট ৫০০ ৳",
  "মিরপুর বিআরটিএ: আজকে ৪ জন দালালকে মাখন সার্ভিস দেওয়া হইসে",
  "গুলশান সাব-রেজিস্ট্রি: ফাইল মুভমেন্ট ফি বাড়সে ১৫%",
  "পুরান ঢাকায় ট্রেড লাইসেন্স রেট কমসে",
  "ফার্মগেটে লেগুনা সিন্ডিকেট: ভাড়া ডাবল",
];
