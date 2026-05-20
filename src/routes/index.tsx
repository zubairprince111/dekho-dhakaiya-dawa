import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { LocalRadar } from "@/components/LocalRadar";
import { ReviewCard } from "@/components/ReviewCard";
import { reviews } from "@/lib/dummy-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "দেখো — জগাখিচুড়ি ফিড" },
      { name: "description", content: "বাংলাদেশের প্রতিদিনের বাঁশ-কাহিনী ও সিন্ডিকেট রিভিউ।" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <AppShell>
      <LocalRadar />
      {reviews.map((r) => (
        <ReviewCard key={r.id} review={r} />
      ))}
    </AppShell>
  );
}
