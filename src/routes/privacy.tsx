import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ShieldAlert, UserCheck, Flame, Scale, ArrowLeft, Mail } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "আইনের চিপা (শর্ত ও প্রাইভেসি) | দেখো — ‘চা-পানির’ হিসাব!" },
      { name: "description", content: "দেখো অ্যাপের লিগ্যাল ডিসক্লেইমার ও ইউজার প্রাইভেসি পলিসি।" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <AppShell>
      <div className="mx-4 mt-4 select-none">
        {/* Back navigation button */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-150 bg-white/80 px-3.5 py-1.5 text-xs font-extrabold text-gray-700 backdrop-blur-md shadow-sm transition active:scale-95 hover:bg-gray-50 cursor-pointer"
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          <span>ড্যাশবোর্ডে ফেরত যান</span>
        </Link>

        {/* Page Header */}
        <div className="mt-5">
          <h1 className="text-2xl font-black text-gray-800">আইনের চিপা (শর্ত ও প্রাইভেসি)</h1>
          <p className="mt-1 text-sm font-semibold text-[#E91E63] leading-relaxed">
            ওস্তাদ, আগে এইগুলা পইড়া নেন। পরে আইসা ঘাড় ধরলে কোনো লাভ নাই!
          </p>
        </div>

        {/* Disclaimer sections list */}
        <div className="mt-6 space-y-4 pb-12">
          {/* Section 1 */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-3">
            <h2 className="text-base font-extrabold text-gray-800 flex items-center gap-2">
              <span className="rounded-full bg-blue-50 p-2 text-blue-500">
                <Scale size={18} strokeWidth={2.4} />
              </span>
              সেকশন ১: ডাটা কই থেইকা আসে?
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-semibold">
              এই ওয়েবসাইটের সব ডাটা ১০০% পাবলিকের দেওয়া। কে কোন অফিসে গিয়া কত টাকার বাঁশ খাইছে, সেইটা আইসা ফর্মে তুইলা দিছে। আমরা রাস্তায় বা অফিসে খাড়ায়া কারো পকেট চেক করি নাই। কোন টেবিলে কে কয় টাকা খাইলো বা গিললো, এটার কোনো আইনি দায়ভার আমাদের নাই। আমরা জাস্ট একটা &apos;ডিজিটাল ডাস্টবিন&apos; বা হিসাবের খাতা। কারো গায়ে চুলকানি উঠলে আমাদের উকিল নোটিশ ধরাইয়া লাভ নাই, কারণ আমরা কাউকে ডিরেক্ট চোর ডাকি নাই!
            </p>
          </div>

          {/* Section 2 */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-3">
            <h2 className="text-base font-extrabold text-gray-800 flex items-center gap-2">
              <span className="rounded-full bg-emerald-50 p-2 text-emerald-500">
                <UserCheck size={18} strokeWidth={2.4} />
              </span>
              সেকশন ২: আপনার প্রাইভেসি
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-semibold">
              আপনার পরিচয় পুরাই গায়েব! কে কোন চিপায় বইসা এই ফর্ম ফিলাপ করতেছেন, আমরা তার নাম, ফোন নাম্বার, আইপি এড্রেস—কিছুই ট্র্যাক করি না। একদম ঘোস্ট প্রোটোকল। আপনার ডাটা আমাদের কাছেও নাই, সো কেউ চাইলেও আমরা দিতে পারবো না। নির্ভয়ে মনের ঝাল মিটান।
            </p>
          </div>

          {/* Section 3 */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-3">
            <h2 className="text-base font-extrabold text-gray-800 flex items-center gap-2">
              <span className="rounded-full bg-rose-50 p-2 text-rose-500">
                <ShieldAlert size={18} strokeWidth={2.4} />
              </span>
              সেকশন ৩: ফাউল খেলার ওয়ার্নিং
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-semibold">
              কারো ওপর ব্যক্তিগত আক্রোশ মেটাইতে ইচ্ছা কইরা ফেইক বিল বা উল্টাপাল্টা রিপোর্ট সাবমিট করবেন না। পাবলিকের উপকারের লাইগা এই রাডার বানানো হইছে। এখানে আইসা ধান্দাবাজি বা স্প্যামিং করলে আপনার নিজেরই ক্ষতি। সঠিক ইনফো দেন, পাবলিককে সতর্ক করেন।
            </p>
          </div>

          {/* Section 4 */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-3">
            <h2 className="text-base font-extrabold text-gray-800 flex items-center gap-2">
              <span className="rounded-full bg-amber-50 p-2 text-amber-500">
                <Flame size={18} strokeWidth={2.4} />
              </span>
              সেকশন ৪: রূপক ভাষার ব্যবহার
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-semibold">
              এই ওয়েবসাইটে ব্যবহৃত &apos;চা-পানি&apos;, &apos;মিষ্টি&apos;, &apos;খাম&apos;, &apos;চামড়া তোলা&apos;—এইসব শব্দ পুরাপুরি রূপক (Metaphorical) এবং স্যাটায়ার। আমরা শুধু পাবলিকের দেওয়া &apos;সম্মানী&apos; ট্র্যাক করি! কেউ যদি এইগুলা পইড়া সিরিয়াস হইয়া যায় আর নিজের গায়ে মাইখা নেয়, তাইলে সেই দায়ভার তার নিজের।
            </p>
          </div>

          {/* Section 5 */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-3">
            <h2 className="text-base font-extrabold text-gray-800 flex items-center gap-2">
              <span className="rounded-full bg-violet-50 p-2 text-violet-500">
                <Mail size={18} strokeWidth={2.4} />
              </span>
              সেকশন ৫: ক্যাচাল মেটানো বা যোগাযোগ
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-semibold">
              ওস্তাদ, কোনো বিষে বিষাদ বা ক্যাচাল থাকলে, অথবা বড় স্যারের লগে ডিরেক্ট গুজুর-গুজুর করতে চাইলে সরাসরি আমাগো এই মেইল বক্সে গুতা মারেন: <a href="mailto:dekhoobd@gmail.com" className="text-violet-600 hover:underline font-black">dekhoobd@gmail.com</a>। ফালতু চিল্লাচিল্লি না কইরা সুন্দর মতো মেইল মারলে বড় স্যার লাঞ্চের বিরতি শ্যাষ কইরা একটু চোখ বুলায়া দেখতে পারে!
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
