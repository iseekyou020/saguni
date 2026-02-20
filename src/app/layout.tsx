import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kapibala - 卡皮巴拉的 AI Prompt 模板库",
  description: "🦫 让 AI 帮你写更好的代码。45+ 免费模板，代码解释、Bug修复、测试生成全覆盖，复制即用！",
  keywords: ["AI", "Prompt", "ChatGPT", "Claude", "编程", "开发者工具", "效率"],
  authors: [{ name: "Kapibala" }],
  openGraph: {
    title: "Kapibala - 卡皮巴拉的 AI Prompt 模板库",
    description: "🦫 让 AI 帮你写更好的代码。45+ 免费模板，复制即用！",
    url: "https://kapibala-kappa.vercel.app",
    siteName: "Kapibala",
    locale: "zh-CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kapibala - AI Prompt 模板库",
    description: "45+ 免费模板，让 AI 帮你写代码！",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
