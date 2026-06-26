"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Compass,
  Coin,
  Waves,
  MapTrifold,
  ArrowRight,
  Sparkle,
  BookOpen,
  TrendUp,
  Trophy,
} from "@phosphor-icons/react";

/* ─── Landing Nav ─── */
function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-canvas/80 backdrop-blur-md border-b border-border-light">
      <div className="max-w-6xl mx-auto px-6 h-[64px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
            <Compass weight="fill" className="w-4 h-4 text-coral" />
          </div>
          <span className="text-ink font-semibold text-[15px]">
            AI<span className="text-coral">知航</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-muted text-[14px] hover:text-ink transition-colors px-3 py-2">
            登录
          </Link>
          <Link href="/login" className="btn-primary text-[13px] px-4 py-2">
            免费开始
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ─── Fade In ─── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <span className="badge-coral mb-6 inline-flex">
            <Compass className="w-3.5 h-3.5" />
            AI时代知识探索平台
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="display-xl mb-6">
            在知识的海洋中
            <br />
            找到你的<span className="text-coral">航向</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            AI时代信息爆炸，零散的知识碎片散落各处。
            <br className="hidden sm:block" />
            AI知航将碎片编织成体系，让每一次探索都有收获。
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/login" className="btn-primary px-6 py-3 text-[15px]">
              开始你的航行
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#features" className="btn-secondary px-6 py-3 text-[15px]">
              了解更多
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Pain Points ─── */
function PainPoints() {
  const points = [
    { icon: BookOpen, title: "看过即忘", desc: "收藏夹堆满却从不回看，信息只是路过大脑" },
    { icon: Waves, title: "碎片堆积", desc: "知识散落在十几个平台，无法串联形成体系" },
    { icon: Compass, title: "方向迷失", desc: "AI工具层出不穷，不知道该学什么、先学什么" },
    { icon: TrendUp, title: "进度不明", desc: "无法衡量知识积累进度，不知道自己走了多远" },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="display-lg text-center mb-4">没有AI知航，你可能会</h2>
          <p className="text-muted text-center mb-12">信息碎片化时代的学习困境</p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {points.map((point, i) => {
            const Icon = point.icon;
            return (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="card p-6 group">
                  <div className="w-10 h-10 rounded-lg bg-canvas-card flex items-center justify-center mb-3 group-hover:bg-coral/10 transition-colors">
                    <Icon className="w-5 h-5 text-muted group-hover:text-coral transition-colors" />
                  </div>
                  <h3 className="text-ink font-medium mb-1">{point.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{point.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── World View ─── */
function WorldView() {
  const layers = [
    { icon: Waves, label: "海洋", sub: "AI信息海洋", desc: "无穷无尽的AI资讯和概念", color: "text-teal" },
    { icon: MapTrifold, label: "岛屿", sub: "知识领域", desc: "系统化的知识板块", color: "text-coral" },
    { icon: Coin, label: "贝壳", sub: "零散知识", desc: "随手捡起的知识碎片", color: "text-amber" },
    { icon: Sparkle, label: "珍珠", sub: "掌握的知识", desc: "内化为体系的知识精华", color: "text-teal" },
  ];

  return (
    <section className="py-20 px-6 bg-canvas-card">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="display-lg text-center mb-4">知识的海洋世界观</h2>
          <p className="text-muted text-center mb-12 max-w-xl mx-auto">
            将零散信息重新定义为可探索的海洋世界
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {layers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card bg-white p-5 text-center h-full">
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${layer.color}`} weight="duotone" />
                  <h3 className="text-ink font-semibold text-lg">{layer.label}</h3>
                  <p className="text-muted text-xs mt-0.5 mb-2">{layer.sub}</p>
                  <p className="text-muted text-sm">{layer.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Features ─── */
function Features() {
  const features = [
    {
      icon: Coin,
      title: "收集贝壳",
      desc: "随手收集知识碎片，AI自动归档汇聚成知识图鉴",
      items: ["概念碎片", "工具用法", "代码片段", "行业洞察"],
      color: "text-amber",
    },
    {
      icon: Waves,
      title: "深潜寻珠",
      desc: "按深度探索知识海洋，采到的珍珠分品级串联成项链",
      items: ["浅水区·资讯", "中层·教程", "深水区·前沿", "珍珠品级"],
      color: "text-teal",
    },
    {
      icon: MapTrifold,
      title: "启航探险",
      desc: "每日藏宝图碎片任务，集齐解锁知识宝藏",
      items: ["刷题板块", "文档阅读", "推荐内容", "社区动态"],
      color: "text-coral",
    },
  ];

  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="display-lg text-center mb-4">三大核心玩法</h2>
          <p className="text-muted text-center mb-12">
            从碎片收集到体系构建，让学习变成探索
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card p-6 h-full flex flex-col">
                  <Icon className={`w-8 h-8 mb-4 ${f.color}`} weight="duotone" />
                  <h3 className="text-ink font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">{f.desc}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {f.items.map((item, j) => (
                      <span
                        key={j}
                        className="px-2.5 py-1 text-xs rounded-full bg-canvas-card text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTASection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <h2 className="display-lg mb-4">
            AI时代没有标准答案
            <br />
            在探索中<span className="text-coral">校准方向</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-muted text-lg mb-8">
            愿AI知航成为每个人学习旅程中的一个坐标点。
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Link href="/login" className="btn-primary px-8 py-3.5 text-[15px]">
            开始你的航行
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Compass weight="fill" className="w-4 h-4 text-coral" />
          <span className="text-ink text-sm font-medium">AI知航</span>
        </div>
        <p className="text-muted text-sm">
          © 2026 AI知航. 在知识海洋中找到你的航向.
        </p>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function LandingPage() {
  return (
    <>
      <LandingNav />
      <main>
        <Hero />
        <PainPoints />
        <WorldView />
        <Features />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
