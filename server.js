/**
 * AI 学习平台后端服务
 * 提供 API 接口和知识库管理
 */
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 模拟知识库
let knowledgeBase = [
  {
    id: '1',
    title: '企业文化介绍',
    content: `我们公司的核心价值观是：创新、协作、卓越、客户至上。

企业文化要点：
1. 创新精神：鼓励员工勇于尝试新方法
2. 团队协作：强调跨部门合作
3. 追求卓越：永不满足于现状
4. 客户导向：始终以客户需求为中心

公司使命：用技术创造更美好的生活
公司愿景：成为行业领先的创新型企业`,
    category: '企业文化',
    tags: ['价值观', '使命', '愿景'],
    difficulty: 'beginner',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: '产品功能详解',
    content: `我们的核心产品功能包括：

1. 智能分析模块：
   - 自动数据分析
   - 智能报告生成
   - 实时监控仪表板

2. 协作工具：
   - 团队工作区
   - 实时文档协作
   - 任务管理系统

3. 集成能力：
   - API 接口
   - 第三方应用集成
   - 数据导入导出

产品特色：简单易用、功能强大、安全可靠`,
    category: '产品知识',
    tags: ['功能', '特色', '技术'],
    difficulty: 'beginner',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: '员工行为准则',
    content: `员工行为准则：

1. 诚实守信：
   - 不说谎、不欺骗
   - 遵守承诺
   - 勇于承担责任

2. 专业敬业：
   - 保持专业素养
   - 持续学习提升
   - 追求工作质量

3. 团结友善：
   - 尊重同事
   - 乐于助人
   - 积极沟通

4. 保守机密：
   - 保护公司商业秘密
   - 不泄露客户信息
   - 遵守保密协议`,
    category: '规章制度',
    tags: ['行为', '准则', '规范'],
    difficulty: 'beginner',
    createdAt: new Date().toISOString()
  }
];

// ==================== 知识库 API ====================

// 获取所有知识库文档
app.get('/api/knowledge', (req, res) => {
  const { category, search, tag } = req.query;
  let results = [...knowledgeBase];

  if (category) {
    results = results.filter(doc => doc.category === category);
  }

  if (search) {
    const lowerSearch = search.toLowerCase();
    results = results.filter(doc => 
      doc.title.toLowerCase().includes(lowerSearch) ||
      doc.content.toLowerCase().includes(lowerSearch) ||
      doc.tags.some(tag => tag.toLowerCase().includes(lowerSearch))
    );
  }

  if (tag) {
    results = results.filter(doc => doc.tags.includes(tag));
  }

  res.json({
    success: true,
    data: results,
    total: results.length
  });
});

// 获取单个文档
app.get('/api/knowledge/:id', (req, res) => {
  const doc = knowledgeBase.find(d => d.id === req.params.id);
  
  if (!doc) {
    return res.status(404).json({
      success: false,
      message: '文档不存在'
    });
  }

  res.json({
    success: true,
    data: doc
  });
});

// 搜索知识库
app.post('/api/knowledge/search', (req, res) => {
  const { query, topK = 3 } = req.body;
  const lowerQuery = query.toLowerCase();

  const results = knowledgeBase
    .map(doc => {
      let score = 0;
      if (doc.title.toLowerCase().includes(lowerQuery)) score += 10;
      if (doc.content.toLowerCase().includes(lowerQuery)) score += 5;
      if (doc.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) score += 8;
      if (doc.category.toLowerCase().includes(lowerQuery)) score += 7;
      return { ...doc, score };
    })
    .filter(doc => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  res.json({
    success: true,
    data: results,
    query: query
  });
});

// 添加文档
app.post('/api/knowledge', (req, res) => {
  const { title, content, category, tags, difficulty } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: '标题和内容为必填项'
    });
  }

  const newDoc = {
    id: Date.now().toString(),
    title,
    content,
    category: category || '其他',
    tags: tags || [],
    difficulty: difficulty || 'beginner',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  knowledgeBase.push(newDoc);

  res.json({
    success: true,
    data: newDoc,
    message: '文档添加成功'
  });
});

