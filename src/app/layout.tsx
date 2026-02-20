import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kapibala - 卡皮巴拉的 AI Prompt 模板库",
  description: "🦫 让 AI 帮你写更好的代码。45+ 免费模板，复制即用。",
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
