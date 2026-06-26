"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  Star,
  Lightning,
  Target,
  Rocket,
  Crown,
  Trophy,
  Shield,
  SignOut,
  TrendUp,
} from "@phosphor-icons/react";
import { getUser, isLoggedIn, logout } from "@/lib/store";

const ranks = [
  { level: 1, title: "拾贝者", icon: Star, req: "收集 10 个贝壳", color: "text-muted", unlocked: true },
  { level: 2, title: "潜水员", icon: Lightning, req: "获得 5 颗珍珠", color: "text-teal", unlocked: true },
  { level: 3, title: "航海士", icon: Target, req: "完成 3 次探险", color: "text-coral", unlocked: true },
  { level: 4, title: "探险家", icon: Rocket, req: "集齐 10 套藏宝图", color: "text-amber", unlocked: false },
  { level: 5, title: "领航员", icon: Crown, req: "掌握 50 颗珍珠", color: "text-warning", unlocked: false },
];

const achievements = [
  { icon: Trophy, title: "首次下潜", desc: "完成第一次深潜探索", progress: 100 },
  { icon: Shield, title: "知识守护者", desc: "连续 7 天收集贝壳", progress: 71 },
  { icon: Rocket, title: "藏宝猎人", desc: "集齐第一套完整藏宝图", progress: 60 },
  { icon: Crown, title: "珍珠项链", desc: "串联 10 颗同领域珍珠", progress: 30 },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }
    setUser(getUser());
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!user) return null;

  const currentRank = 3;

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile header */}
          <div className="card p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-coral/10 flex items-center justify-center text-coral text-2xl font-semibold">
              {user.name[0]}
            </div>
            <div className="flex-1">
              <h1 className="text-ink text-xl font-semibold">{user.name}</h1>
              <p className="text-muted text-sm">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="badge-coral">
                  Lv.{currentRank} {ranks[currentRank - 1].title}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary text-sm flex items-center gap-2 text-error hover:border-error/30 hover:bg-error/5"
            >
              <SignOut className="w-4 h-4" />
              退出登录
            </button>
          </div>

          {/* Rank progression */}
          <div className="mb-8">
            <h2 className="text-ink font-semibold mb-4 flex items-center gap-2">
              <TrendUp className="w-4 h-4 text-coral" />
              成长段位
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {ranks.map((rank, i) => {
                const Icon = rank.icon;
                return (
                  <div
                    key={i}
                    className={`card p-4 text-center ${
                      !rank.unlocked ? "opacity-50" : ""
                    }`}
                  >
                    <div className="text-[10px] text-muted tracking-widest uppercase mb-2">
                      Lv.{rank.level}
                    </div>
                    <Icon
                      className={`w-7 h-7 mx-auto mb-2 ${rank.color}`}
                      weight={rank.unlocked ? "fill" : "regular"}
                    />
                    <p className="text-ink font-medium text-sm">{rank.title}</p>
                    <p className="text-muted text-xs mt-1">{rank.req}</p>
                    <div className="mt-2">
                      {rank.unlocked ? (
                        <span className="text-teal text-[10px] font-medium">
                          ✓ 已解锁
                        </span>
                      ) : (
                        <span className="text-muted text-[10px]">未解锁</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-ink font-semibold mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber" />
              成就徽章
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((ach, i) => {
                const Icon = ach.icon;
                return (
                  <div key={i} className="card p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-canvas-card flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-muted" weight="duotone" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="text-ink font-medium text-sm">
                          {ach.title}
                        </h3>
                        <span className="text-muted text-xs">{ach.progress}%</span>
                      </div>
                      <p className="text-muted text-xs mb-2">{ach.desc}</p>
                      <div className="h-1.5 bg-canvas-card rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            ach.progress === 100 ? "bg-teal" : "bg-coral/60"
                          }`}
                          style={{ width: `${ach.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
