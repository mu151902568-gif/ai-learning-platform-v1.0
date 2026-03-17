import React, { useState, useEffect, useRef } from 'react';
import { Layout, Card, Input, Button, Avatar, Typography, Spin, Alert, Tag, Progress, Space, Divider } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined, BookOutlined, BulbOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './AILearningPage.css';

const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

// 模拟知识库
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
    tags: ['价值观', '使命', '愿景']
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
    tags: ['功能', '特色', '技术']
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
    tags: ['行为', '准则', '规范']
  }
];

// AI 导师系统提示词
const AI_TUTOR_PROMPT = `你是一位专业、友好、有耐心的AI学习导师。你的任务是根据提供的知识库内容，帮助新员工学习。

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

当你发现用户理解困难时，尝试用不同角度解释。
当用户表现好时，给予积极鼓励！`;

const AILearningPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [learningProgress, setLearningProgress] = useState(0);
  const [currentTopic, setCurrentTopic] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef(null);

  // 自动滚动到消息底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 初始化欢迎消息
  useEffect(() => {
    const welcomeMessage = {
      id: 'welcome',
      role: 'assistant',
      content: `你好！👋 我是你的AI学习导师！很高兴见到你！

我可以根据公司的知识库，用生动有趣的方式带你学习：
- 🎯 企业文化
- 📦 产品知识
- 📋 规章制度

**你想从哪里开始？**
1. 了解企业文化
2. 学习产品功能
3. 其他内容（请告诉我）`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  // 检索相关知识库内容
  const retrieveKnowledge = (query) => {
    const lowerQuery = query.toLowerCase();
    const results = mockKnowledgeBase.filter(doc => 
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.content.toLowerCase().includes(lowerQuery) ||
      doc.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
    return results;
  };

  // 生成AI回复（模拟Ark调用）
  const generateAIResponse = async (userMessage) => {
    // 1. 检索相关知识
    const relevantDocs = retrieveKnowledge(userMessage);
    
    // 2. 构建提示词
    let knowledgeContext = '';
    if (relevantDocs.length > 0) {
      knowledgeContext = '相关知识库内容：\n';
      relevantDocs.forEach((doc, index) => {
        knowledgeContext += `${index + 1}. ${doc.title}\n${doc.content}\n\n`;
      });
    }

    // 3. 构建对话历史
    const conversationHistory = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // 4. 模拟AI回复（实际项目中替换为Ark API调用）
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let aiResponse = '';
    
    if (userMessage.includes('企业文化') || userMessage.includes('文化')) {
      aiResponse = `太棒了！让我来给你介绍我们的企业文化！🎯

**我们的核心价值观：**
1. **创新** 💡 - 鼓励尝试新方法
2. **协作** 🤝 - 强调团队合作
3. **卓越** 🏆 - 追求最高标准
4. **客户至上** 👥 - 始终以客户为中心

**公司使命：** 用技术创造更美好的生活

让我先给你看一个企业文化的示意图：

[在这里应该显示一张企业文化架构图]

💡 **小问题**：这四个价值观中，你最认同哪一个？为什么？`;
      setCurrentTopic('企业文化');
      setLearningProgress(25);
    } else if (userMessage.includes('产品') || userMessage.includes('功能')) {
      aiResponse = `好的！让我来带你了解我们的产品！📦

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

[产品功能架构图]

**产品特色：** 简单易用、功能强大、安全可靠

🤔 你想先深入了解哪个模块？`;
      setCurrentTopic('产品知识');
      setLearningProgress(30);
    } else if (userMessage.includes('1') || userMessage.includes('企业文化')) {
      aiResponse = `很好！让我们深入了解企业文化！🎯

**企业文化的四个维度：**

1️⃣ **创新精神**
- 鼓励试错，包容失败
- 奖励创新想法
- 持续改进流程

2️⃣ **团队协作**
- 打破部门壁垒
- 知识共享
- 共同成长

3️⃣ **追求卓越**
- 永不满足
- 持续学习
- 超越自我

4️⃣ **客户导向**
- 倾听客户声音
- 超越客户期望
- 建立长期关系

💪 **实践一下**：你能想到一个在工作中体现"创新"的例子吗？`;
      setLearningProgress(50);
    } else if (userMessage.includes('好') || userMessage.includes('对') || userMessage.includes('是')) {
      aiResponse = `太棒了！你的理解很到位！👏

**学习进度不错！** 继续保持这个势头！

让我们继续深入... 你还想了解：
1. 更多相关细节
2. 实际案例
3. 其他主题

请告诉我你的选择！`;
      setLearningProgress(prev => Math.min(prev + 10, 100));
    } else {
      aiResponse = `好问题！让我想想怎么回答你... 🤔

基于我们的知识库，我来给你详细解释一下：

**关键点：**
1. 首先，要理解基本概念
2. 然后，看看实际应用
3. 最后，动手实践

💡 你想让我用更简单的方式再解释一遍吗？或者你想看看实际例子？`;
    }

    return aiResponse;
  };

  // 发送消息
  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setShowWelcome(false);

    try {
      const aiResponse = await generateAIResponse(inputText);
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI 回复生成失败:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，我现在遇到了一些问题。请稍后再试！',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 快速选择
  const handleQuickSelect = (topic) => {
    setInputText(topic);
  };

  return (
    <div className="ai-learning-page">
      <div className="page-header">
        <div className="header-info">
          <Title level={2}>
            <RobotOutlined /> AI 智能学习导师
          </Title>
          <Text type="secondary">
            基于知识库的个性化学习体验
          </Text>
        </div>
        <div className="header-stats">
          <Card size="small" className="stat-card">
            <Space>
              <BulbOutlined style={{ color: '#1890ff', fontSize: 20 }} />
              <div>
                <Text type="secondary" style={{ fontSize: 12 }}>学习进度</Text>
                <Progress percent={learningProgress} size="small" status="active" />
              </div>
            </Space>
          </Card>
          {currentTopic && (
            <Tag color="blue" className="topic-tag">
              <BookOutlined /> {currentTopic}
            </Tag>
          )}
        </div>
      </div>

      <div className="learning-container">
        <div className="chat-area">
          <div className="messages-container">
            {messages.map((message, index) => (
              <div 
                key={message.id} 
                className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
              >
                <Avatar 
                  size={40} 
                  icon={message.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
                  className={message.role === 'user' ? 'user-avatar' : 'assistant-avatar'}
                />
                <div className="message-content">
                  <div className="message-bubble">
                    <div dangerouslySetInnerHTML={{ 
                      __html: message.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br />')
                        .replace(/\[.*?\]/g, (match) => {
                          if (match.includes('图')) {
                            return '<div style="background: #f0f5ff; padding: 40px; text-align: center; border-radius: 8px; margin: 16px 0; border: 2px dashed #91caff;"><span style="color: #1890ff;">🖼️ ' + match.replace(/\[|\]/g, '') + '</span></div>';
                          }
                          return match;
                        })
                    }} />
                  </div>
                  <div className="message-time">
                    {message.timestamp?.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message assistant-message">
                <Avatar size={40} icon={<RobotOutlined />} className="assistant-avatar" />
                <div className="message-content">
                  <div className="message-bubble">
                    <Spin size="small" /> 正在思考中...
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {showWelcome && (
            <div className="quick-select">
              <Divider>快速选择</Divider>
              <div className="quick-buttons">
                <Button type="dashed" onClick={() => handleQuickSelect('我想了解企业文化')}>
                  🏢 了解企业文化
                </Button>
                <Button type="dashed" onClick={() => handleQuickSelect('介绍一下产品功能')}>
                  📦 学习产品知识
                </Button>
                <Button type="dashed" onClick={() => handleQuickSelect('员工行为准则有哪些')}>
                  📋 查看规章制度
                </Button>
              </div>
            </div>
          )}

          <div className="input-area">
            <TextArea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="输入你的问题，或告诉我你想学什么..."
              autoSize={{ minRows: 2, maxRows: 6 }}
              disabled={isLoading}
            />
            <div className="input-actions">
              <Button 
                type="primary" 
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                size="large"
              >
                发送
              </Button>
            </div>
          </div>
        </div>

        <div className="sidebar">
          <Card title="📚 知识库" className="sidebar-card">
            <div className="knowledge-list">
              {mockKnowledgeBase.map((doc) => (
                <div 
                  key={doc.id} 
                  className="knowledge-item"
                  onClick={() => handleQuickSelect(`我想了解${doc.title}`)}
                >
                  <div className="knowledge-title">
                    <BookOutlined /> {doc.title}
                  </div>
                  <div className="knowledge-tags">
                    {doc.tags.map((tag, i) => (
                      <Tag key={i} size="small">{tag}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="💡 学习技巧" className="sidebar-card">
            <ul className="tips-list">
              <li><CheckCircleOutlined /> 从你感兴趣的主题开始</li>
              <li><CheckCircleOutlined /> 遇到问题随时提问</li>
              <li><CheckCircleOutlined /> 多做练习巩固知识</li>
              <li><CheckCircleOutlined /> 结合实际工作场景</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AILearningPage;
