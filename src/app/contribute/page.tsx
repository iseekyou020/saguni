import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "贡献模板 - Kapibala",
  description: "为 Kapibala 贡献 AI Prompt 模板",
};

export default function ContributePage() {
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
          �贡献模板
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">欢迎贡献！</h2>
            <p className="text-gray-600 dark:text-gray-400">
              如果你有好的 AI Prompt 模板，欢迎提交给我们！
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">贡献方式</h2>
            <ol className="list-decimal list-inside space-y-4 text-gray-600 dark:text-gray-400">
              <li>
                <strong>Fork 项目</strong>
                <br />
                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  git fork https://github.com/iseekyou020/kapibala
                </code>
              </li>
              <li>
                <strong>添加模板</strong>
                <br />
                在 <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">src/data/templates.ts</code> 中添加你的模板
              </li>
              <li>
                <strong>提交 PR</strong>
                <br />
                创建一个 Pull Request
              </li>
            </ol>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">模板格式</h2>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  id: "unique-id",
  title: "模板标题",
  description: "简短描述",
  category: "所属分类",
  prompt: "你的 Prompt 模板",
  tags: ["标签1", "标签2"],
  isPremium: false,
}`}
            </pre>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">分类参考</h2>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>🔍 代码理解</span>
              <span>🐛 Bug 修复</span>
              <span>♻️ 代码重构</span>
              <span>🧪 测试</span>
              <span>📝 文档</span>
              <span>🔄 代码转换</span>
              <span>🗄️ 数据库</span>
              <span>🛠️ 工具</span>
              <span>👀 代码审查</span>
              <span>🧮 算法</span>
              <span>⚙️ DevOps</span>
              <span>🔗 API</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
