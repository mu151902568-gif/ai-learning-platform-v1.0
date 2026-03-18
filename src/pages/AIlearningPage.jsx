import React, { useState, useEffect } from 'react';
import { Card, Layout, Input, Button, message, List, Avatar, Spin, Modal, Tabs, Space, Select, Divider } from 'antd';
import { MessageOutlined, BookOutlined, CheckCircleOutlined, LoadingOutlined, FileTextOutlined, GithubOutlined } from '@ant-design/icons';
import './AIlearningPage.css';

const { Content, Sider } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const AIlearningPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: '你好！我是你的AI学习助手，有什么可以帮助你的吗？',
      sender: 'ai'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState([
    { id: 1, title: '企业文化', content: '公司的核心价值观和企业文化' },
    { id: 2, title: '考勤规则', content: '公司的考勤制度和请假流程' },
    { id: 3, title: '产品知识', content: '公司产品的功能和使用方法' },
    { id: 4, title: '运营知识', content: '运营策略和方法' },
    { id: 5, title: '四柱八字', content: '四柱八字的基本概念和应用' },
    { id: 6, title: '奇门遁甲', content: '奇门遁甲的基本原理和应用' }
  ]);
  const [selectedKnowledge, setSelectedKnowledge] = useState(null);
  const [progress, setProgress] = useState({
    totalCourses: 6,
    completedCourses: 2,
    totalLessons: 42,
    completedLessons: 15
  });
  const [obsidianConnected, setObsidianConnected] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // 添加用户消息
    const newMessage = {
      id: Date.now(),
      content: inputValue,
      sender: 'user'
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
    setLoading(true);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        content: `我收到了你的消息："${inputValue}"。这是一个模拟的AI回复，实际项目中会调用真实的AI API。`,
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1500);
  };

  const handleKnowledgeSelect = (knowledge) => {
    setSelectedKnowledge(knowledge);
    const newMessage = {
      id: Date.now(),
      content: `我想了解关于"${knowledge.title}"的内容`,
      sender: 'user'
    };
    setMessages([...messages, newMessage]);
    setLoading(true);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        content: `关于"${knowledge.title}"的内容：${knowledge.content}。这是一个模拟的AI回复，实际项目中会从知识库中检索相关信息。`,
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1000);
  };

  const handleConnectObsidian = () => {
    setLoading(true);
    // 模拟连接Obsidian
    setTimeout(() => {
      setObsidianConnected(true);
      setLoading(false);
      message.success('成功连接到Obsidian知识库');
    }, 1500);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={300} style={{ backgroundColor: '#f5f5f5' }}>
        <div className="knowledge-sidebar">
          <h3>学习进度</h3>
          <Card size="small" style={{ marginBottom: 16 }}>
            <div className="progress-item">
              <span>课程完成率</span>
              <span>{Math.round((progress.completedCourses / progress.totalCourses) * 100)}%</span>
            </div>
            <div className="progress-item">
              <span>课程总数</span>
              <span>{progress.completedCourses}/{progress.totalCourses}</span>
            </div>
            <div className="progress-item">
              <span>课时完成率</span>
              <span>{Math.round((progress.completedLessons / progress.totalLessons) * 100)}%</span>
            </div>
            <div className="progress-item">
              <span>课时总数</span>
              <span>{progress.completedLessons}/{progress.totalLessons}</span>
            </div>
          </Card>

          <h3>知识库</h3>
          <List
            size="small"
            dataSource={knowledgeBase}
            renderItem={item => (
              <List.Item
                key={item.id}
                onClick={() => handleKnowledgeSelect(item)}
                className="knowledge-item"
              >
                <List.Item.Meta
                  avatar={<BookOutlined />}
                  title={item.title}
                  description={item.content.substring(0, 30)}...
                />
              </List.Item>
            )}
          />

          <Divider style={{ margin: '16px 0' }} />
          <Button
            type={obsidianConnected ? 'primary' : 'default'}
            icon={obsidianConnected ? <CheckCircleOutlined /> : <FileTextOutlined />}
            onClick={handleConnectObsidian}
            disabled={obsidianConnected}
            style={{ width: '100%' }}
          >
            {obsidianConnected ? '已连接Obsidian' : '连接Obsidian'}
          </Button>
        </div>
      </Sider>

      <Content style={{ padding: '24px' }}>
        <Card title="AI智能学习助手" className="ai-chat-container">
          <div className="chat-messages">
            {messages.map(message => (
              <div key={message.id} className={`message ${message.sender}`}>
                <Avatar size={32} style={{ backgroundColor: message.sender === 'ai' ? '#1890ff' : '#52c41a' }}>
                  {message.sender === 'ai' ? 'AI' : '我'}
                </Avatar>
                <div className="message-content">
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="message ai">
                <Avatar size={32} style={{ backgroundColor: '#1890ff' }}>
                  <LoadingOutlined spin />
                </Avatar>
                <div className="message-content">
                  <p>AI正在思考...</p>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input">
            <TextArea
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="输入你的问题..."
              rows={3}
              onPressEnter={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button type="primary" onClick={handleSendMessage} disabled={loading}>
              发送
            </Button>
          </div>

          <div className="quick-select">
            <h4>快速选择</h4>
            <Space wrap>
              <Button size="small" onClick={() => handleKnowledgeSelect(knowledgeBase[0])}>企业文化</Button>
              <Button size="small" onClick={() => handleKnowledgeSelect(knowledgeBase[1])}>考勤规则</Button>
              <Button size="small" onClick={() => handleKnowledgeSelect(knowledgeBase[2])}>产品知识</Button>
              <Button size="small" onClick={() => handleKnowledgeSelect(knowledgeBase[3])}>运营知识</Button>
              <Button size="small" onClick={() => handleKnowledgeSelect(knowledgeBase[4])}>四柱八字</Button>
              <Button size="small" onClick={() => handleKnowledgeSelect(knowledgeBase[5])}>奇门遁甲</Button>
            </Space>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default AIlearningPage;