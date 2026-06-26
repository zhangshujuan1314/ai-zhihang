"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  Coin,
  Waves,
  MapTrifold,
  Sparkle,
  MagnifyingGlass,
  Plus,
  Star,
  ArrowSquareOut,
} from "@phosphor-icons/react";

const tabs = [
  { id: "shells", label: "收集贝壳", icon: Coin },
  { id: "dive", label: "深潜寻珠", icon: Waves },
  { id: "voyage", label: "启航探险", icon: MapTrifold },
];

const mockShells = [
  { id: 1, title: "LangChain Agent 框架核心概念", island: "AI基础", tag: "概念", time: "今天 10:30", collected: false },
  { id: 2, title: "Cursor 多文件编辑技巧", island: "开发工具", tag: "工具", time: "今天 09:15", collected: false },
  { id: 3, title: "RAG 检索增强生成最佳实践", island: "深度学习", tag: "方法论", time: "昨天", collected: true },
  { id: 4, title: "Claude API 结构化输出指南", island: "Prompt工程", tag: "文档", time: "昨天", collected: true },
  { id: 5, title: "向量数据库 Pinecone vs Qdrant", island: "深度学习", tag: "对比", time: "2天前", collected: true },
  { id: 6, title: "AI 产品定价策略分析", island: "产品设计", tag: "洞察", time: "3天前", collected: true },
];

const diveLevels = [
  {
    depth: "浅水区", range: "0-50m", desc: "日常资讯与快讯",
    color: "bg-teal/10 border-teal/20",
    articles: [
      { title: "OpenAI 发布新模型 GPT-5 Turbo", tag: "快讯" },
      { title: "Anthropic Claude 3.5 新功能汇总", tag: "快讯" },
    ],
  },
  {
    depth: "中层海域", range: "50-200m", desc: "系统教程与实践",
    color: "bg-canvas-card border-border",
    articles: [
      { title: "从零构建 RAG 系统完整指南", tag: "教程" },
      { title: "AI Agent 设计模式实战", tag: "实战" },
    ],
  },
  {
    depth: "深水区", range: "200m+", desc: "深度思考与前沿",
    color: "bg-surface-dark text-white border-surface-dark-subtle",
    articles: [
      { title: "AGI 路径之争：Scaling vs Architecture", tag: "思考" },
      { title: "多模态模型的涌现能力研究", tag: "论文" },
    ],
  },
];

const treasureTasks = [
  { id: 1, title: "完成 3 道 AI 基础题", section: "刷题", done: true },
  { id: 2, title: "阅读 Prompt 工程文档", section: "文档", done: true },
  { id: 3, title: "查看今日推荐内容", section: "推荐", done: false },
  { id: 4, title: "参与社区讨论", section: "动态", done: false },
];

function ExploreContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("shells");
  const [shells, setShells] = useState(mockShells);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const island = searchParams.get("island");
    if (island) setActiveTab("shells");
  }, [searchParams]);

  const toggleCollect = (id: number) => {
    setShells((prev) =>
      prev.map((s) => (s.id === id ? { ...s, collected: !s.collected } : s))
    );
  };

  const filteredShells = shells.filter(
    (s) =>
      s.title.includes(search) ||
      s.island.includes(search) ||
      s.tag.includes(search)
  );

  const collectedCount = shells.filter((s) => s.collected).length;
  const treasureDone = treasureTasks.filter((t) => t.done).length;

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-ink text-2xl font-semibold mb-1">探索</h1>
        <p className="text-muted">收集贝壳、深潜寻珠、启航探险</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                active
                  ? "border-coral text-coral"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab: Shells */}
      {activeTab === "shells" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted">
              已收集 <strong className="text-ink">{collectedCount}</strong> / {shells.length}
            </span>
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                className="input pl-9 py-2 text-sm w-48"
                placeholder="搜索贝壳..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            {filteredShells.map((shell) => (
              <div key={shell.id} className="card p-4 flex items-center gap-4">
                <button
                  onClick={() => toggleCollect(shell.id)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    shell.collected
                      ? "bg-teal/10 text-teal"
                      : "bg-canvas-card text-muted hover:bg-coral/10 hover:text-coral"
                  }`}
                >
                  {shell.collected ? (
                    <Sparkle className="w-4 h-4" weight="fill" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-ink text-sm font-medium truncate">{shell.title}</p>
                  <p className="text-muted text-xs mt-0.5">
                    {shell.island} · {shell.tag} · {shell.time}
                  </p>
                </div>
                <span className={`badge-teal text-[11px] ${shell.collected ? "" : "opacity-0"}`}>
                  已收集
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Dive */}
      {activeTab === "dive" && (
        <div className="space-y-4">
          {diveLevels.map((level, i) => (
            <div key={i} className={`rounded-xl border p-5 ${level.color}`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className={`font-semibold ${i === 2 ? "text-white" : "text-ink"}`}>
                    {level.depth}
                  </h3>
                  <p className={`text-xs ${i === 2 ? "text-white/60" : "text-muted"}`}>
                    {level.range} · {level.desc}
                  </p>
                </div>
                <Waves className={`w-5 h-5 ${i === 2 ? "text-white/40" : "text-teal"}`} />
              </div>
              <div className="space-y-2">
                {level.articles.map((article, j) => (
                  <div
                    key={j}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      i === 2 ? "bg-white/5 hover:bg-white/10" : "bg-white/60 hover:bg-white"
                    } transition-colors cursor-pointer`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        i === 2 ? "bg-white/10 text-white/70" : "bg-canvas-card text-muted"
                      }`}>
                        {article.tag}
                      </span>
                      <span className={`text-sm ${i === 2 ? "text-white" : "text-ink"}`}>
                        {article.title}
                      </span>
                    </div>
                    <ArrowSquareOut className={`w-4 h-4 ${i === 2 ? "text-white/40" : "text-muted"}`} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Voyage */}
      {activeTab === "voyage" && (
        <div>
          <div className="card p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-ink font-semibold">今日藏宝图</h3>
              <span className="badge-coral">
                {treasureDone}/{treasureTasks.length} 碎片
              </span>
            </div>
            <div className="h-2 bg-canvas-card rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-coral rounded-full transition-all"
                style={{ width: `${(treasureDone / treasureTasks.length) * 100}%` }}
              />
            </div>
            <p className="text-muted text-xs">
              {treasureDone === treasureTasks.length
                ? "恭喜集齐所有碎片！宝藏已解锁"
                : `还差 ${treasureTasks.length - treasureDone} 个碎片解锁宝藏`}
            </p>
          </div>
          <div className="space-y-2">
            {treasureTasks.map((task) => (
              <div key={task.id} className="card p-4 flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  task.done ? "bg-teal/10 text-teal" : "bg-canvas-card text-muted"
                }`}>
                  {task.done ? <Star className="w-4 h-4" weight="fill" /> : <MapTrifold className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${task.done ? "text-muted line-through" : "text-ink"}`}>
                    {task.title}
                  </p>
                  <p className="text-muted text-xs">{task.section}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  task.done ? "bg-teal/10 text-teal" : "bg-canvas-card text-muted"
                }`}>
                  {task.done ? "已完成" : "待完成"}
                </span>
              </div>
            ))}
          </div>
          {treasureDone === treasureTasks.length && (
            <div className="mt-6 card-cream p-6 text-center">
              <Sparkle className="w-8 h-8 text-coral mx-auto mb-2" weight="fill" />
              <h3 className="text-ink font-semibold mb-1">宝藏已解锁!</h3>
              <p className="text-muted text-sm">获得「AI应用实践指南」知识卡片</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default function ExplorePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <Suspense fallback={<div className="text-muted text-center py-20">加载中...</div>}>
            <ExploreContent />
          </Suspense>
        </div>
      </main>
    </>
  );
}
