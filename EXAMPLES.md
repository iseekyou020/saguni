# DevPrompt 使用示例

> 展示每个模板的实际使用效果

---

## 🔍 代码解释器

### 输入

```markdown
请解释以下 JavaScript 代码：

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```
```

### 输出

这段代码实现了**斐波那契数列**的递归计算。

**功能：**
- 计算第 n 个斐波那契数

**核心逻辑：**
- 基础条件：`n <= 1` 时直接返回 n
- 递归公式：`F(n) = F(n-1) + F(n-2)`

**优化建议：**
- 使用记忆化递归避免重复计算
- 或改用迭代方式（性能更好）

---

## 🐛 Bug 调试助手

### 输入

```markdown
请帮我修复以下 Bug：

错误信息：TypeError: Cannot read property 'map' of undefined

代码：
```javascript
const users = getUsers();
const names = users.map(u => u.name);
```
```

### 输出

**Bug 原因：**
`getUsers()` 返回了 `undefined`，而不是数组

**修复方案：**
```javascript
const users = getUsers() || [];
const names = users.map(u => u.name);
```

**建议：**
1. 添加空值检查
2. 使用 Optional Chaining：
```javascript
const names = users?.map(u => u.name) || [];
```

---

## 🧪 单元测试生成

### 输入

```markdown
为以下代码生成 Jest 测试：

```javascript
function add(a, b) {
  return a + b;
}
```
```

### 输出

```javascript
describe('add', () => {
  it('should add two positive numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should add negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });

  it('should handle zero', () => {
    expect(add(5, 0)).toBe(5);
  });
});
```

---

## 📐 正则表达式生成

### 输入

```markdown
请生成正则表达式：

需求：验证中国大陆手机号

示例：
- 13812345678 ✅
- 12345678901 ❌
```

### 输出

**正则表达式：**
```regex
^1[3-9]\d{9}$
```

**解释：**
- `^` - 字符串开始
- `1` - 以 1 开头
- `[3-9]` - 第二位是 3-9
- `\d{9}` - 后面跟 9 位数字
- `$` - 字符串结束

**使用示例：**
```javascript
const phoneRegex = /^1[3-9]\d{9}$/;
phoneRegex.test('13812345678'); // true
```

---

## 🐳 Docker 配置生成

### 输入

```markdown
生成 Dockerfile：

技术栈：Node.js 20
端口：3000
入口：npm start
```

### 输出

```dockerfile
# 使用官方 Node 镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["npm", "start"]
```

---

## ⚛️ React 组件生成

### 输入

```markdown
生成 React 组件：

功能：用户卡片
需要显示：头像、姓名、邮箱
```

### 输出

```tsx
interface UserCardProps {
  avatar: string;
  name: string;
  email: string;
}

export function UserCard({ avatar, name, email }: UserCardProps) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} className="avatar" />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}
```

---

*更多示例持续添加中...*
