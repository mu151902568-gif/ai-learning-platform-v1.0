# 🎓 AI 智能学习平台

基于 AI 的新人培训学习平台，支持个性化智能学习、知识库管理、以及与 Obsidian 集成。

## ✨ 功能特性

### 🤖 AI 智能学习
- **个性化导师**：AI 根据你的学习进度和理解程度调整教学方式
- **图文并茂**：AI 自动生成相关图片和图表辅助理解
- **互动问答**：通过对话方式学习，随时提问
- **智能评估**：AI 实时评估你的掌握程度

### 📚 知识库管理
- **内置知识库**：预置企业文化、产品知识、规章制度等内容
- **分类管理**：按主题分类整理知识内容
- **标签系统**：灵活的标签体系便于检索
- **搜索功能**：快速找到需要的内容

### 🔗 Obsidian 集成（计划中）
- **直接连接**：连接同事的 Obsidian 知识库
- **实时同步**：自动同步 Obsidian 内容到平台
- **双向链接**：支持 Obsidian 的双向链接语法

### 🌋 火山引擎 Ark 集成
- **AI 对话**：使用 Ark 的大语言模型进行智能对话
- **图片生成**：AI 自动生成教学相关图片
- **灵活配置**：支持自定义模型参数

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 pnpm

### 安装步骤

1. **安装依赖**
```bash
npm install
# 或者使用 pnpm
pnpm install
```

2. **配置环境变量**
```bash
# 复制环境变量模板
cp .env.example .env
```

然后编辑 `.env` 文件，填入你的火山引擎 Ark 配置：
```env
VITE_ARK_API_KEY=your_api_key_here
VITE_ARK_BASE_URL=https://ark.cn-beijing.volces.com/api/v3
VITE_ARK_CHAT_MODEL=ep-20241208xxxxxx-doubao-pro-32k
VITE_ARK_IMAGE_MODEL=ep-20241208xxxxxx-image-generation
```

3. **启动开发服务**
```bash
# 仅启动前端
npm run dev

# 启动前端和后端（推荐）
npm run dev:all

# 仅启动后端 API 服务
npm run server
```

4. **访问应用**
- 前端地址：http://localhost:5173
- 后端 API：http://localhost:3001

## 📖 使用指南

### AI 智能学习
1. 点击左侧菜单的「AI 智能学习」
2. 选择你想学习的主题，或直接提问
3. AI 导师会根据知识库内容进行个性化教学
4. 与 AI 进行互动，随时提问和反馈

### 知识库管理
1. 在 AI 学习页面的右侧可以看到知识库列表
2. 点击知识库项目可以快速开始相关学习
3. 知识库支持分类和标签筛选

### 课程学习
1. 点击「课程学习」查看预置的课程
2. 按分类浏览课程内容
3. 追踪学习进度

## 🏗️ 项目结构

```
ai-learning-platform-v1.0/
├── src/
│   ├── pages/              # 页面组件
│   │   ├── AILearningPage.jsx    # AI 智能学习页面
│   │   ├── CoursePage.jsx        # 课程学习页面
│   │   └── ExamPage.jsx          # 考试测验页面
│   ├── services/           # 服务层
│   │   ├── arkService.js         # 火山引擎 Ark 服务
│   │   ├── aiTutorService.js     # AI 导师服务
│   │   └── knowledgeService.js   # 知识库服务
│   ├── App.jsx            # 主应用组件
│   └── main.jsx           # 应用入口
├── server.js              # 后端 API 服务
├── .env.example           # 环境变量模板
├── package.json           # 项目配置
└── README.md              # 项目说明
```

## 🔧 配置说明

### 火山引擎 Ark 配置

1. 登录 [火山引擎控制台](https://console.volcengine.com)
2. 进入「方舟（Ark）」服务
3. 创建一个接入点（Endpoint）
4. 获取 API Key 和接入点 ID
5. 填入 `.env` 文件

### Obsidian 配置（计划中）

1. 在 Obsidian 中安装「Local REST API」插件
2. 配置插件端口（默认 27123）
3. 在平台中配置连接信息

## 📡 API 接口

### 知识库相关

- `GET /api/knowledge` - 获取所有知识库文档
- `GET /api/knowledge/:id` - 获取单个文档
- `POST /api/knowledge/search` - 搜索知识库
- `POST /api/knowledge` - 添加文档
- `PUT /api/knowledge/:id` - 更新文档
- `DELETE /api/knowledge/:id` - 删除文档
- `GET /api/categories` - 获取分类列表

### AI 相关

- `POST /api/ai/chat` - AI 对话接口

### Obsidian 相关（计划中）

- `GET /api/obsidian/status` - 检查连接状态
- `POST /api/obsidian/connect` - 连接 Obsidian
- `POST /api/obsidian/sync` - 同步内容

## 🎯 技术栈

### 前端
- **React 18** - UI 框架
- **Ant Design 5** - UI 组件库
- **React Router 6** - 路由管理
- **Vite** - 构建工具

### 后端
- **Express.js** - Web 框架
- **CORS** - 跨域支持

### AI 服务
- **火山引擎 Ark** - 大语言模型服务
- **豆包模型** - 智能对话和图片生成

## 🗺️ 路线图

### v1.0 ✅（当前版本）
- [x] AI 智能学习基础功能
- [x] 内置知识库
- [x] 火山引擎 Ark 集成
- [x] 课程学习页面
- [x] 考试测验页面

### v1.1（开发中）
- [ ] Obsidian 连接功能
- [ ] 知识库管理界面
- [ ] 学习进度追踪
- [ ] 成就系统

### v2.0（计划中）
- [ ] 智能学习路径规划
- [ ] 知识图谱可视化
- [ ] 多人协作学习
- [ ] 移动端支持

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 📞 联系方式

如有问题或建议，请提交 Issue。

---

**祝你学习愉快！** 🎉
