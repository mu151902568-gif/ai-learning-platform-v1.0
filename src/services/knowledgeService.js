/**
 * 知识库服务
 * 用于管理和检索知识库内容，支持 Obsidian 集成
 */

// 模拟知识库数据（作为后备）
const mockKnowledgeBase = [
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
    source: 'builtin'
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
    source: 'builtin'
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
    source: 'builtin'
  },
  {
    id: '4',
    title: '组织架构说明',
    content: `公司组织架构：

1. 管理层：
   - CEO/总经理办公室
   - 各分管副总

2. 业务部门：
   - 产品部：负责产品规划和设计
   - 技术部：负责技术研发和维护
   - 运营部：负责日常运营和推广
   - 市场部：负责市场拓展和品牌
   - 销售部：负责客户开发和销售
   - 人力资源部：负责人力资源管理
   - 财务部：负责财务管理

3. 汇报关系：
   - 员工 → 部门经理 → 分管副总 → CEO`,
    category: '公司概况',
    tags: ['组织', '架构', '部门'],
    difficulty: 'beginner',
    source: 'builtin'
  },
  {
    id: '5',
    title: '考勤管理制度',
    content: `考勤管理制度：

1. 工作时间：
   - 周一至周五：9:00 - 18:00
   - 午休时间：12:00 - 13:00
   - 周末双休

2. 打卡规定：
   - 上下班需打卡
   - 迟到/早退：30分钟内算轻微，30分钟以上算严重
   - 忘记打卡可申请补卡

3. 请假制度：
   - 事假：提前申请，无薪
   - 病假：提供医院证明，带薪
   - 年假：按工作年限计算
   - 其他：婚假、产假等按国家规定

4. 加班规定：
   - 需提前申请
   - 可调休或算加班费
   - 周末加班优先调休`,
    category: '规章制度',
    tags: ['考勤', '请假', '加班'],
    difficulty: 'beginner',
    source: 'builtin'
  }
];

// Obsidian 相关配置
const OBSIDIAN_CONFIG = {
  apiUrl: import.meta.env.VITE_OBSIDIAN_API_URL || 'http://localhost:27123',
  enabled: import.meta.env.VITE_OBSIDIAN_ENABLED === 'true' || false
};

class KnowledgeService {
  constructor() {
    this.knowledgeBase = [...mockKnowledgeBase];
    this.obsidianFiles = []; // Obsidian 文件列表
    this.useObsidian = OBSIDIAN_CONFIG.enabled;
    this.obsidianConnected = false;
    this.isLoading = false;
  }

