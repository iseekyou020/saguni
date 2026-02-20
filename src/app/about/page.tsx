import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于 - Kapibala",
  description: "关于 Kapibala - 卡皮巴拉的 AI Prompt 模板库",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-8"
        >
          ← 返回首页
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          🦫 关于 Kapibala
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">我们是谁</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Kapibala 是一个免费的 AI Prompt 模板库，旨在帮助开发者更高效地使用 ChatGPT、Claude 等 AI 工具编写代码。
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">为什么做这个</h2>
            <p className="text-gray-600 dark:text-gray-400">
              作为程序员，我们每天都在和 AI 打交道。但是每次都要写 prompt，真的很累...
              <br /><br />
              于是我们整理了这些常用的高质量 Prompt 模板，希望帮助大家提高效率！
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">功能特点</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>46+ 高质量模板</li>
              <li>21 个分类，涵盖开发全场景</li>
              <li>一键复制，复制即用</li>
              <li>完全免费，MIT 开源</li>
              <li>响应式设计，支持移动端</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">使用许可</h2>
            <p className="text-gray-600 dark:text-gray-400">
              MIT License - 完全可以免费使用，欢迎贡献！
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">联系我们</h2>
            <p className="text-gray-600 dark:text-gray-400">
              GitHub: <a href="https://github.com/iseekyou020/kapibala" className="text-orange-600 hover:underline">iseekyou020/kapibala</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
