"use client";

import Image from "next/image";
import { useState } from "react";
import { templates, PromptTemplate } from "@/data/templates";

const categories = [
  { id: "all", name: "全部", emoji: "📚" },
  { id: "代码理解", name: "代码理解", emoji: "🔍" },
  { id: "Bug 修复", name: "Bug 修复", emoji: "🐛" },
  { id: "代码重构", name: "代码重构", emoji: "♻️" },
  { id: "测试", name: "测试", emoji: "🧪" },
  { id: "文档", name: "文档", emoji: "📝" },
  { id: "代码转换", name: "代码转换", emoji: "🔄" },
  { id: "数据库", name: "数据库", emoji: "🗄️" },
  { id: "工具", name: "工具", emoji: "🛠️" },
  { id: "代码审查", name: "代码审查", emoji: "👀" },
  { id: "算法", name: "算法", emoji: "🧮" },
  { id: "DevOps", name: "DevOps", emoji: "⚙️" },
  { id: "API", name: "API", emoji: "🔗" },
  { id: "类型", name: "类型", emoji: "📘" },
  { id: "脚本", name: "脚本", emoji: "📜" },
  { id: "前端", name: "前端", emoji: "🎨" },
  { id: "版本控制", name: "版本控制", emoji: "📌" },
  { id: "云服务", name: "云服务", emoji: "☁️" },
  { id: "代码质量", name: "代码质量", emoji: "✨" },
  { id: "效率工具", name: "效率工具", emoji: "⚡" },
  { id: "数据处理", name: "数据处理", emoji: "📊" },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            {/* 卡皮巴拉图标 */}
            <div className="w-16 h-16 flex-shrink-0">
              <Image
                src="/kapibala.svg"
                alt="Kapibala - 卡皮巴拉"
                width={64}
                height={64}
                className="w-full h-full"
              />
            </div>
            
            {/* 标题和副标题 */}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                🦫 Kapibala
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                卡皮巴拉的 AI Prompt 模板库 🦦 让 AI 帮你写更好的代码
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 搜索模板...（比如：代码、Bug、测试、文档...）"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 rounded-full border-2 border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all shadow-lg"
          />
          {/* 搜索图标装饰 */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl">
            🦫
          </div>
        </div>
      </div>

      {/* 分类 */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all shadow-sm ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-orange-300 dark:shadow-orange-700"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md hover:scale-105"
              }`}
            >
              <span className="mr-1">{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 模板网格 */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📦</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            模板列表
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({filteredTemplates.length} 个模板)
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer p-5 border border-orange-100 dark:border-gray-700"
              onClick={() => setSelectedTemplate(template)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {template.category === "代码理解" ? "🔍" :
                     template.category === "Bug 修复" ? "🐛" :
                     template.category === "测试" ? "🧪" :
                     template.category === "文档" ? "📝" :
                     template.category === "数据库" ? "🗄️" :
                     template.category === "DevOps" ? "⚙️" :
                     template.category === "效率工具" ? "⚡" : "📦"}
                  </span>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {template.title}
                  </h3>
                </div>
                {template.isPremium && (
                  <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-0.5 rounded-full">
                    ⭐ Premium
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2">
                {template.description}
              </p>
              <div className="flex gap-1 mt-3 flex-wrap">
                <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-full">
                  {template.category}
                </span>
                {template.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              没有找到匹配的模板
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              试试其他关键词吧～
            </p>
          </div>
        )}
      </div>

      {/* 模板详情弹窗 */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">
                    {selectedTemplate.category === "代码理解" ? "🔍" :
                     selectedTemplate.category === "Bug 修复" ? "🐛" :
                     selectedTemplate.category === "测试" ? "🧪" :
                     selectedTemplate.category === "文档" ? "📝" :
                     selectedTemplate.category === "数据库" ? "🗄️" :
                     selectedTemplate.category === "DevOps" ? "⚙️" :
                     selectedTemplate.category === "效率工具" ? "⚡" : "📦"}
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedTemplate.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {selectedTemplate.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Prompt 模板
                  </span>
                  <button
                    onClick={() => copyToClipboard(selectedTemplate.prompt, selectedTemplate.id)}
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    {copiedId === selectedTemplate.id ? "已复制！" : "复制"}
                  </button>
                </div>
                <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-800 dark:text-gray-300">
                  {selectedTemplate.prompt}
                </pre>
              </div>

              <div className="mt-4 flex gap-2 flex-wrap">
                {selectedTemplate.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
