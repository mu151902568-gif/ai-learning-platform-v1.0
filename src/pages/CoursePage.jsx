import React, { useState } from 'react';
import { Card, Row, Col, Tabs, Button, Progress, Badge, Tag, Modal, Space, Input, message } from 'antd';
import { PlayCircleOutlined, FileTextOutlined, CheckCircleOutlined, BookOutlined, VideoCameraOutlined, CheckOutlined, ImportOutlined } from '@ant-design/icons';
import './CoursePage.css';

const { TabPane } = Tabs;

const CoursePage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const [obsidianKey, setObsidianKey] = useState('0bc1fd393cb3d00b4c84206b4b4752adb37f67f0e96452fc34d54cc6d4a62a80');
  const [courses, setCourses] = useState([
    // 企业文化板块
    {
      id: 1,
      title: '企业文化培训',
      type: 'video',
      instructor: '张老师',
      duration: '4小时',
      progress: 80,
      category: '企业文化',
      level: '初级',
      description: '了解公司的核心价值观、使命愿景和企业文化，帮助新员工快速融入公司。',
      lessons: [
        { id: 1, title: '公司简介', type: 'video', duration: '30分钟', completed: true, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 2, title: '核心价值观', type: 'video', duration: '45分钟', completed: true, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 3, title: '组织架构', type: 'video', duration: '30分钟', completed: true, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 4, title: '企业文化案例', type: 'video', duration: '60分钟', completed: false, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 5, title: '企业文化练习', type: 'exercise', duration: '45分钟', completed: false },
        { id: 6, title: '企业文化案例分析', type: 'document', duration: '60分钟', completed: false, content: '通过实际案例分析，深入理解企业文化在企业发展中的作用和影响' },
        { id: 7, title: '企业文化考核', type: 'exam', duration: '30分钟', completed: false }
      ]
    },
    // 考勤规则板块
    {
      id: 2,
      title: '考勤规则学习',
      type: 'document',
      instructor: '王老师',
      duration: '2小时',
      progress: 100,
      category: '考勤规则',
      level: '初级',
      description: '学习公司的考勤制度、请假流程和相关规定，确保合规出勤。',
      lessons: [
        { id: 1, title: '考勤制度', type: 'document', duration: '30分钟', completed: true },
        { id: 2, title: '请假流程', type: 'document', duration: '30分钟', completed: true },
        { id: 3, title: '加班规定', type: 'document', duration: '30分钟', completed: true },
        { id: 4, title: '考勤规则练习', type: 'exercise', duration: '30分钟', completed: true },
        { id: 5, title: '考勤常见问题解答', type: 'document', duration: '30分钟', completed: true, content: '解答员工在考勤过程中常见的问题和疑问' },
        { id: 6, title: '考勤规则案例分析', type: 'document', duration: '30分钟', completed: true, content: '通过实际案例分析，深入理解考勤规则的应用' },
        { id: 7, title: '考勤规则考核', type: 'exam', duration: '20分钟', completed: true }
      ]
    },
    // 四柱八字板块
    {
      id: 3,
      title: '四柱八字基础',
      type: 'video',
      instructor: '李老师',
      duration: '6小时',
      progress: 45,
      category: '四柱八字',
      level: '初级',
      description: '学习四柱八字的基本概念、排盘方法和解读技巧。',
      lessons: [
        { id: 1, title: '四柱八字概述', type: 'video', duration: '45分钟', completed: true, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 2, title: '天干地支', type: 'video', duration: '60分钟', completed: true, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 3, title: '排盘方法', type: 'video', duration: '60分钟', completed: false, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 4, title: '十神解读', type: 'video', duration: '60分钟', completed: false, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 5, title: '四柱八字练习', type: 'exercise', duration: '60分钟', completed: false },
        { id: 6, title: '四柱八字案例分析', type: 'document', duration: '60分钟', completed: false, content: '通过实际案例分析，深入理解四柱八字的解读方法' },
        { id: 7, title: '四柱八字与职业发展', type: 'document', duration: '60分钟', completed: false, content: '探讨四柱八字与个人职业发展的关系' },
        { id: 8, title: '四柱八字考核', type: 'exam', duration: '45分钟', completed: false }
      ]
    },
    // 奇门遁甲板块
    {
      id: 4,
      title: '奇门遁甲入门',
      type: 'video',
      instructor: '刘老师',
      duration: '8小时',
      progress: 0,
      category: '奇门遁甲',
      level: '中级',
      description: '学习奇门遁甲的基本原理、起局方法和预测技巧。',
      lessons: [
        { id: 1, title: '奇门遁甲概述', type: 'video', duration: '45分钟', completed: false, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 2, title: '九宫八卦', type: 'video', duration: '60分钟', completed: false, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 3, title: '起局方法', type: 'video', duration: '90分钟', completed: false, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 4, title: '用神解读', type: 'video', duration: '90分钟', completed: false, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 5, title: '奇门遁甲练习', type: 'exercise', duration: '60分钟', completed: false },
        { id: 6, title: '奇门遁甲案例分析', type: 'document', duration: '90分钟', completed: false, content: '通过实际案例分析，深入理解奇门遁甲的应用方法' },
        { id: 7, title: '奇门遁甲与决策', type: 'document', duration: '60分钟', completed: false, content: '探讨奇门遁甲在决策中的应用' },
        { id: 8, title: '奇门遁甲考核', type: 'exam', duration: '60分钟', completed: false }
      ]
    },
    // 产品介绍板块
    {
      id: 5,
      title: '产品知识培训',
      type: 'mixed',
      instructor: '陈老师',
      duration: '5小时',
      progress: 60,
      category: '产品介绍',
      level: '初级',
      description: '了解公司产品的功能、特点、使用方法和销售技巧。',
      lessons: [
        { id: 1, title: '产品概述', type: 'video', duration: '45分钟', completed: true, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 2, title: '产品功能', type: 'video', duration: '60分钟', completed: true, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 3, title: '使用方法', type: 'document', duration: '60分钟', completed: true },
        { id: 4, title: '销售技巧', type: 'video', duration: '60分钟', completed: false, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 5, title: '产品知识练习', type: 'exercise', duration: '45分钟', completed: false },
        { id: 6, title: '产品案例分析', type: 'document', duration: '60分钟', completed: false, content: '通过实际案例分析，深入理解产品的应用场景和价值' },
        { id: 7, title: '产品销售技巧', type: 'document', duration: '60分钟', completed: false, content: '学习产品销售的核心技巧和方法' },
        { id: 8, title: '产品知识考核', type: 'exam', duration: '45分钟', completed: false }
      ]
    },
    // 运营知识学习板块
    {
      id: 6,
      title: '运营知识培训',
      type: 'mixed',
      instructor: '周老师',
      duration: '6小时',
      progress: 25,
      category: '运营知识',
      level: '中级',
      description: '学习运营的基本概念、策略、方法和工具，提升运营能力。',
      lessons: [
        { id: 1, title: '运营概述', type: 'video', duration: '45分钟', completed: true, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 2, title: '运营策略', type: 'video', duration: '60分钟', completed: true, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 3, title: '用户运营', type: 'document', duration: '60分钟', completed: false },
        { id: 4, title: '内容运营', type: 'document', duration: '60分钟', completed: false },
        { id: 5, title: '数据运营', type: 'video', duration: '60分钟', completed: false, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 6, title: '运营知识练习', type: 'exercise', duration: '45分钟', completed: false },
        { id: 7, title: '运营案例分析', type: 'document', duration: '60分钟', completed: false, content: '通过实际案例分析，深入理解运营策略的应用' },
        { id: 8, title: '运营工具使用', type: 'document', duration: '60分钟', completed: false, content: '学习常用运营工具的使用方法' },
        { id: 9, title: '运营知识考核', type: 'exam', duration: '45分钟', completed: false }
      ]
    },
    // 新人入职必修课
    {
      id: 7,
      title: '新人入职必修课',
      type: 'mixed',
      instructor: '综合讲师',
      duration: '12小时',
      progress: 0,
      category: '入职培训',
      level: '初级',
      description: '新员工入职必须完成的课程，涵盖企业文化、考勤规则、产品知识等核心内容。',
      lessons: [
        { id: 1, title: '公司简介与企业文化', type: 'video', duration: '60分钟', completed: false, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 2, title: '考勤规则与请假流程', type: 'document', duration: '45分钟', completed: false, content: '详细介绍公司的考勤制度、请假流程和相关规定' },
        { id: 3, title: '产品知识基础', type: 'video', duration: '60分钟', completed: false, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 4, title: '运营通用知识', type: 'document', duration: '60分钟', completed: false, content: '运营相关的基础知识和技能' },
        { id: 5, title: '四柱八字基础', type: 'video', duration: '90分钟', completed: false, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 6, title: '奇门遁甲入门', type: 'video', duration: '90分钟', completed: false, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 7, title: '入职综合练习', type: 'exercise', duration: '90分钟', completed: false },
        { id: 8, title: '入职考核', type: 'exam', duration: '60分钟', completed: false }
      ]
    }
  ]);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleStartLesson = (lesson) => {
    setCurrentLesson(lesson);
    if (lesson.type === 'video' && lesson.videoUrl) {
      setIsVideoModalVisible(true);
    }
  };

  const handleCompleteLesson = (courseId, lessonId) => {
    setCourses(prevCourses => {
      return prevCourses.map(course => {
        if (course.id === courseId) {
          const updatedLessons = course.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return { ...lesson, completed: true };
            }
            return lesson;
          });
          const completedLessons = updatedLessons.filter(lesson => lesson.completed).length;
          const progress = Math.round((completedLessons / updatedLessons.length) * 100);
          return { ...course, lessons: updatedLessons, progress };
        }
        return course;
      });
    });
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalVisible(false);
    if (currentLesson && selectedCourse) {
      handleCompleteLesson(selectedCourse.id, currentLesson.id);
    }
  };

  // 删除课程
  const handleDeleteCourse = (courseId) => {
    setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse(null);
    }
    message.success('课程已删除');
  };

  // 导入Obsidian内容
  const handleImportObsidian = () => {
    try {
      // 这里实现从Obsidian导入内容的功能
      // 由于浏览器安全限制，我们需要用户手动选择Obsidian Vault目录
      
      // 创建文件选择器
      const input = document.createElement('input');
      input.type = 'file';
      input.webkitdirectory = true;
      input.multiple = true;
      
      input.onchange = (e) => {
        const files = Array.from(e.target.files);
        const markdownFiles = files.filter(file => file.name.endsWith('.md'));
        
        if (markdownFiles.length === 0) {
          message.error('未找到Markdown文件，请选择包含Obsidian笔记的目录');
          return;
        }
        
        // 处理导入的Markdown文件
        const lessons = [];
        let index = 1;
        
        markdownFiles.forEach(file => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const content = event.target.result;
            lessons.push({
              id: index,
              title: file.name.replace('.md', ''),
              type: 'document',
              duration: '30分钟',
              completed: false,
              content: content
            });
            index++;
            
            // 当所有文件都处理完成后，创建课程
            if (lessons.length === markdownFiles.length) {
              const importedContent = {
                id: Date.now(),
                title: 'Obsidian导入课程',
                type: 'mixed',
                instructor: 'Obsidian',
                duration: `${Math.ceil(lessons.length * 0.5)}小时`,
                progress: 0,
                category: '导入课程',
                level: '初级',
                description: `从Obsidian导入的课程内容，包含${lessons.length}个笔记`,
                lessons: lessons
              };
              
              // 添加到课程列表
              setCourses(prevCourses => [...prevCourses, importedContent]);
              setIsImportModalVisible(false);
              message.success(`成功从Obsidian导入${lessons.length}个笔记！`);
            }
          };
          reader.readAsText(file);
        });
      };
      
      input.click();
    } catch (error) {
      message.error('导入Obsidian内容失败：' + error.message);
    }
  };

  const filteredCourses = courses.filter(course => {
    if (activeTab === 'all') return true;
    if (activeTab === 'in-progress') return course.progress > 0 && course.progress < 100;
    if (activeTab === 'completed') return course.progress === 100;
    if (activeTab === 'not-started') return course.progress === 0;
    return true;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return <PlayCircleOutlined />;
      case 'document': return <FileTextOutlined />;
      case 'exercise': return <CheckCircleOutlined />;
      case 'exam': return <CheckCircleOutlined />;
      default: return <BookOutlined />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return '#1890ff';
      case 'document': return '#52c41a';
      case 'exercise': return '#faad14';
      case 'exam': return '#f5222d';
      default: return '#722ed1';
    }
  };

  return (
    <div className="course-page">
      <div className="page-header">
        <h1>课程学习</h1>
        <Button 
          type="primary" 
          icon={<ImportOutlined />} 
          onClick={() => setIsImportModalVisible(true)}
        >
          导入Obsidian内容
        </Button>
      </div>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab} className="course-tabs">
        <TabPane tab="全部课程" key="all" />
        <TabPane tab="进行中" key="in-progress" />
        <TabPane tab="已完成" key="completed" />
        <TabPane tab="未开始" key="not-started" />
      </Tabs>

      <Row gutter={[16, 16]} className="course-list">
        {filteredCourses.map(course => (
          <Col xs={24} sm={12} md={8} key={course.id}>
            <Card 
              className={`course-card ${selectedCourse?.id === course.id ? 'selected' : ''}`}
              onClick={function() { handleCourseClick(course); }}
            >
              <div className="course-header">
                <Badge 
                  status={course.progress === 100 ? 'success' : course.progress > 0 ? 'processing' : 'default'}
                  text={course.progress === 100 ? '已完成' : `${course.progress}%`}
                />
                <Tag color={getTypeColor(course.type)}>{course.type === 'video' ? '视频' : course.type === 'document' ? '图文' : '互动'}</Tag>
              </div>
              <h3>{course.title}</h3>
              <p className="instructor">讲师：{course.instructor}</p>
              <p className="duration">时长：{course.duration}</p>
              <Progress percent={course.progress} size="small" style={{ margin: '16px 0' }} />
              <div className="course-footer">
                <Tag>{course.category}</Tag>
                <Tag color="blue">{course.level}</Tag>
                <Button 
                  type="text" 
                  danger 
                  size="small" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCourse(course.id);
                  }}
                >
                  删除
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedCourse && (
        <div className="course-detail">
          <Card title={selectedCourse.title} className="detail-card">
            <div className="course-info">
              <p><strong>讲师：</strong>{selectedCourse.instructor}</p>
              <p><strong>时长：</strong>{selectedCourse.duration}</p>
              <p><strong>分类：</strong>{selectedCourse.category}</p>
              <p><strong>难度：</strong>{selectedCourse.level}</p>
              <p><strong>描述：</strong>{selectedCourse.description}</p>
            </div>
            
            <h4>课程内容</h4>
            <div className="lessons-list">
              {selectedCourse.lessons.map(lesson => (
                <Card key={lesson.id} className="lesson-card">
                  <div className="lesson-header">
                    <div className="lesson-info">
                      <span className="lesson-icon" style={{ color: getTypeColor(lesson.type) }}>
                        {getTypeIcon(lesson.type)}
                      </span>
                      <span className="lesson-title">{lesson.title}</span>
                      <span className="lesson-duration">{lesson.duration}</span>
                    </div>
                    <Badge 
                      status={lesson.completed ? 'success' : 'default'}
                      text={lesson.completed ? '已完成' : '未完成'}
                    />
                  </div>
                  <div className="lesson-actions">
                    {lesson.content && (
                      <div className="lesson-content" style={{ marginBottom: 16 }}>
                        <p>{lesson.content}</p>
                      </div>
                    )}
                    <Button type="primary" size="small" onClick={function() { handleStartLesson(lesson); }}>
                      {lesson.completed ? '复习' : '开始学习'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      )}

      <Modal
        title={currentLesson?.title}
        open={isVideoModalVisible}
        onCancel={handleCloseVideoModal}
        footer={[
          <Button key="close" onClick={handleCloseVideoModal}>
            关闭
          </Button>,
          <Button key="complete" type="primary" onClick={handleCloseVideoModal}>
            标记为完成
          </Button>
        ]}
        width={800}
      >
        <div className="video-container">
          {currentLesson?.videoUrl && (
            <video 
              width="100%" 
              controls 
              autoPlay
            >
              <source src={currentLesson.videoUrl} type="video/mp4" />
              您的浏览器不支持视频播放。
            </video>
          )}
          <div className="lesson-info" style={{ marginTop: 16 }}>
            <p><strong>类型：</strong>{currentLesson?.type === 'video' ? '视频课程' : currentLesson?.type === 'document' ? '图文教程' : '互动练习'}</p>
            <p><strong>时长：</strong>{currentLesson?.duration}</p>
          </div>
        </div>
      </Modal>

      {/* Obsidian导入模态框 */}
      <Modal
        title="导入Obsidian内容"
        open={isImportModalVisible}
        onCancel={() => setIsImportModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsImportModalVisible(false)}>
            取消
          </Button>,
          <Button key="import" type="primary" onClick={handleImportObsidian}>
            导入
          </Button>
        ]}
        width={600}
      >
        <div className="import-form">
          <p>请输入Obsidian密钥，系统将自动导入相关内容</p>
          <Input
            placeholder="输入Obsidian密钥"
            value={obsidianKey}
            onChange={e => setObsidianKey(e.target.value)}
            style={{ margin: '16px 0' }}
          />
          <p>导入后，Obsidian中的内容将以新课程的形式添加到平台中</p>
        </div>
      </Modal>
    </div>
  );
};

export default CoursePage;