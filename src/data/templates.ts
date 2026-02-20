export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  prompt: string;
  tags: string[];
  isPremium: boolean;
}

export const templates: PromptTemplate[] = [
  {
    id: "code-explain",
    title: "代码解释器",
    description: "让 AI 详细解释一段代码的功能和工作原理",
    category: "代码理解",
    prompt: `请作为一位资深软件工程师，详细解释以下代码：

\`\`\`{language}
{code}
\`\`\`

请从以下几个维度分析：
1. 这段代码的功能是什么？
2. 核心逻辑和关键算法是什么？
3. 有没有潜在的优化空间？
4. 可能存在的边界情况或 bug？

用清晰的结构回答，必要时可以补充代码示例。`,
    tags: ["入门", "学习", "代码审查"],
    isPremium: false,
  },
  {
    id: "bug-debug",
    title: "Bug 调试助手",
    description: "帮助定位和修复代码中的 bug",
    category: "Bug 修复",
    prompt: `请帮我分析和修复以下代码中的 bug：

错误信息：
{error_message}

问题代码：
\`\`\`{language}
{code}
\`\`\`

请分析：
1. bug 的根本原因是什么？
2. 修复方案是什么？
3. 修复后的代码示例
4. 如何避免类似问题？`,
    tags: ["调试", "修复", "生产环境"],
    isPremium: false,
  },
  {
    id: "code-refactor",
    title: "代码重构专家",
    description: "优化代码结构，提升可读性和性能",
    category: "代码重构",
    prompt: `请作为一位追求极致代码质量的架构师，帮我重构以下代码：

原始代码：
\`\`\`{language}
{code}
\`\`\`

重构目标：
- 提高代码可读性
- 优化性能（如果有优化空间）
- 遵循最佳实践
- 保持功能不变

请提供：
1. 重构后的代码
2. 重构要点说明
3. 改进前后的对比`,
    tags: ["重构", "优化", "最佳实践"],
    isPremium: false,
  },
  {
    id: "unit-test",
    title: "单元测试生成",
    description: "自动生成代码的单元测试",
    category: "测试",
    prompt: `请为以下代码生成单元测试：

\`\`\`{language}
{code}
\`\`\`

要求：
- 使用 {testing_framework} 框架
- 覆盖主要功能和边界情况
- 使用 AAA 模式（Arrange, Act, Assert）
- 提供清晰的测试用例说明

请生成完整的测试代码。`,
    tags: ["测试", "质量保证"],
    isPremium: false,
  },
  {
    id: "api-docs",
    title: "API 文档生成",
    description: "根据代码自动生成 API 文档",
    category: "文档",
    prompt: `请根据以下代码生成 API 文档：

\`\`\`{language}
{code}
\`\`\`

请生成以下格式的文档：

## API 概述

## 端点列表

### {endpoint_name}

**方法：** GET/POST/PUT/DELETE

**路径：** /api/...

**描述：**

**参数：**
- name: type, required, description

**请求示例：**

**响应示例：**

**可能错误：`,
    tags: ["文档", "API"],
    isPremium: false,
  },
  {
    id: "code-translate",
    title: "语言转换器",
    description: "将代码从一种语言转换为另一种语言",
    category: "代码转换",
    prompt: `请将以下代码从 {source_language} 转换为 {target_language}：

原始代码：
\`\`\`{source_language}
{code}
\`\`\`

要求：
- 保持相同的功能和逻辑
- 遵循 {target_language} 的最佳实践
- 适当使用语言特有的特性
- 添加必要的注释

请提供完整的转换后代码。`,
    tags: ["转换", "多语言"],
    isPremium: false,
  },
  {
    id: "sql-query",
    title: "SQL 查询优化",
    description: "生成和优化 SQL 查询语句",
    category: "数据库",
    prompt: `请帮我完成以下 SQL 任务：

需求：
{requirement}

当前表结构：
\`\`\`sql
{schema}
\`\`\`

请提供：
1. 实现需求的 SQL 查询
2. 查询优化建议（如有）
3. 索引建议（如有）`,
    tags: ["数据库", "SQL", "优化"],
    isPremium: false,
  },
  {
    id: "regex-generator",
    title: "正则表达式生成",
    description: "根据需求生成正则表达式",
    category: "工具",
    prompt: `请帮我生成一个正则表达式：

需求描述：
{requirement}

匹配示例：
- 应该匹配的字符串：{example_match}
- 不应该匹配的字符串：{example_no_match}

请提供：
1. 正则表达式
2. 解释说明
3. 使用示例`,
    tags: ["正则", "验证"],
    isPremium: false,
  },
  {
    id: "readme-generator",
    title: "README 生成器",
    description: "根据项目结构自动生成 README",
    category: "文档",
    prompt: `请为以下项目生成 README 文档：

项目结构：
\`\`\`
{project_structure}
\`\`\`

项目描述：
{project_description}

主要功能：
{features}

技术栈：
{tech_stack}

请生成以下格式的 README：

# 项目名称

## 简介

## 功能列表

## 快速开始

### 环境要求

### 安装

### 使用

## 项目结构

## API 文档（如有）

## 贡献指南

## 许可证`,
    tags: ["文档", "README"],
    isPremium: false,
  },
  {
    id: "code-review",
    title: "代码审查助手",
    description: "全面的代码审查和改进建议",
    category: "代码审查",
    prompt: `请作为资深架构师，对以下代码进行全面审查：

\`\`\`{language}
{code}
\`\`\`

审查维度：
1. **代码质量** - 可读性、可维护性、命名规范
2. **安全性** - 潜在安全漏洞
3. **性能** - 性能问题和优化建议
4. **最佳实践** - 是否遵循语言/框架最佳实践
5. **测试覆盖** - 是否有测试，测试是否充分

请提供：
1. 总体评价（1-10 分）
2. 优点列表
3. 需要改进的地方（按优先级排序）
4. 改进后的代码示例（如有必要）
5. 整体建议`,
    tags: ["代码审查", "质量"],
    isPremium: false,
  },
  {
    id: "algorithm-optimize",
    title: "算法优化顾问",
    description: "分析算法复杂度并提供优化建议",
    category: "算法",
    prompt: `请分析以下算法并提供优化建议：

代码：
\`\`\`{language}
{code}
\`\`\`

请分析：
1. 当前时间/空间复杂度
2. 可能的优化方向
3. 优化后的代码示例
4. 适用场景分析

如果有多解法，请比较各解法的优劣。`,
    tags: ["算法", "优化", "复杂度"],
    isPremium: false,
  },
  {
    id: "dockerfile-generator",
    title: "Docker 配置生成",
    description: "为项目生成最佳实践的 Dockerfile",
    category: "DevOps",
    prompt: `请为以下项目生成 Dockerfile：

技术栈：{tech_stack}
框架：{framework}
端口：{port}
入口文件：{entrypoint}

请遵循以下原则：
- 使用官方基础镜像
- 最小化镜像大小
- 利用构建缓存
- 正确处理依赖
- 安全性最佳实践

请提供：
1. Dockerfile
2. .dockerignore 文件（如需要）
3. docker-compose.yml（如需要）
4. 构建和使用说明`,
    tags: ["Docker", "DevOps", "容器"],
    isPremium: false,
  },
  {
    id: "graphql-schema",
    title: "GraphQL Schema 生成",
    description: "根据需求设计 GraphQL Schema",
    category: "API",
    prompt: `请为以下需求设计 GraphQL Schema：

业务需求：
{requirements}

数据模型：
{models}

请提供：
1. Type Definitions（Types, Inputs, Enums, Interfaces）
2. Queries 定义
3. Mutations 定义（如需要）
4. 关联关系说明
5. 最佳实践建议`,
    tags: ["GraphQL", "API", "后端"],
    isPremium: false,
  },
  {
    id: "typescript-def",
    title: "TypeScript 类型生成",
    description: "根据 JSON 数据或接口生成 TypeScript 类型",
    category: "类型",
    prompt: `请根据以下数据生成 TypeScript 类型定义：

数据示例：
\`\`\`json
{data}
\`\`\`

使用场景：
{usage_scenario}

请提供：
1. TypeScript Interface/Type 定义
2. 必要的泛型支持
3. JSDoc 注释说明
4. 使用示例`,
    tags: ["TypeScript", "类型", "前端"],
    isPremium: false,
  },
  {
    id: "python-script",
    title: "Python 脚本生成",
    description: "快速生成 Python 脚本",
    category: "脚本",
    prompt: `请生成一个 Python 脚本：

需求：
{requirement}

输入数据：
{input_data}

预期输出：
{output_data}

要求：
- 遵循 PEP 8 规范
- 必要的错误处理
- 命令行参数支持（使用 argparse）
- 类型提示（Type Hints）
- 清晰的注释

请提供完整脚本代码。`,
    tags: ["Python", "脚本", "自动化"],
    isPremium: false,
  },
  {
    id: "react-component",
    title: "React 组件生成",
    description: "生成最佳实践的 React 组件",
    category: "前端",
    prompt: `请生成一个 React 组件：

组件功能：
{component_function}

设计稿/UI 描述：
{ui_description}

技术栈：
- 框架：React
- 样式：{style_preference}
- 状态管理：{state_management}
- 是否有 API 调用：{has_api}

请提供：
1. 完整组件代码
2. Props 类型定义
3. 使用示例
4. 注意事项（如有）`,
    tags: ["React", "前端", "组件"],
    isPremium: false,
  },
  {
    id: "git-commit-msg",
    title: "Git 提交信息生成",
    description: "根据代码变更生成规范化的提交信息",
    category: "版本控制",
    prompt: `请根据以下代码变更生成 Git 提交信息：

变更文件：
{files_changed}

变更描述：
{change_description}

代码预览：
\`\`\`diff
{code_diff}
\`\`\`

请遵循 Conventional Commits 规范：
- type: scope - subject

格式：
\`\`\`
<type>(<scope>): <subject>

<body>

<footer>
\`\`\`

可选的 type：
- feat: 新功能
- fix: Bug 修复
- docs: 文档更新
- style: 代码格式
- refactor: 重构
- test: 测试
- chore: 杂项

请生成规范的提交信息。`,
    tags: ["Git", "版本控制", "提交规范"],
    isPremium: false,
  },
  {
    id: "database-migration",
    title: "数据库迁移脚本",
    description: "生成数据库迁移脚本",
    category: "数据库",
    prompt: `请生成数据库迁移脚本：

数据库类型：{db_type}
迁移方向：{direction}（up/down）

当前表结构：
\`\`\`sql
{current_schema}
\`\`\`

目标表结构：
\`\`\`sql
{target_schema}
\`\`\`

请提供：
1. 迁移文件（支持 {migration_tool}）
2. 回滚脚本
3. 执行前后验证 SQL`,
    tags: ["数据库", "迁移", "SQL"],
    isPremium: false,
  },
  {
    id: "aws-infra",
    title: "AWS 基础设施配置",
    description: "生成 AWS 基础设施代码",
    category: "云服务",
    prompt: `请生成 AWS 基础设施配置：

服务需求：
{services_needed}（如：EC2, RDS, S3, Lambda, API Gateway）

应用类型：{app_type}
预计流量：{traffic_level}
预算范围：{budget}

请使用 Terraform 提供：
1. main.tf - 主要配置
2. variables.tf - 变量定义
3. outputs.tf - 输出配置
4. provider.tf - 服务商配置

遵循安全最佳实践：
- 最小权限原则
- 敏感信息使用变量
- 资源标签规范`,
    tags: ["AWS", "Terraform", "云"],
    isPremium: false,
  },
  {
    id: "error-handling",
    title: "错误处理增强",
    description: "为代码添加完善的错误处理",
    category: "代码质量",
    prompt: `请为以下代码增强错误处理：

原始代码：
\`\`\`{language}
{code}
\`\`\`

预期场景：
{error_scenarios}

请提供：
1. 错误类型定义
2. Try-catch/错误边界处理
3. 用户友好的错误提示
4. 错误日志记录
5. 降级方案（如有）`,
    tags: ["错误处理", "可靠性", "最佳实践"],
    isPremium: false,
  },
  {
    id: "performance-test",
    title: "性能测试脚本",
    description: "生成性能测试脚本",
    category: "测试",
    prompt: `请生成性能测试脚本：

测试目标：
{test_target}（API/函数/页面）

测试场景：
{test_scenario}

性能指标：
{metrics}（响应时间/并发数/QPS）

工具偏好：{tool_preference}

请提供：
1. 测试脚本代码
2. 测试数据准备
3. 结果分析
4. 优化建议`,
    tags: ["性能测试", "压测", "质量"],
    isPremium: false,
  },
  {
    id: "css-generator",
    title: "CSS 样式生成",
    description: "根据需求生成现代化 CSS 样式",
    category: "前端",
    prompt: `请生成 CSS 样式：

需求描述：
{requirement}

UI 描述或设计稿链接：
{ui_description}

请提供：
1. 完整 CSS 代码
2. 使用说明
3. 响应式适配（如需要）`,
    tags: ["CSS", "前端", "样式"],
    isPremium: false,
  },
  {
    id: "nginx-config",
    title: "Nginx 配置生成",
    description: "生成 Nginx 服务器配置",
    category: "DevOps",
    prompt: `请生成 Nginx 配置：

服务类型：{service_type}（网站/API/反向代理）
域名：{domain}
端口：{port}
SSL 证书：{ssl_enabled}

请提供：
1. nginx.conf 配置
2. server block 配置
3. 安全头配置（如需要）
4. 负载均衡配置（如需要）`,
    tags: ["Nginx", "DevOps", "服务器"],
    isPremium: false,
  },
  {
    id: "cli-tool",
    title: "命令行工具生成",
    description: "快速生成 CLI 工具代码",
    category: "工具",
    prompt: `请生成 CLI 工具：

工具名称：{tool_name}
功能描述：{description}
语言偏好：{language}

请提供：
1. 完整代码
2. 命令行参数解析（使用 argparse/clicommander）
3. 使用示例
4. 安装/卸载脚本`,
    tags: ["CLI", "工具", "自动化"],
    isPremium: false,
  },
  {
    id: "test-data",
    title: "测试数据生成",
    description: "生成测试用的模拟数据",
    category: "测试",
    prompt: `请生成测试数据：

数据类型：{data_type}（用户/订单/产品/文章）
数据量：{count} 条
字段要求：
{fields}

格式偏好：{format}（JSON/SQL/CSV）

请生成符合要求的测试数据。`,
    tags: ["测试", "Mock数据", " fixtures"],
    isPremium: false,
  },
  {
    id: "sql-schema",
    title: "数据库表结构设计",
    description: "根据需求设计数据库表结构",
    category: "数据库",
    prompt: `请设计数据库表结构：

业务需求：{business_requirements}
数据量预估：{data_scale}
数据库类型：{db_type}（MySQL/PostgreSQL/MongoDB）

请提供：
1. ER 图描述
2. CREATE TABLE 语句
3. 索引设计
4. 外键关系说明`,
    tags: ["数据库", "设计", "SQL"],
    isPremium: false,
  },
  {
    id: "api-error-codes",
    title: "API 错误码设计",
    description: "设计规范的 API 错误码体系",
    category: "API",
    prompt: `请设计 API 错误码体系：

业务模块：{modules}（用户/订单/支付/商品）
HTTP 状态码规范：{http_standard}

请提供：
1. 错误码命名规范
2. 错误码列表（模块 + 编号 + 消息）
3. 错误响应格式示例
4. 错误处理最佳实践`,
    tags: ["API", "错误处理", "规范"],
    isPremium: false,
  },
  {
    id: "github-action",
    title: "GitHub Actions 工作流",
    description: "生成 CI/CD 工作流配置",
    category: "DevOps",
    prompt: `请生成 GitHub Actions 工作流：

触发条件：{trigger}（push/pull_request/dispatch）
任务类型：{task_type}（构建/测试/部署/发布）
技术栈：{tech_stack}

请提供：
1. workflow YAML 文件
2. 环境变量配置
3. 缓存配置
4. 部署配置（如需要）`,
    tags: ["CI/CD", "GitHub Actions", "自动化"],
    isPremium: false,
  },
  {
    id: "security-audit",
    title: "安全审计检查清单",
    description: "生成代码安全审计检查清单",
    category: "安全",
    prompt: `请生成安全审计检查清单：

代码类型：{code_type}（前端/后端/API/移动端）
技术栈：{tech_stack}

请提供安全检查项：
1. 输入验证
2. 认证授权
3. 数据加密
4. 敏感信息处理
5. 依赖安全
6. 日志安全`,
    tags: ["安全", "审计", "合规"],
    isPremium: false,
  },
  {
    id: "database-seed",
    title: "数据库种子数据",
    description: "生成项目初始种子数据",
    category: "数据库",
    prompt: `请生成数据库种子数据：

项目类型：{project_type}
数据库：{db_type}
数据表：{tables}

请提供：
1. seed 文件代码
2. 示例数据（5-10 条）
3. 执行说明`,
    tags: ["数据库", "Seed", "初始化"],
    isPremium: false,
  },
  {
    id: "vue-component",
    title: "Vue 组件生成",
    description: "生成 Vue 3 组件代码",
    category: "前端",
    prompt: `请生成 Vue 3 组件：

组件功能：{function}
UI 描述：{ui_description}

请提供：
1. Vue 组件代码（使用 Composition API）
2. TypeScript 类型定义
3. 样式代码
4. 使用示例`,
    tags: ["Vue", "前端", "组件"],
    isPremium: false,
  },
  {
    id: "api-mock",
    title: "API Mock 数据服务",
    description: "生成 API Mock 服务配置",
    category: "API",
    prompt: `请生成 API Mock 配置：

API 端点：{endpoints}
数据格式：{format}（JSON/GraphQL）
延迟设置：{delay}

请提供：
1. mock 服务配置
2. 示例响应数据
3. 使用说明`,
    tags: ["Mock", "API", "测试"],
    isPremium: false,
  },
  {
    id: "logger-config",
    title: "日志配置生成",
    description: "生成项目日志配置",
    category: "DevOps",
    prompt: `请生成日志配置：

技术栈：{tech_stack}
日志级别：{log_level}
输出目标：{output}（文件/控制台/远程）

请提供：
1. 日志配置文件
2. 日志格式模板
3. 日志轮转配置（如需要）
4. 最佳实践建议`,
    tags: ["日志", "监控", "DevOps"],
    isPremium: false,
  },
  {
    id: "k8s-manifest",
    title: "Kubernetes 配置生成",
    description: "生成 K8s 部署配置",
    category: "云服务",
    prompt: `请生成 K8s 配置：

应用类型：{app_type}
镜像：{image}
副本数：{replicas}
端口：{port}

请提供：
1. Deployment 配置
2. Service 配置
3. Ingress 配置
4. ConfigMap/Secret（如需要）`,
    tags: ["Kubernetes", "云", "容器"],
    isPremium: false,
  },
  {
    id: "data-pipeline",
    title: "数据处理脚本",
    description: "生成数据处理 Pipeline",
    category: "数据处理",
    prompt: `请生成数据处理脚本：

数据源：{data_source}
处理逻辑：{processing_logic}
输出格式：{output_format}

请提供：
1. 完整脚本代码
2. 依赖说明
3. 执行说明
4. 错误处理`,
    tags: ["数据处理", "ETL", "脚本"],
    isPremium: false,
  },
  // ============ 通用模板 ============
  {
    id: "summary-generate",
    title: "内容摘要生成",
    description: "快速生成文章/文档摘要",
    category: "效率工具",
    prompt: `请为以下内容生成摘要：

内容：
{content}

要求：
- 摘要长度：{length} 字
- 保留关键信息：是/否
- 目标读者：{audience}

请生成简洁的摘要。`,
    tags: ["摘要", "总结", "文档"],
    isPremium: false,
  },
  {
    id: "outline-generate",
    title: "大纲生成器",
    description: "根据主题生成文章大纲",
    category: "效率工具",
    prompt: `请为以下主题生成文章大纲：

主题：{topic}
文章类型：{type}（教程/博客/报告/演讲稿）
目标读者：{audience}
预期篇幅：{length}

请生成结构清晰的大纲，包含：
1. 标题
2. 主要章节
3. 每个章节的关键点`,
    tags: ["大纲", "写作", "规划"],
    isPremium: false,
  },
  {
    id: "email-compose",
    title: "邮件撰写助手",
    description: "根据需求撰写专业邮件",
    category: "效率工具",
    prompt: `请帮我撰写一封邮件：

收件人：{recipient}
邮件目的：{purpose}
邮件类型：{type}（商务/跟进/感谢/邀请/投诉）
关键信息：{key_points}
语气：{tone}（正式/友好/委婉）

请生成完整的邮件内容。`,
    tags: ["邮件", "沟通", "写作"],
    isPremium: false,
  },
  {
    id: "code-comment",
    title: "代码注释生成",
    description: "为代码添加清晰注释",
    category: "代码理解",
    prompt: `请为以下代码添加注释：

代码语言：{language}
代码：
\`\`\`{language}
{code}
\`\`\`

要求：
- 注释风格：{style}（简洁/详细）
- 重点解释：{focus}
- 文档格式：{format}（行注释/文档块）`,
    tags: ["注释", "文档", "代码"],
    isPremium: false,
  },
  {
    id: "sql-builder",
    title: "SQL 查询构建",
    description: "根据需求生成 SQL 查询",
    category: "数据库",
    prompt: `请生成 SQL 查询：

数据库类型：{db_type}（MySQL/PostgreSQL/MongoDB）
查询目标：{goal}
数据表：{tables}
条件：{conditions}
排序方式：{order_by}
限制条数：{limit}

请生成完整且高效的查询语句。`,
    tags: ["SQL", "数据库", "查询"],
    isPremium: false,
  },
  {
    id: "shell-script",
    title: "Shell 脚本生成",
    description: "快速生成 Shell 脚本",
    category: "工具",
    prompt: `请生成 Shell 脚本：

脚本功能：{function}
运行环境：{environment}（Linux/macOS）
输入参数：{parameters}
预期输出：{output}

请提供：
1. 完整脚本代码
2. 使用说明
3. 权限设置建议`,
    tags: ["Shell", "脚本", "自动化"],
    isPremium: false,
  },
  {
    id: "json-transform",
    title: "JSON 数据转换",
    description: "转换 JSON 数据格式",
    category: "工具",
    prompt: `请帮我转换 JSON 数据：

原始数据：
\`\`\`json
{input_json}
\`\`\`

转换要求：
- 目标格式：{target_format}
- 字段映射：{field_mapping}
- 需要添加的字段：{new_fields}

请生成转换后的 JSON 数据。`,
    tags: ["JSON", "数据转换", "ETL"],
    isPremium: false,
  },
  {
    id: "markdown-doc",
    title: "Markdown 文档生成",
    description: "根据提纲生成 Markdown 文档",
    category: "文档",
    prompt: `请生成 Markdown 文档：

文档标题：{title}
文档类型：{type}（README/教程/笔记/规范）
目标读者：{audience}
主要章节：{sections}

请生成格式规范、内容完整的 Markdown 文档。`,
    tags: ["Markdown", "文档", "写作"],
    isPremium: false,
  },
  {
    id: "api-test-case",
    title: "API 测试用例生成",
    description: "生成 API 自动化测试用例",
    category: "测试",
    prompt: `请生成 API 测试用例：

API 端点：{endpoint}
请求方法：{method}（GET/POST/PUT/DELETE）
请求参数：{parameters}
预期响应：{response}
认证方式：{auth}

请使用 {test_framework} 框架生成测试代码。`,
    tags: ["API", "测试", "自动化"],
    isPremium: false,
  },
  {
    id: "config-generator",
    title: "配置文件生成",
    description: "生成项目配置文件",
    category: "工具",
    prompt: `请生成配置文件：

配置类型：{config_type}（.env/tsconfig/eslint/prettier）
项目类型：{project_type}
框架：{framework}
特定要求：{requirements}

请生成符合最佳实践的配置文件。`,
    tags: ["配置", "开发环境", "工具"],
    isPremium: false,
  },
  // 付费模板 - 企业级
  {
    id: "enterprise-arch",
    title: "企业级系统架构设计",
    description: "设计高可用、高性能的系统架构（付费）",
    category: "架构",
    prompt: `请作为资深架构师，设计企业级系统架构：

项目类型：{project_type}（电商/金融/社交/教育）
用户规模：{scale}（1000/10万/100万/1000万）
技术栈：{tech_stack}
核心功能：{features}
可用性要求：{availability}（99.9%/99.99%）

请提供：
1. 系统架构图（ASCII）
2. 技术选型理由
3. 核心模块设计
4. 数据库设计建议
5. 扩展性方案
6. 容灾备份策略`,
    tags: ["架构", "企业级", "高并发"],
    isPremium: true,
  },
  {
    id: "microservice-design",
    title: "微服务拆分方案",
    description: "单体应用拆分微服务的完整方案（付费）",
    category: "架构",
    prompt: `请设计微服务拆分方案：

当前系统：{current_system}
技术栈：{tech_stack}
团队规模：{team_size}
业务复杂度：{complexity}

请提供：
1. 服务拆分原则
2. 服务边界定义
3. API 设计规范
4. 服务间通信方案
5. 数据一致性策略
6. 部署架构
7. 监控告警方案`,
    tags: ["微服务", "架构", "拆分"],
    isPremium: true,
  },
  {
    id: "security-audit",
    title: "安全审计报告",
    description: "生成完整的代码安全审计报告（付费）",
    category: "代码审查",
    prompt: `请进行代码安全审计：

代码语言：{language}
代码类型：{code_type}（API/前端/后端/移动端）
重点关注：{focus_areas}（认证/授权/数据加密/注入攻击）

审计维度：
1. OWASP Top 10 漏洞检查
2. 身份验证与授权
3. 敏感数据处理
4. 加密与密钥管理
5. 第三方依赖安全
6. 日志与监控

请生成详细的安全审计报告和修复建议。`,
    tags: ["安全", "审计", "OWASP"],
    isPremium: true,
  },
  {
    id: "performance-optimization",
    title: "性能优化方案",
    description: "完整的系统性能优化方案（付费）",
    category: "效率工具",
    prompt: `请制定性能优化方案：

当前问题：{problems}（慢响应/高延迟/卡顿）
系统类型：{system_type}
用户量：{users}
技术栈：{tech_stack}

请提供：
1. 性能瓶颈分析
2. 前端优化建议
3. 后端优化建议
4. 数据库优化
5. 缓存策略
6. CDN 配置
7. 监控指标
8. 预期提升效果`,
    tags: ["性能", "优化", "CDN"],
    isPremium: true,
  },
  {
    id: "ci-cd-pipeline",
    title: "企业级 CI/CD 流水线",
    description: "完整的 DevOps 流水线配置（付费）",
    category: "DevOps",
    prompt: `请设计企业级 CI/CD 流水线：

代码仓库：{repo}（GitHub/GitLab）
技术栈：{tech_stack}
部署目标：{deploy_to}（AWS/GCP/K8s）
团队规模：{team_size}

请提供：
1. 流水线阶段设计
2. 自动化测试策略
3. 代码质量检查
4. 安全扫描集成
5. 部署策略（蓝绿/金丝雀）
6. 回滚机制
7. 环境管理（dev/staging/prod）
8. GitOps 配置`,
    tags: ["DevOps", "CI/CD", "自动化"],
    isPremium: true,
  },
  {
    id: "database-design",
    title: "数据库设计完整方案",
    description: "从需求到实现的完整数据库设计（付费）",
    category: "数据库",
    prompt: `请设计完整数据库方案：

业务需求：{requirements}
数据量预估：{data_scale}
读写比例：{read_write_ratio}
一致性要求：{consistency}

请提供：
1. ER 图设计
2. 表结构定义
3. 索引策略
4. 分库分表方案
5. 数据迁移策略
6. 备份恢复方案
7. 性能优化建议`,
    tags: ["数据库", "设计", "ER图"],
    isPremium: true,
  },
];
