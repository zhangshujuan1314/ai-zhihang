"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  Coin,
  Waves,
  Sparkle,
  ArrowLeft,
} from "@phosphor-icons/react";
import { setUser } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setUser({ name: name || "探索者", email });
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-canvas flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-surface-dark flex-col justify-between p-12">
        {/* Decorative gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-coral/8 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal/6 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Back link */}
        <Link
          href="/"
          className="relative z-10 flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <Compass weight="fill" className="w-6 h-6 text-coral" />
              </div>
              <span className="text-white text-xl font-semibold">
                AI<span className="text-coral">知航</span>
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-white text-4xl leading-[1.1] tracking-tight mb-6">
              在知识的海洋中
              <br />
              找到你的<span className="text-coral">航向</span>
            </h1>

            <p className="text-white/50 text-lg leading-relaxed mb-10">
              AI时代的学习成长平台，将零散信息组织成可探索、可积累的知识地图。
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Coin, label: "收集贝壳" },
                { icon: Waves, label: "深潜寻珠" },
                { icon: Sparkle, label: "启航探险" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom text */}
        <div className="relative z-10 text-white/30 text-sm">
          © 2026 AI知航. 持续学习，持续成长.
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-16">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden flex items-center gap-2.5 mb-10">
          <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
            <Compass weight="fill" className="w-5 h-5 text-coral" />
          </div>
          <span className="text-ink font-semibold text-xl">
            AI<span className="text-coral">知航</span>
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px]"
        >
          {/* Form header */}
          <div className="mb-8">
            <h2 className="font-[family-name:var(--font-display)] text-ink text-3xl tracking-tight mb-2">
              {mode === "login" ? "欢迎回来" : "创建账号"}
            </h2>
            <p className="text-muted">
              {mode === "login"
                ? "登录以继续你的探索之旅"
                : "开始你的知识海洋探索之旅"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "register" && (
              <div>
                <label className="block text-sm text-ink font-medium mb-1.5">
                  昵称
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="你的探索者昵称"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-ink font-medium mb-1.5">
                邮箱
              </label>
              <div className="relative">
                <Envelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  className="input pl-10"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm text-ink font-medium">密码</label>
                {mode === "login" && (
                  <button
                    type="button"
                    className="text-xs text-coral hover:underline"
                  >
                    忘记密码？
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type={showPw ? "text" : "password"}
                  className="input pl-10 pr-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
                >
                  {showPw ? (
                    <EyeSlash className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-[15px] mt-2 disabled:opacity-60"
            >
              {loading
                ? "请稍候..."
                : mode === "login"
                ? "登录"
                : "创建账号"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted text-xs">或</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social login */}
          <button className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-lg border border-border bg-white text-sm text-ink font-medium hover:bg-canvas-card transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            使用 Google 账号登录
          </button>

          {/* Switch mode */}
          <div className="mt-8 text-center">
            <span className="text-muted text-sm">
              {mode === "login" ? "还没有账号？" : "已有账号？"}
            </span>
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-coral text-sm font-medium hover:underline ml-1"
            >
              {mode === "login" ? "立即注册" : "去登录"}
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <p className="text-muted/60 text-xs text-center mt-12">
          登录即表示同意我们的{" "}
          <a href="#" className="text-muted hover:text-ink transition-colors">
            服务条款
          </a>{" "}
          和{" "}
          <a href="#" className="text-muted hover:text-ink transition-colors">
            隐私政策
          </a>
        </p>
      </div>
    </div>
  );
}
