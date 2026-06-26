"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  Brain,
  Lightning,
  Code,
  PaintBrush,
  ChartBar,
  Books,
  GearSix,
  Coin,
  Sparkle,
  LinkSimple,
  ArrowRight,
  X,
} from "@phosphor-icons/react";

const islands = [
  {
    id: "ai-basics",
    name: "AI基础",
    icon: Brain,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-500/8",
    shells: 24,
    pearls: 8,
    desc: "AI核心概念、模型架构、训练方法",
    topics: ["Transformer", "大语言模型", "多模态", "Agent框架"],
  },
  {
    id: "prompt",
    name: "Prompt工程",
    icon: Lightning,
    iconColor: "text-amber",
    bgColor: "bg-amber/8",
    shells: 18,
    pearls: 12,
    desc: "提示词设计、Chain-of-Thought、Few-shot",
    topics: ["系统提示词", "思维链", "少样本学习", "输出格式"],
  },
  {
    id: "dev-tools",
    name: "开发工具",
    icon: Code,
    iconColor: "text-teal",
    bgColor: "bg-teal/8",
    shells: 15,
    pearls: 5,
    desc: "Cursor、GitHub Copilot、AI编程助手",
    topics: ["Cursor", "Copilot", "Claude Code", "Windsurf"],
  },
  {
    id: "product",
    name: "产品设计",
    icon: PaintBrush,
    iconColor: "text-coral",
    bgColor: "bg-coral/8",
    shells: 12,
    pearls: 6,
    desc: "AI产品思维、用户体验、商业模式",
    topics: ["AI产品策略", "用户增长", "定价模型", "MVP验证"],
  },
  {
    id: "data",
    name: "数据分析",
    icon: ChartBar,
    iconColor: "text-teal",
    bgColor: "bg-teal/8",
    shells: 9,
    pearls: 3,
    desc: "数据处理、可视化、分析方法论",
    topics: ["Python分析", "SQL查询", "数据可视化", "统计方法"],
  },
  {
    id: "deep-learning",
    name: "深度学习",
    icon: Books,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-500/8",
    shells: 20,
    pearls: 15,
    desc: "神经网络、Transformer、微调技术",
    topics: ["神经网络", "模型微调", "RLHF", "向量数据库"],
  },
  {
    id: "automation",
    name: "自动化",
    icon: GearSix,
    iconColor: "text-ink",
    bgColor: "bg-ink/5",
    shells: 7,
    pearls: 2,
    desc: "工作流自动化、Agent、MCP",
    topics: ["n8n", "Dify", "MCP协议", "工作流编排"],
  },
];

export default function MapPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const selectedIsland = islands.find((i) => i.id === selected);
  const totalShells = islands.reduce((s, i) => s + i.shells, 0);
  const totalPearls = islands.reduce((s, i) => s + i.pearls, 0);

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-ink text-2xl font-semibold mb-1">知识地图</h1>
            <p className="text-muted text-sm">
              你的知识体系全景，共 {totalShells} 个贝壳、{totalPearls} 颗珍珠
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-5 mb-6 text-sm">
            <span className="flex items-center gap-1.5 text-muted">
              <Coin className="w-3.5 h-3.5 text-amber" />
              贝壳 <strong className="text-ink">{totalShells}</strong>
            </span>
            <span className="flex items-center gap-1.5 text-muted">
              <Sparkle className="w-3.5 h-3.5 text-teal" />
              珍珠 <strong className="text-ink">{totalPearls}</strong>
            </span>
            <span className="flex items-center gap-1.5 text-muted">
              <LinkSimple className="w-3.5 h-3.5 text-muted" />
              岛屿 <strong className="text-ink">{islands.length}</strong>
            </span>
          </div>

          {/* Island grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
            {islands.map((island) => {
              const Icon = island.icon;
              const active = selected === island.id;
              return (
                <button
                  key={island.id}
                  onClick={() => setSelected(active ? null : island.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    active
                      ? "border-coral bg-coral/5 ring-1 ring-coral/20"
                      : "border-border bg-white hover:border-border/80 hover:shadow-sm"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 mb-2 ${island.iconColor}`}
                    weight="duotone"
                  />
                  <h3 className="text-ink font-medium text-sm mb-1">
                    {island.name}
                  </h3>
                  <div className="flex gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Coin className="w-3 h-3 text-amber" />
                      {island.shells}
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkle className="w-3 h-3 text-teal" />
                      {island.pearls}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          {selectedIsland && (
            <div className="card p-5 animate-fade-in">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedIsland.bgColor}`}
                  >
                    <selectedIsland.icon
                      className={`w-5 h-5 ${selectedIsland.iconColor}`}
                      weight="duotone"
                    />
                  </div>
                  <div>
                    <h3 className="text-ink font-semibold text-lg">
                      {selectedIsland.name}
                    </h3>
                    <p className="text-muted text-xs">
                      {selectedIsland.shells} 贝壳 · {selectedIsland.pearls} 珍珠
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-canvas-card transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-muted text-sm mb-4">{selectedIsland.desc}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedIsland.topics.map((topic, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs rounded-full bg-canvas-card text-muted"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-muted mb-1">
                  <span>掌握进度</span>
                  <span>
                    {Math.round(
                      (selectedIsland.pearls /
                        (selectedIsland.shells + selectedIsland.pearls)) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="h-1.5 bg-canvas-card rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal rounded-full transition-all"
                    style={{
                      width: `${
                        (selectedIsland.pearls /
                          (selectedIsland.shells + selectedIsland.pearls)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <button
                onClick={() => router.push(`/explore?island=${selectedIsland.id}`)}
                className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2"
              >
                进入探索
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
