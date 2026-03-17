/**
 * AI 导师服务
 * 处理智能学习的核心逻辑
 */
import arkService from './arkService';
import knowledgeService from './knowledgeService';

// AI 导师系统提示词
const AI_TUTOR_SYSTEM_PROMPT = `你是一位专业、友好、有耐心的AI学习导师。你的任务是根据提供的知识库内容，帮助新员工学习。

教学原则：
1. 用简单易懂的语言解释概念
2. 结合例子说明，让内容更生动
3. 适时提问，检验用户理解
4. 保持鼓励和正向反馈
5. 循序渐进，不要一次给太多信息

回答要求：
- 语言口语化，避免太正式
- 适当使用emoji增加亲和力
- 结构清晰，分点说明
- 重要内容加粗强调
- 当需要图片辅助时，用 [GENERATE_IMAGE: 描述] 标记

当你发现用户理解困难时，尝试用不同角度解释。
当用户表现好时，给予积极鼓励！

记住：你是导师，不是搜索引擎。用教学的方式引导用户，而不是直接给答案。`;

class AITutorService {
  constructor() {
    this.conversationHistory = [];
    this.currentSession = null;
    this.learningProgress = {};
  }

  /**
   * 开始新的学习会话
   * @param {string} topic - 学习主题
   */
  startSession(topic = '') {
    this.currentSession = {
      id: Date.now().toString(),
      topic: topic,
      startTime: new Date(),
      steps: 0,
      masteryLevel: {}
    };
    
    this.conversationHistory = [
      {
        role: 'system',
        content: AI_TUTOR_SYSTEM_PROMPT
      }
    ];

    return this.currentSession;
  }

  /**
   * 发送消息给 AI 导师
   * @param {string} userMessage - 用户消息
   * @param {Object} options - 配置选项
   */
  async sendMessage(userMessage, options = {}) {
    // 1. 检索相关知识
    const relevantDocs = knowledgeService.retrieve(userMessage, 3);
    
    // 2. 构建知识上下文
    let knowledgeContext = '';
    if (relevantDocs.length > 0) {
      knowledgeContext = '【相关知识库内容】\n';
      relevantDocs.forEach((doc, index) => {
        knowledgeContext += `${index + 1}. 《${doc.title}》\n${doc.content}\n\n`;
      });
    }

    // 3. 构建用户消息（包含知识上下文）
    const enhancedUserMessage = knowledgeContext 
      ? `${knowledgeContext}\n【用户问题】${userMessage}`
      : userMessage;

    // 4. 添加到对话历史
    this.conversationHistory.push({
      role: 'user',
      content: enhancedUserMessage
    });

    // 5. 调用 AI（或模拟）
    let aiResponse;
    try {
      aiResponse = await arkService.chat(this.conversationHistory, {
        temperature: 0.8,
        max_tokens: 1500
      });
    } catch (error) {
      console.warn('AI 调用失败，使用内置逻辑:', error);
      aiResponse = this.getFallbackResponse(userMessage, relevantDocs);
    }

    // 6. 添加 AI 回复到历史
    this.conversationHistory.push({
      role: 'assistant',
      content: aiResponse
    });

    // 7. 更新会话进度
    if (this.currentSession) {
      this.currentSession.steps++;
    }

    // 8. 解析响应（提取图片生成请求等）
    const parsedResponse = this.parseResponse(aiResponse);

    return {
      content: aiResponse,
      parsed: parsedResponse,
      relevantDocs: relevantDocs
    };
  }

  /**
   * 解析 AI 响应
   * @param {string} response - AI 响应文本
   */
  parseResponse(response) {
    const result = {
      hasImageRequest: false,
      imagePrompts: [],
      hasQuestion: false,
      questions: []
    };

    // 检测图片生成请求
    const imageRegex = /\[GENERATE_IMAGE:\s*(.*?)\]/g;
    let match;
    while ((match = imageRegex.exec(response)) !== null) {
      result.hasImageRequest = true;
      result.imagePrompts.push(match[1]);
    }

    // 检测问题
    if (response.includes('？') || response.includes('?') || response.includes('考考你')) {
      result.hasQuestion = true;
    }

    return result;
  }

