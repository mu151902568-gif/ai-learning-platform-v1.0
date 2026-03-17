import React, { useState, useEffect } from 'react';
import { Card, List, Button, Progress, Radio, Modal, Result } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import './ExamPage.css';

const { Group } = Radio;

const ExamPage = () => {
  const [exams, setExams] = useState([
    {
      id: 1,
      title: '企业文化知识测验',
      description: '测试对公司企业文化的了解程度',
      duration: 30,
      questions: 20,
      status: 'completed',
      score: 85,
      passingScore: 70,
      date: '2026-03-12'
    },
    {
      id: 2,
      title: '业务基础知识测验',
      description: '测试对公司业务基础知识的掌握程度',
      duration: 45,
      questions: 30,
      status: 'pending',
      score: 0,
      passingScore: 75,
      date: '2026-03-15'
    },
    {
      id: 3,
      title: '考勤规则测验',
      description: '测试对公司考勤规则的了解程度',
      duration: 20,
      questions: 15,
      status: 'completed',
      score: 100,
      passingScore: 80,
      date: '2026-03-11'
    }
  ]);

  const [currentExam, setCurrentExam] = useState(null);
  const [isExamModalVisible, setIsExamModalVisible] = useState(false);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question: '公司的核心价值观是什么？',
      options: ['客户第一，员工第二，股东第三', '员工第一，客户第二，股东第三', '股东第一，客户第二，员工第三', '客户第一，股东第二，员工第三'],
      correctAnswer: '客户第一，员工第二，股东第三'
    },
    {
      id: 2,
      question: '公司成立于哪一年？',
      options: ['2010年', '2012年', '2014年', '2016年'],
      correctAnswer: '2014年'
    },
    {
      id: 3,
      question: '公司的使命是什么？',
      options: ['让天下没有难做的生意', '让生活更美好', '让工作更高效', '让学习更简单'],
      correctAnswer: '让天下没有难做的生意'
    }
  ];

  useEffect(function() {
    let timer;
    if (isExamModalVisible && timeLeft > 0) {
      timer = setInterval(function() {
        setTimeLeft(function(prev) { return prev - 1; });
      }, 1000);
    } else if (timeLeft === 0 && isExamModalVisible) {
      handleSubmit();
    }
    return function() { clearInterval(timer); };
  }, [isExamModalVisible, timeLeft]);

  const handleStartExam = function(exam) {
    setCurrentExam(exam);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeLeft(exam.duration * 60);
    setIsExamModalVisible(true);
  };

  const handleAnswerChange = function(questionId, value) {
    setAnswers(function(prev) {
      return {
        ...prev,
        [questionId]: value
      };
    });
  };

  const handleNext = function() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(function(prev) { return prev + 1; });
    }
  };

  const handlePrevious = function() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(function(prev) { return prev - 1; });
    }
  };

  const handleSubmit = function() {
    let correctCount = 0;
    questions.forEach(function(question) {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    setScore(calculatedScore);
    setIsExamModalVisible(false);
    setIsResultModalVisible(true);
    
    setExams(exams.map(function(exam) {
      if (exam.id === currentExam.id) {
        return { ...exam, status: 'completed', score: calculatedScore, date: new Date().toISOString().split('T')[0] };
      }
      return exam;
    }));
  };

  const formatTime = function(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="exam-page">
      <div className="page-header">
        <h1>考试测验</h1>
      </div>

      <List
        dataSource={exams}
        renderItem={function(exam) {
          return (
            <Card key={exam.id} className="exam-card">
              <div className="exam-header">
                <h3>{exam.title}</h3>
                <div className="exam-status">
                  {exam.status === 'completed' ? (
                    <span className="status completed">
                      <CheckCircleOutlined /> 已完成
                    </span>
                  ) : (
                    <span className="status pending">
                      <WarningOutlined /> 待完成
                    </span>
                  )}
                </div>
              </div>
              <p className="exam-description">{exam.description}</p>
              <div className="exam-info">
                <div className="info-item">
                  <ClockCircleOutlined /> 时长: {exam.duration}分钟
                </div>
                <div className="info-item">
                  题目: {exam.questions}题
                </div>
                <div className="info-item">
                  及格分: {exam.passingScore}分
                </div>
              </div>
              {exam.status === 'completed' && (
                <div className="exam-result">
                  <Progress 
                    percent={exam.score} 
                    status={exam.score >= exam.passingScore ? 'success' : 'exception'} 
                  />
                  <div className="score-info">
                    得分: <span className={exam.score >= exam.passingScore ? 'score-pass' : 'score-fail'}>{exam.score}</span>分
                    {exam.date && <span className="exam-date"> (完成于: {exam.date})</span>}
                  </div>
                </div>
              )}
              <div className="exam-actions">
                {exam.status === 'pending' ? (
                  <Button type="primary" onClick={function() { handleStartExam(exam); }}>
                    开始考试
                  </Button>
                ) : (
                  <Button type="default">
                    查看详情
                  </Button>
                )}
              </div>
            </Card>
          );
        }}
      />

      <Modal
        title={currentExam?.title}
        open={isExamModalVisible}
        footer={null}
        width={800}
      >
        <div className="exam-modal">
          <div className="exam-timer">
            <ClockCircleOutlined /> 剩余时间: {formatTime(timeLeft)}
          </div>
          <div className="question-progress">
            第 {currentQuestionIndex + 1} 题 / 共 {questions.length} 题
          </div>
          <div className="question-content">
            <h4>{questions[currentQuestionIndex]?.question}</h4>
            <Group onChange={function(e) { handleAnswerChange(questions[currentQuestionIndex]?.id, e.target.value); }}>
              {questions[currentQuestionIndex]?.options.map(function(option, index) {
                return (
                  <Radio key={index} value={option}>
                    {option}
                  </Radio>
                );
              })}
            </Group>
          </div>
          <div className="exam-navigation">
            <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
              上一题
            </Button>
            {currentQuestionIndex === questions.length - 1 ? (
              <Button type="primary" onClick={handleSubmit}>
                提交
              </Button>
            ) : (
              <Button type="primary" onClick={handleNext}>
                下一题
              </Button>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        title="考试结果"
        open={isResultModalVisible}
        onCancel={function() { setIsResultModalVisible(false); }}
        footer={null}
      >
        <Result
          status={score >= currentExam?.passingScore ? 'success' : 'error'}
          title={score >= currentExam?.passingScore ? '考试通过！' : '考试未通过'}
          subTitle={`你的得分: ${score}分，及格分: ${currentExam?.passingScore}分`}
          extra={[
            <Button key="close" type="primary" onClick={function() { setIsResultModalVisible(false); }}>
              关闭
            </Button>
          ]}
        />
      </Modal>
    </div>
  );
};

export default ExamPage;