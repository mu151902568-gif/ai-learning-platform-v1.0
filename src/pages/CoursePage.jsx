import React, { useState } from 'react';
import { Card, Row, Col, Tabs, Button, Progress, Badge, Tag, Modal, Space } from 'antd';
import { PlayCircleOutlined, FileTextOutlined, CheckCircleOutlined, BookOutlined, VideoCameraOutlined, CheckOutlined } from '@ant-design/icons';
import './CoursePage.css';

const { TabPane } = Tabs;

const CoursePage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
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
      <h1>课程学习</h1>
      
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
    </div>
  );
};

export default CoursePage;