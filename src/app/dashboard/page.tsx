"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Compass,
  Coin,
  Waves,
  MapTrifold,
  Sparkle,
  TrendUp,
  ArrowRight,
  Lightning,
  Trophy,
  Target,
} from "@phosphor-icons/react";
import { getUser, isLoggedIn } from "@/lib/store";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }
    setUser(getUser());
  }, [router]);

  if (!user) return null;

  const stats = [
    { label: "已收集贝壳", value: "47", icon: Coin, color: "text-amber" },
    { label: "已获珍珠", value: "12", icon: Sparkle, color: "text-teal" },
    { label: "探险次数", value: "8", icon: MapTrifold, color: "text-coral" },
    { label: "连续天数", value: "5", icon: TrendUp, color: "text-warning" },
  ];

  const quickActions = [
    {
      icon: Coin,
      title: "收集贝壳",
      desc: "随手记录新的知识碎片",
      href: "/explore",
      color: "bg-amber/10 text-amber",
    },
    {
      icon: Waves,
      title: "深潜寻珠",
      desc: "探索今日推荐的深度内容",
      href: "/explore",
      color: "bg-teal/10 text-teal",
    },
    {
      icon: MapTrifold,
      title: "启航探险",
      desc: "完成今日藏宝图任务",
      href: "/explore",
      color: "bg-coral/10 text-coral",
    },
    {
      icon: Target,
      title: "知识地图",
      desc: "查看你的知识体系全景",
      href: "/map",
      color: "bg-ink/5 text-ink",
    },
  ];

  const recentShells = [
    { title: "GPT-5 多模态能力解析", island: "AI基础", time: "2小时前" },
    { title: "Cursor 编辑器快捷键清单", island: "开发工具", time: "5小时前" },
    { title: "Prompt Chain 设计模式", island: "Prompt工程", time: "昨天" },
    { title: "向量数据库选型对比", island: "深度学习", time: "昨天" },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-ink text-2xl font-semibold mb-1">
              你好，{user.name}
            </h1>
            <p className="text-muted">继续你的知识探索之旅</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                    <span className="text-muted text-xs">{stat.label}</span>
                  </div>
                  <span className="text-ink text-2xl font-semibold">
                    {stat.value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-ink font-semibold mb-4">快速开始</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickActions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <Link key={i} href={action.href} className="card p-5 group flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${action.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-ink font-medium group-hover:text-coral transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-muted text-sm">{action.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted group-hover:text-coral transition-colors shrink-0 mt-1" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Shells */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-ink font-semibold">最近收集的贝壳</h2>
              <Link
                href="/explore"
                className="text-coral text-sm font-medium hover:underline"
              >
                查看全部
              </Link>
            </div>
            <div className="card divide-y divide-border-light">
              {recentShells.map((shell, i) => (
                <div
                  key={i}
                  className="px-5 py-4 flex items-center justify-between hover:bg-canvas-card/50 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-ink text-sm font-medium">{shell.title}</p>
                    <p className="text-muted text-xs mt-0.5">
                      {shell.island} · {shell.time}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
