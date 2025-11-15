import { Suspense } from "react";
import { getRankings, RankingCategory } from "@/lib/services/rankings";
import { RankingTable } from "@/components/leaderboard/RankingTable";
import { GamifiedLeaderboard } from "@/components/leaderboard/GamifiedLeaderboard";
import { Card } from "@/components/ui/card";

const categories: { label: string; value: RankingCategory }[] = [
  { label: "Total Performance", value: "Total" },
  { label: "Crime Solving", value: "CrimeSolving" },
  { label: "Cybercrime Handling", value: "Cybercrime" },
  { label: "Citizen Engagement", value: "CitizenEngagement" },
  { label: "Public Awareness", value: "Awareness" }
];

async function LeaderboardSection({ category }: { category: RankingCategory }) {
  const data = await getRankings(category);
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Leaderboard</h1>
        <p className="text-sm text-slate-400">
          Real-time rankings of top performing officers across all KPIs. Filter by category to
          focus on specific achievements.
        </p>
      </div>
      <RankingTable data={data} />
    </div>
  );
}

export default function LeaderboardPage({ searchParams }: { searchParams: { category?: RankingCategory } }) {
  const currentCategory = (searchParams.category ?? "Total") as RankingCategory;

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {categories.map((cat) => (
            <a
              key={cat.value}
              href={`/leaderboard?category=${cat.value}`}
              className={`rounded-lg px-4 py-2 transition ${
                currentCategory === cat.value
                  ? "bg-gold text-black font-semibold"
                  : "bg-[#101931] text-slate-300 hover:bg-gold/10 hover:text-gold"
              }`}
            >
              {cat.label}
            </a>
          ))}
        </div>
      </Card>
      <div className="space-y-6">
        <Suspense fallback={<div className="rounded-2xl border border-slate-800 bg-[#111b33] p-6">Loading leaderboard...</div>}>
          <LeaderboardSection category={currentCategory} />
        </Suspense>
        <GamifiedLeaderboard category={currentCategory} />
      </div>
    </div>
  );
}


