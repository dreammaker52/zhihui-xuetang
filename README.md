# 智慧学堂 - 小学三年级智能学习平台

对标学而思风格的学习网站，覆盖语文、数学、英语三科。题目由大模型基于课时知识点实时生成，无需题库导入。

## 功能

- **课程浏览**：学期 → 单元 → 课时三层结构，观看课程跳转国家中小学智慧教育平台
- **AI 出题**：按课时知识点生成单选/判断/填空题，附标准答案和解题步骤
- **AI 批改**：提交后自动批改打分，错题自动收录
- **错题本**：AI 讲解错题 + AI 生成变式练习
- **AI 答疑**：用小学生能看懂的语言讲解知识点
- **个人中心**：做题数、正确率环形图、学习/练习记录

## 技术栈

- 前端：React 18 + TypeScript + Vite + Tailwind CSS + React Router
- 后端：Express + better-sqlite3
- AI：兼容 OpenAI 格式的大模型 API（默认 DeepSeek），未配置 Key 时自动降级为内置模拟数据

## 本地运行

```bash
npm install

# 终端 1：后端（http://localhost:3001）
npm run server

# 终端 2：前端（http://localhost:5173）
npm run dev
```

## 配置大模型（可选）

```bash
# Windows PowerShell
$env:AI_API_KEY = "sk-你的key"
$env:AI_API_URL = "https://api.deepseek.com/v1/chat/completions"
$env:AI_MODEL = "deepseek-chat"
npm run server
```

不配置也能正常运行，AI 接口自动使用内置模拟数据。

## 生产部署

```bash
npm run build            # 构建前端到 dist/client
npm start                # 后端托管静态文件 + API，访问 http://localhost:3001
```

## 项目结构

```
├── index.html / vite.config.ts / tailwind.config.js
├── src/                  # 前端
│   ├── pages/            # 首页/科目/练习/错题本/个人中心/AI答疑
│   ├── components/       # 布局导航
│   ├── api/learning.ts   # API 客户端
│   └── types/            # TS 类型
└── server/               # 后端
    ├── courses.ts        # 课程数据（语数英三年级上下册）
    ├── db/               # SQLite（错题本/练习记录/学习记录）
    ├── services/aiService.ts  # 大模型调用 + 降级模拟
    └── routes/           # courses/practice/wrongBook/ai/stats
```