// 更新文档
app.put('/api/knowledge/:id', (req, res) => {
  const index = knowledgeBase.findIndex(d => d.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: '文档不存在'
    });
  }

  knowledgeBase[index] = {
    ...knowledgeBase[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    data: knowledgeBase[index],
    message: '文档更新成功'
  });
});

// 删除文档
app.delete('/api/knowledge/:id', (req, res) => {
  const index = knowledgeBase.findIndex(d => d.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: '文档不存在'
    });
  }

  knowledgeBase.splice(index, 1);

  res.json({
    success: true,
    message: '文档删除成功'
  });
});

// 获取分类列表
app.get('/api/categories', (req, res) => {
  const categories = new Set();
  knowledgeBase.forEach(doc => categories.add(doc.category));
  
  res.json({
    success: true,
    data: Array.from(categories)
  });
});

// ==================== AI 相关 API ====================

// AI 对话接口
app.post('/api/ai/chat', async (req, res) => {
  const { messages, knowledgeContext } = req.body;

  // 模拟 AI 响应（实际项目中这里调用 Ark API）
  await new Promise(resolve => setTimeout(resolve, 800));

  const lastMessage = messages[messages.length - 1]?.content || '';
  let response;

  if (lastMessage.includes('企业文化') || lastMessage.includes('文化')) {
    response = `太棒了！让我来给你介绍我们的企业文化！🎯

**我们的核心价值观：**
1. **创新** 💡 - 鼓励尝试新方法
2. **协作** 🤝 - 强调团队合作
3. **卓越** 🏆 - 追求最高标准
4. **客户至上** 👥 - 始终以客户为中心

**公司使命：** 用技术创造更美好的生活

💡 **小问题**：这四个价值观中，你最认同哪一个？`;
  } else if (lastMessage.includes('产品') || lastMessage.includes('功能')) {
    response = `好的！让我来带你了解我们的产品！📦

**我们的产品主要有三大模块：**

1. **智能分析模块** 📊
   - 自动数据分析
   - 智能报告生成
   - 实时监控仪表板

2. **协作工具** 👥
   - 团队工作区
   - 实时文档协作
   - 任务管理系统

3. **集成能力** 🔗
   - API 接口
   - 第三方应用集成
   - 数据导入导出

🤔 你想先深入了解哪个模块？`;
  } else {
    response = `好问题！让我想想怎么回答你... 🤔

基于我们的知识库，我来给你详细解释一下：

**关键点：**
1. 首先，要理解基本概念
2. 然后，看看实际应用
3. 最后，动手实践

💡 你想让我用更简单的方式再解释一遍吗？`;
  }

  res.json({
    success: true,
    data: {
      role: 'assistant',
      content: response
    }
  });
});

// ==================== Obsidian 相关 API ====================

// 检查 Obsidian 连接状态
app.get('/api/obsidian/status', (req, res) => {
  res.json({
    success: true,
    data: {
      connected: false,
      configured: false,
      lastSync: null
    }
  });
});

// 连接 Obsidian
app.post('/api/obsidian/connect', (req, res) => {
  const { apiUrl, apiKey } = req.body;
  
  res.json({
    success: true,
    message: 'Obsidian 连接配置已保存',
    data: {
      connected: true,
      apiUrl: apiUrl
    }
  });
});

// 从 Obsidian 同步
app.post('/api/obsidian/sync', (req, res) => {
  res.json({
    success: true,
    message: '同步任务已启动',
    data: {
      syncedFiles: 0,
      newFiles: 0,
      updatedFiles: 0
    }
  });
});

// ==================== 健康检查 ====================

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'AI 学习平台后端服务运行正常',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🎓 AI 学习平台后端服务已启动                              ║
║                                                            ║
║   服务地址: http://localhost:${PORT}                        ║
║   API 文档: http://localhost:${PORT}/api/health             ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

export default app;
