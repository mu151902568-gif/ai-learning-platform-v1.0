/**
 * 火山引擎 Ark API 服务封装
 */
class ArkService {
  constructor() {
    this.apiKey = import.meta.env.VITE_ARK_API_KEY || '';
    this.baseUrl = import.meta.env.VITE_ARK_BASE_URL || 'https://ark.cn-beijing.volces.com/api/v3';
    this.chatModel = import.meta.env.VITE_ARK_CHAT_MODEL || '';
    this.imageModel = import.meta.env.VITE_ARK_IMAGE_MODEL || '';
    
    console.log('ArkService 初始化:', {
      baseUrl: this.baseUrl,
      hasApiKey: !!this.apiKey,
      chatModel: this.chatModel,
      imageModel: this.imageModel
    });
  }

  /**
   * AI 对话
   * @param {Array} messages - 对话消息数组
   * @param {Object} options - 配置选项
   * @returns {Promise<string>} AI 回复内容
   */
  async chat(messages, options = {}) {
    // 如果没有配置 API Key，返回模拟回复
    if (!this.apiKey || !this.chatModel) {
      console.warn('Ark API 未配置，使用模拟回复');
      return this.getMockResponse(messages);
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.chatModel,
          messages: messages,
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 2000,
          top_p: options.top_p || 0.9
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ark API 错误: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Ark 对话请求失败:', error);
      throw error;
    }
  }

  /**
   * 生成图片
   * @param {string} prompt - 图片描述
   * @returns {Promise<string>} 图片 URL
   */
  async generateImage(prompt) {
    // 如果没有配置 API Key，返回占位图
    if (!this.apiKey || !this.imageModel) {
      console.warn('Ark 图片生成未配置，使用占位图');
      return this.getMockImage(prompt);
    }

    try {
      const response = await fetch(`${this.baseUrl}/images/generations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.imageModel,
          prompt: prompt,
          n: 1,
          size: '1024x1024',
          response_format: 'url'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`图片生成失败: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data.data[0].url;
    } catch (error) {
      console.error('Ark 图片生成失败:', error);
      throw error;
    }
  }

  /**
   * 获取模拟回复（用于开发测试）
   */
  getMockResponse(messages) {
    const lastMessage = messages[messages.length - 1]?.content || '';
    
    if (lastMessage.includes('企业文化') || lastMessage.includes('文化')) {
      return `太棒了！让我来给你介绍我们的企业文化！🎯

**我们的核心价值观：**
1. **创新** 💡 - 鼓励尝试新方法
2. **协作** 🤝 - 强调团队合作
3. **卓越** 🏆 - 追求最高标准
4. **客户至上** 👥 - 始终以客户为中心

**公司使命：** 用技术创造更美好的生活

💡 **小问题**：这四个价值观中，你最认同哪一个？`;
    }
    
    if (lastMessage.includes('产品') || lastMessage.includes('功能')) {
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

🤔 你想先深入了解哪个模块？`;
    }

    return `好问题！让我想想怎么回答你... 🤔

基于我们的知识库，我来给你详细解释一下：

**关键点：**
1. 首先，要理解基本概念
2. 然后，看看实际应用
3. 最后，动手实践

💡 你想让我用更简单的方式再解释一遍吗？`;
  }

  /**
   * 获取模拟图片（用于开发测试）
   */
  getMockImage(prompt) {
    // 返回一个占位的图片描述
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#f0f5ff"/>
        <text x="200" y="150" text-anchor="middle" fill="#1890ff" font-size="16">
          🖼️ ${prompt.substring(0, 20)}...
        </text>
        <text x="200" y="180" text-anchor="middle" fill="#8c8c8c" font-size="12">
          (配置 Ark API 后生成真实图片)
        </text>
      </svg>
    `)}`;
  }

  /**
   * 检查服务是否已配置
   */
  isConfigured() {
    return !!(this.apiKey && this.chatModel);
  }
}

export default new ArkService();