  /**
   * 备用响应逻辑（当 AI 不可用时）
   */
  getFallbackResponse(userMessage, relevantDocs) {
    const lowerMessage = userMessage.toLowerCase();
    
    // 基于关键词的响应
    if (lowerMessage.includes('企业文化') || lowerMessage.includes('文化')) {
      return this.getCultureResponse();
    }
    
    if (lowerMessage.includes('产品') || lowerMessage.includes('功能')) {
      return this.getProductResponse();
    }
    
    if (lowerMessage.includes('考勤') || lowerMessage.includes('请假')) {
      return this.getAttendanceResponse();
    }

    if (lowerMessage.includes('你好') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
      return `你好！👋 很高兴见到你！

我是你的AI学习导师，我可以帮你：
- 🏢 了解企业文化
- 📦 学习产品知识
- 📋 熟悉规章制度

**你想从哪里开始呢？**`;
    }

    // 默认响应
    if (relevantDocs.length > 0) {
      const doc = relevantDocs[0];
      return `好问题！让我根据知识库来回答你... 🤔

**${doc.title}**

${doc.content.substring(0, 300)}...

💡 想了解更多细节吗？继续问我！`;
    }

    return `好问题！让我想想怎么回答你... 🤔

虽然我现在没有直接的答案，但我们可以一起探讨！

**你可以试试：**
1. 换个方式提问
2. 问一些更具体的问题
3. 从基础概念开始

或者，你想先了解些什么？`;
  }

  /**
   * 企业文化响应
   */
  getCultureResponse() {
    return `太棒了！让我来给你介绍我们的企业文化！🎯

**我们的核心价值观：**
1. **创新** 💡 - 鼓励尝试新方法，包容失败
2. **协作** 🤝 - 强调跨部门合作，共同成长
3. **卓越** 🏆 - 追求最高标准，永不满足
4. **客户至上** 👥 - 始终以客户为中心

**公司使命：** 用技术创造更美好的生活
**公司愿景：** 成为行业领先的创新型企业

[GENERATE_IMAGE: 企业文化价值观架构图，四个核心价值观围绕中心使命]

💡 **小问题**：这四个价值观中，你最认同哪一个？为什么？`;
  }

  /**
   * 产品知识响应
   */
  getProductResponse() {
    return `好的！让我来带你了解我们的产品！📦

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

[GENERATE_IMAGE: 产品功能架构图，三个主要模块的关系图]

**产品特色：** 简单易用、功能强大、安全可靠

🤔 你想先深入了解哪个模块？`;
  }

  /**
   * 考勤制度响应
   */
  getAttendanceResponse() {
    return `好的！让我来介绍一下考勤制度！📋

**工作时间：**
- 周一至周五：9:00 - 18:00
- 午休：12:00 - 13:00
- 周末双休

**请假类型：**
1. **事假** - 提前申请，无薪
2. **病假** - 提供医院证明，带薪
3. **年假** - 按工作年限计算
4. **其他** - 婚假、产假等按国家规定

**打卡规定：**
- 上下班需打卡
- 迟到30分钟内算轻微
- 忘记打卡可申请补卡

💡 还有什么具体想了解的吗？比如请假流程？`;
  }

  /**
   * 评估用户回答
   * @param {string} userAnswer - 用户回答
   * @param {string} question - 问题
   */
  evaluateAnswer(userAnswer, question) {
    // 简单的评估逻辑
    const answer = userAnswer.toLowerCase();
    
    if (answer.length < 5) {
      return {
        score: 0.3,
        feedback: '你的回答有点短哦，能再说详细一点吗？',
        encouragement: '没关系，试着多说一点！'
      };
    }
    
    if (answer.includes('好') || answer.includes('对') || answer.includes('是')) {
      return {
        score: 0.8,
        feedback: '很好！你的理解很到位！',
        encouragement: '继续保持！👏'
      };
    }

    return {
      score: 0.6,
      feedback: '不错的想法！让我再补充一些内容...',
      encouragement: '继续思考，你会做得更好！'
    };
  }

  /**
   * 获取学习进度
   */
  getLearningProgress() {
    return {
      steps: this.currentSession?.steps || 0,
      topics: Object.keys(this.learningProgress),
      mastery: this.learningProgress
    };
  }

  /**
   * 重置会话
   */
  resetSession() {
    this.conversationHistory = [];
    this.currentSession = null;
  }

  /**
   * 获取对话历史
   */
  getConversationHistory() {
    return this.conversationHistory.filter(msg => msg.role !== 'system');
  }
}

export default new AITutorService();