  /**
   * 检索相关知识（合并 Obsidian 和内置知识）
   * @param {string} query - 查询关键词
   * @param {number} topK - 返回结果数量
   * @returns {Array} 相关文档列表
   */
  retrieve(query, topK = 5) {
    if (!query || query.trim() === '') {
      // 返回所有知识的前 topK 个
      const allDocs = [...this.knowledgeBase, ...this.obsidianFiles];
      return allDocs.slice(0, topK);
    }

    const lowerQuery = query.toLowerCase();
    const allDocs = [...this.knowledgeBase, ...this.obsidianFiles];
    
    // 关键词匹配
    const results = allDocs
      .map(doc => {
        let score = 0;
        
        // 标题匹配
        if (doc.title.toLowerCase().includes(lowerQuery)) {
          score += 10;
        }
        
        // 内容匹配
        if (doc.content.toLowerCase().includes(lowerQuery)) {
          score += 5;
        }
        
        // 标签匹配
        if (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) {
          score += 8;
        }
        
        // 分类匹配
        if (doc.category && doc.category.toLowerCase().includes(lowerQuery)) {
          score += 7;
        }

        // Obsidian 文件路径匹配
        if (doc.path && doc.path.toLowerCase().includes(lowerQuery)) {
          score += 9;
        }

        return { ...doc, score };
      })
      .filter(doc => doc.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    return results;
  }

  /**
   * 根据ID获取文档
   * @param {string} id - 文档ID
   * @returns {Object|null} 文档
   */
  getById(id) {
    const allDocs = [...this.knowledgeBase, ...this.obsidianFiles];
    return allDocs.find(doc => doc.id === id) || null;
  }

  /**
   * 获取所有文档
   * @returns {Array} 所有文档
   */
  getAll() {
    return [...this.knowledgeBase, ...this.obsidianFiles];
  }

  /**
   * 获取分类列表
   * @returns {Array} 分类列表
   */
  getCategories() {
    const categories = new Set();
    const allDocs = [...this.knowledgeBase, ...this.obsidianFiles];
    allDocs.forEach(doc => {
      if (doc.category) {
        categories.add(doc.category);
      }
    });
    return Array.from(categories);
  }

  /**
   * 根据分类获取文档
   * @param {string} category - 分类名称
   * @returns {Array} 文档列表
   */
  getByCategory(category) {
    const allDocs = [...this.knowledgeBase, ...this.obsidianFiles];
    return allDocs.filter(doc => doc.category === category);
  }

  /**
   * 获取 Obsidian 文件
   * @returns {Array} Obsidian 文件列表
   */
  getObsidianFiles() {
    return [...this.obsidianFiles];
  }

  /**
   * 连接 Obsidian
   * @param {Object} config - Obsidian 配置
   */
  async connectObsidian(config = {}) {
    this.isLoading = true;
    try {
      const apiUrl = config.apiUrl || OBSIDIAN_CONFIG.apiUrl;
      
      console.log('正在连接 Obsidian:', apiUrl);
      
      // 测试连接
      const response = await fetch(`${apiUrl}/vault/files`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Obsidian 连接失败: ${response.status}`);
      }

      this.obsidianConnected = true;
      this.useObsidian = true;
      
      // 加载 Obsidian 文件
      await this.loadObsidianFiles(apiUrl);
      
      console.log('Obsidian 连接成功！');
      return { success: true, message: 'Obsidian 连接成功' };
    } catch (error) {
      console.error('Obsidian 连接失败:', error);
      this.obsidianConnected = false;
      
      // 连接失败时，提供模拟的 Obsidian 文件用于演示
      this.loadMockObsidianFiles();
      
      return { 
        success: false, 
        message: 'Obsidian 连接失败，使用演示数据',
        error: error.message 
      };
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * 从 Obsidian 加载文件
   */
  async loadObsidianFiles(apiUrl) {
    try {
      const response = await fetch(`${apiUrl}/vault/files`);
      const files = await response.json();
      
      this.obsidianFiles = files
        .filter(file => file.endsWith('.md'))
        .map((file, index) => ({
          id: `obsidian-${index}`,
          title: file.replace('.md', '').split('/').pop(),
          path: file,
          content: '', // 按需加载内容
          category: 'Obsidian',
          tags: ['obsidian'],
          source: 'obsidian',
          createdAt: new Date().toISOString()
        }));

      console.log(`已加载 ${this.obsidianFiles.length} 个 Obsidian 文件`);
    } catch (error) {
      console.error('加载 Obsidian 文件失败:', error);
      this.loadMockObsidianFiles();
    }
  }

  /**
   * 加载模拟的 Obsidian 文件（用于演示）
   */
  loadMockObsidianFiles() {
    this.obsidianFiles = [
      {
        id: 'obsidian-1',
        title: '产品规划文档',
        path: '产品/产品规划.md',
        content: `# 产品规划

## 产品愿景
打造行业领先的智能学习平台。

## 核心功能
1. 智能学习路径规划
2. 个性化推荐系统
3. 知识库管理
4. 数据分析面板

## 里程碑
- Q1: 基础功能完成
- Q2: AI 功能上线
- Q3: 商业化运营`,
        category: '产品规划',
        tags: ['产品', '规划', ' roadmap'],
        source: 'obsidian',
        createdAt: new Date().toISOString()
      },
      {
        id: 'obsidian-2',
        title: '技术架构设计',
        path: '技术/架构设计.md',
        content: `# 技术架构

## 前端技术栈
- React 18
- Ant Design
- Vite

## 后端技术栈
- Node.js + Express
- PostgreSQL
- Redis

## AI 集成
- 火山引擎 Ark
- RAG 检索增强生成
- 知识库向量化`,
        category: '技术架构',
        tags: ['技术', '架构', '设计'],
        source: 'obsidian',
        createdAt: new Date().toISOString()
      },
      {
        id: 'obsidian-3',
        title: '新人入职指南',
        path: '人力资源/新人入职.md',
        content: `# 新人入职指南

## 入职第一天
1. 办理入职手续
2. 领取办公设备
3. 配置开发环境
4. 了解团队成员

## 第一周目标
- 熟悉产品功能
- 了解技术架构
- 搭建开发环境
- 完成第一个小任务

## 培训计划
- 企业文化培训
- 产品知识培训
- 技术技能培训`,
        category: '人力资源',
        tags: ['入职', '培训', '新人'],
        source: 'obsidian',
        createdAt: new Date().toISOString()
      }
    ];

    console.log(`已加载 ${this.obsidianFiles.length} 个演示 Obsidian 文件`);
  }

  /**
   * 加载 Obsidian 文件内容
   * @param {string} fileId - 文件ID
   */
  async loadObsidianFileContent(fileId) {
    const file = this.obsidianFiles.find(f => f.id === fileId);
    if (!file) {
      throw new Error('文件不存在');
    }

    // 如果已有内容，直接返回
    if (file.content && file.content.length > 100) {
      return file.content;
    }

    if (!this.obsidianConnected) {
      return file.content;
    }

    try {
      const response = await fetch(
        `${OBSIDIAN_CONFIG.apiUrl}/vault/file/${encodeURIComponent(file.path)}`
      );
      const content = await response.text();
      
      file.content = content;
      return content;
    } catch (error) {
      console.error('加载 Obsidian 文件内容失败:', error);
      return file.content;
    }
  }

  /**
   * 断开 Obsidian 连接
   */
  disconnectObsidian() {
    this.useObsidian = false;
    this.obsidianConnected = false;
    this.obsidianFiles = [];
    console.log('已断开 Obsidian 连接');
  }

  /**
   * 从 Obsidian 同步内容
   */
  async syncFromObsidian() {
    if (!this.obsidianConnected) {
      throw new Error('Obsidian 未连接');
    }
    
    await this.loadObsidianFiles(OBSIDIAN_CONFIG.apiUrl);
    return { success: true, syncedFiles: this.obsidianFiles.length };
  }

  /**
   * 添加文档到知识库
   * @param {Object} doc - 文档对象
   */
  addDocument(doc) {
    const newDoc = {
      id: Date.now().toString(),
      ...doc,
      difficulty: doc.difficulty || 'beginner',
      source: 'builtin'
    };
    this.knowledgeBase.push(newDoc);
    return newDoc;
  }

  /**
   * 更新文档
   * @param {string} id - 文档ID
   * @param {Object} updates - 更新内容
   */
  updateDocument(id, updates) {
    const allDocs = [...this.knowledgeBase, ...this.obsidianFiles];
    const index = allDocs.findIndex(doc => doc.id === id);
    
    if (index !== -1) {
      if (index < this.knowledgeBase.length) {
        this.knowledgeBase[index] = {
          ...this.knowledgeBase[index],
          ...updates
        };
        return this.knowledgeBase[index];
      } else {
        const obsIndex = index - this.knowledgeBase.length;
        this.obsidianFiles[obsIndex] = {
          ...this.obsidianFiles[obsIndex],
          ...updates
        };
        return this.obsidianFiles[obsIndex];
      }
    }
    return null;
  }

  /**
   * 删除文档
   * @param {string} id - 文档ID
   */
  deleteDocument(id) {
    const index = this.knowledgeBase.findIndex(doc => doc.id === id);
    if (index !== -1) {
      this.knowledgeBase.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * 获取连接状态
   */
  getStatus() {
    return {
      obsidianConnected: this.obsidianConnected,
      useObsidian: this.useObsidian,
      obsidianFilesCount: this.obsidianFiles.length,
      builtinFilesCount: this.knowledgeBase.length,
      isLoading: this.isLoading
    };
  }
}

export default new KnowledgeService();
