"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { templates, PromptTemplate } from "@/data/templates";

const MAX_HISTORY = 20; // 最多保存 20 条浏览记录

const categories = [
  { id: "all", name: "全部", emoji: "📚" },
  { id: "collected", name: "我的收藏", emoji: "⭐" },
  { id: "history", name: "浏览历史", emoji: "🕐" },
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

// 获取模板图标
const getCategoryEmoji = (category: string) => {
  const map: Record<string, string> = {
    "代码理解": "🔍",
    "Bug 修复": "🐛",
    "测试": "🧪",
    "文档": "📝",
    "数据库": "🗄️",
    "DevOps": "⚙️",
    "效率工具": "⚡",
  };
  return map[category] || "📦";
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [collectedIds, setCollectedIds] = useState<string[]>([]);
  const [historyIds, setHistoryIds] = useState<string[]>([]);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const historyInitialized = useRef(false);

  // 加载收藏状态
  useEffect(() => {
    const saved = localStorage.getItem("saguni_collected");
    if (saved) {
      try {
        setCollectedIds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse collected templates:", e);
      }
    }
  }, []);

  // 加载浏览历史
  useEffect(() => {
    const saved = localStorage.getItem("saguni_history");
    if (saved) {
      try {
        setHistoryIds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history:", e);
      }
    }
    historyInitialized.current = true;
  }, []);

  // 保存收藏状态
  const toggleCollect = (templateId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let newIds;
    if (collectedIds.includes(templateId)) {
      newIds = collectedIds.filter((id) => id !== templateId);
    } else {
      newIds = [...collectedIds, templateId];
    }
    setCollectedIds(newIds);
    localStorage.setItem("saguni_collected", JSON.stringify(newIds));
  };

  // 添加到浏览历史
  const addToHistory = (templateId: string) => {
    if (!historyInitialized.current) return;
    
    const newHistory = [templateId, ...historyIds.filter((id) => id !== templateId)].slice(0, MAX_HISTORY);
    setHistoryIds(newHistory);
    localStorage.setItem("saguni_history", JSON.stringify(newHistory));
  };

  // 点击模板
  const handleTemplateClick = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    addToHistory(template.id);
  };

  // 获取浏览历史的模板
  const getHistoryTemplates = () => {
    return historyIds
      .map((id) => templates.find((t) => t.id === id))
      .filter(Boolean) as PromptTemplate[];
  };

  // 筛选模板
  const filteredTemplates = templates.filter((template) => {
    // 收藏分类
    if (selectedCategory === "collected") {
      const matchesSearch =
        searchQuery === "" ||
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch && collectedIds.includes(template.id);
    }
    
    // 浏览历史分类
    if (selectedCategory === "history") {
      return historyIds.includes(template.id);
    }
    
    // 普通分类
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
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
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex-shrink-0">
                <Image
                  src="/kapibala.svg"
                  alt="Kapibala - 卡皮巴拉"
                  width={48}
                  height={48}
                  className="w-full h-full"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                  🦫 Saguni
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  让 AI 帮你写更好的代码
                </p>
              </div>
            </div>
            
            {/* 历史按钮 */}
            <button
              onClick={() => setShowHistoryPanel(!showHistoryPanel)}
              className={`p-2 rounded-lg transition-colors ${
                showHistoryPanel
                  ? "bg-orange-100 dark:bg-orange-900 text-orange-600"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
              title="浏览历史"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 搜索模板...（比如：代码、Bug、测试、文档...）"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 rounded-full border-2 border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all shadow-lg"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-xl">
            🦫
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                if (category.id === "history") setShowHistoryPanel(false);
              }}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all shadow-sm flex items-center gap-1 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-orange-300 dark:shadow-orange-700"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md hover:scale-105"
              }`}
            >
              <span>{category.emoji}</span>
              <span>{category.name}</span>
              {category.id === "collected" && collectedIds.length > 0 && (
                <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                  {collectedIds.length}
                </span>
              )}
              {category.id === "history" && historyIds.length > 0 && (
                <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                  {historyIds.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📦</span>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {selectedCategory === "collected" 
              ? "我的收藏" 
              : selectedCategory === "history" 
                ? "浏览历史" 
                : "模板列表"}
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({filteredTemplates.length} 个)
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer p-4 border border-orange-100 dark:border-gray-700"
              onClick={() => handleTemplateClick(template)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {getCategoryEmoji(template.category)}
                  </span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                    {template.title}
                  </h3>
                </div>
                <button
                  onClick={(e) => toggleCollect(template.id, e)}
                  className={`text-lg transition-transform hover:scale-125 ${
                    collectedIds.includes(template.id)
                      ? "text-yellow-500"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                  onClickCapture={(e) => e.stopPropagation()}
                >
                  {collectedIds.includes(template.id) ? "⭐" : "☆"}
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs mt-2 line-clamp-2">
                {template.description}
              </p>
              <div className="flex gap-1 mt-2 flex-wrap">
                <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-full">
                  {template.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">
              {selectedCategory === "collected" ? "⭐" : selectedCategory === "history" ? "🕐" : "🔍"}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {selectedCategory === "collected" 
                ? "还没有收藏任何模板" 
                : selectedCategory === "history"
                  ? "还没有浏览过任何模板"
                  : "没有找到匹配的模板"}
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              {selectedCategory === "collected"
                ? "点击 ⭐ 收藏你喜欢的模板吧！"
                : selectedCategory === "history"
                  ? "点击任意模板开始记录"
                  : "试试其他关键词吧～"}
            </p>
          </div>
        )}
      </div>

      {/* History Side Panel */}
      {showHistoryPanel && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl z-50 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                🕐 浏览历史
              </h3>
              <button
                onClick={() => setShowHistoryPanel(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {getHistoryTemplates().length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                还没有浏览记录
              </p>
            ) : (
              <div className="space-y-2">
                {getHistoryTemplates().map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => {
                      handleTemplateClick(template);
                      setShowHistoryPanel(false);
                    }}
                  >
                    <span className="text-xl">
                      {getCategoryEmoji(template.category)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {template.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {template.category}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCollect(template.id, e);
                      }}
                      className={`text-base ${
                        collectedIds.includes(template.id)
                          ? "text-yellow-500"
                          : "text-gray-300 hover:text-yellow-400"
                      }`}
                    >
                      {collectedIds.includes(template.id) ? "⭐" : "☆"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Template Detail Modal */}
      {selectedTemplate && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTemplate(null)}
        >
          <div 
            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">
                    {getCategoryEmoji(selectedTemplate.category)}
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedTemplate.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {selectedTemplate.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={(e) => toggleCollect(selectedTemplate.id, e)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                    collectedIds.includes(selectedTemplate.id)
                      ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-yellow-50"
                  }`}
                >
                  {collectedIds.includes(selectedTemplate.id) ? "⭐ 已收藏" : "☆ 收藏"}
                </button>
                <button
                  onClick={() => copyToClipboard(selectedTemplate.prompt, selectedTemplate.id)}
                  className="flex-1 bg-gradient-to-r from-orange-400 to-amber-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  {copiedId === selectedTemplate.id ? "已复制！" : "📋 复制 Prompt"}
                </button>
              </div>

              <div className="mt-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Prompt 模板
                </span>
                <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-800 dark:text-gray-300 whitespace-pre-wrap break-words">
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
