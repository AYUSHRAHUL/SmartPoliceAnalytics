"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Trophy, Medal, Award, Star, TrendingUp, Zap } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  badgeId: string;
  department: string;
  totalScore: number;
  caseClosed: number;
  cyberResolved: number;
  feedbackScore: number;
  awarenessPrograms: number;
  achievements?: string[];
  badge?: "Gold" | "Silver" | "Bronze";
}

interface GamifiedLeaderboardProps {
  category?: string;
  limit?: number;
}

export function GamifiedLeaderboard({ category = "Total", limit = 25 }: GamifiedLeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRankings();
  }, [category, limit]);

  const fetchRankings = async () => {
    try {
      const response = await fetch(`/api/rankings?category=${category}&limit=${limit}`);
      const data = await response.json();
      if (data.success) {
        // Add achievements and badges
        const enriched = data.data.map((entry: any, index: number) => ({
          ...entry,
          rank: index + 1,
          achievements: generateAchievements(entry),
          badge: index < 3 ? (index === 0 ? "Gold" : index === 1 ? "Silver" : "Bronze") : undefined
        }));
        setEntries(enriched);
      }
    } catch (error) {
      console.error("Failed to fetch rankings", error);
    } finally {
      setLoading(false);
    }
  };

  const generateAchievements = (entry: LeaderboardEntry): string[] => {
    const achievements: string[] = [];

    if (entry.totalScore > 90) {
      achievements.push("Elite Performer");
    }
    if (entry.caseClosed > 100) {
      achievements.push("Case Master");
    }
    if (entry.cyberResolved > 20) {
      achievements.push("Cyber Expert");
    }
    if (entry.feedbackScore > 4.5) {
      achievements.push("Citizen Favorite");
    }
    if (entry.awarenessPrograms > 10) {
      achievements.push("Community Champion");
    }

    return achievements.length > 0 ? achievements : ["Rising Star"];
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) {
      return <Trophy className="w-8 h-8 text-yellow-400" />;
    }
    if (rank === 2) {
      return <Medal className="w-8 h-8 text-gray-300" />;
    }
    if (rank === 3) {
      return <Award className="w-8 h-8 text-amber-600" />;
    }
    return <Star className="w-6 h-6 text-slate-500" />;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) {
      return "bg-gradient-to-r from-yellow-900/30 to-yellow-800/20 border-yellow-500/40";
    }
    if (rank === 2) {
      return "bg-gradient-to-r from-gray-700/30 to-gray-600/20 border-gray-400/40";
    }
    if (rank === 3) {
      return "bg-gradient-to-r from-amber-900/30 to-amber-800/20 border-amber-500/40";
    }
    return "bg-slate-800 border-slate-700";
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="text-center py-8 text-slate-400">Loading leaderboard...</div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-gold" />
          Gamified Leaderboard
        </h2>
        <span className="text-sm text-slate-400">Category: {category}</span>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className={`p-4 rounded-lg border ${getRankColor(entry.rank)} transition-all hover:scale-[1.02]`}
          >
            <div className="flex items-center gap-4">
              {/* Rank */}
              <div className="flex-shrink-0 w-12 flex items-center justify-center">
                {getRankIcon(entry.rank)}
              </div>

              {/* Officer Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-slate-100 text-lg">{entry.name}</h3>
                  {entry.badge && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        entry.badge === "Gold"
                          ? "bg-yellow-900/50 text-yellow-300"
                          : entry.badge === "Silver"
                            ? "bg-gray-700/50 text-gray-300"
                            : "bg-amber-900/50 text-amber-300"
                      }`}
                    >
                      {entry.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>{entry.badgeId}</span>
                  <span>•</span>
                  <span>{entry.department}</span>
                </div>
                {entry.achievements && entry.achievements.length > 0 && (
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {entry.achievements.map((ach, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs font-medium flex items-center gap-1"
                      >
                        <Zap className="w-3 h-3" />
                        {ach}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Score */}
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-2xl font-bold text-slate-100">
                    {entry.totalScore.toFixed(1)}
                  </span>
                </div>
                <div className="text-xs text-slate-400">Total Score</div>
                <div className="flex gap-2 mt-2 text-xs text-slate-500">
                  <span>{entry.caseClosed} cases</span>
                  <span>•</span>
                  <span>{entry.cyberResolved} cyber</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-8 text-slate-400">No entries found</div>
      )}
    </Card>
  );
}

