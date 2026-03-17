import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Layout, Menu, Button, Badge, Drawer, List, Avatar, Space } from 'antd';
import { BookOutlined, FileTextOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import CoursePage from './pages/CoursePage';
import ExamPage from './pages/ExamPage';
import './App.css';

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 模拟用户登录
    setUser({ name: '新员工', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait&image_size=square' });
  }, []);

  const menuItems = [
    { key: 'courses', icon: <BookOutlined />, label: '课程学习', path: '/courses' },
    { key: 'exams', icon: <FileTextOutlined />, label: '考试测验', path: '/exams' },
  ];

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          <div className="logo">AI学习平台</div>
          <div className="header-right">
            <Button 
              type="text" 
              icon={<MenuOutlined />} 
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(true)}
            />
            <Space size="middle">
              <Badge count={5} showZero>
                <Button type="text" icon={<MessageOutlined />} />
              </Badge>
              {user && (
                <div className="user-info">
                  <Avatar src={user.avatar}>{user.name[0]}</Avatar>
                  <span className="user-name">{user.name}</span>
                </div>
              )}
            </Space>
          </div>
        </Header>
        
        <Layout>
          <Sider 
            collapsible 
            collapsed={collapsed} 
            onCollapse={setCollapsed}
            className="sidebar"
            breakpoint="lg"
            collapsedWidth="80"
            width="200"
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['home']}
              style={{ height: '100%', borderRight: 0 }}
              items={menuItems.map(item => ({
                key: item.key,
                icon: item.icon,
                label: <Link to={item.path}>{item.label}</Link>
              }))}
            />
          </Sider>
          
          <Content className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/courses" replace />} />
              <Route path="/courses" element={<CoursePage />} />
              <Route path="/exams" element={<ExamPage />} />
              <Route path="*" element={<Navigate to="/courses" replace />} />
            </Routes>
          </Content>
        </Layout>
        
        {/* 移动端菜单抽屉 */}
        <Drawer
          title="菜单"
          placement="right"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            mode="vertical"
            style={{ height: '100%' }}
            items={menuItems.map(item => ({
              key: item.key,
              icon: item.icon,
              label: <Link to={item.path} onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>
            }))}
          />
        </Drawer>
      </Layout>
    </Router>
  );
}

export default App;