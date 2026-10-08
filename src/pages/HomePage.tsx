import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { learningAPI } from '../api/learning'
import type { Subject } from '../types'

const subjectColors: Record<string, string> = {
  chinese: 'from-red-400 to-red-500',
  math: 'from-teal-400 to-teal-500',
  english: 'from-blue-400 to-blue-500',
}

const subjectBgColors: Record<string, string> = {
  chinese: 'bg-red-50',
  math: 'bg-teal-50',
  english: 'bg-blue-50',
}

export default function HomePage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [coursesData, statsData] = await Promise.all([
          learningAPI.getCourses(),
          learningAPI.getStats(),
        ])
        setSubjects(coursesData as Subject[])
        setStats(statsData)
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse-soft">📚</div>
          <p className="text-xes-gray">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="text-6xl mb-4">🎓</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-xes-dark mb-4">
          欢迎来到<span className="text-xes-primary">智慧学堂</span>
        </h1>
        <p className="text-lg text-xes-gray max-w-2xl mx-auto">
          AI智能出题，个性化学习，让小学三年级的语文、数学、英语学习更有趣！
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="xes-card p-4 text-center animate-slide-up">
            <div className="text-3xl font-bold text-xes-primary">{stats.totalQuestions}</div>
            <div className="text-sm text-xes-gray mt-1">累计做题</div>
          </div>
          <div className="xes-card p-4 text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-3xl font-bold text-xes-success">{stats.correctRate}%</div>
            <div className="text-sm text-xes-gray mt-1">正确率</div>
          </div>
          <div className="xes-card p-4 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl font-bold text-xes-warning">{stats.wrongCount}</div>
            <div className="text-sm text-xes-gray mt-1">错题数</div>
          </div>
          <div className="xes-card p-4 text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-3xl font-bold text-xes-primary">{stats.avgScore}</div>
            <div className="text-sm text-xes-gray mt-1">平均分</div>
          </div>
        </div>
      )}

      {/* Subject Cards */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-xes-dark mb-6 flex items-center">
          <span className="mr-2">📚</span>
          选择科目开始学习
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <Link
              key={subject.id}
              to={`/subject/${subject.id}`}
              className={`${subjectBgColors[subject.id]} rounded-3xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-slide-up block`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subjectColors[subject.id]} flex items-center justify-center text-4xl mb-4`}>
                {subject.icon}
              </div>
              <h3 className="text-xl font-bold text-xes-dark mb-2">{subject.name}</h3>
              <p className="text-xes-gray text-sm mb-4">
                {subject.semesters.length}个学期 · {
                  subject.semesters.reduce((acc, s) => 
                    acc + s.units.reduce((a, u) => a + u.lessons.length, 0), 0
                  )
                }课时
              </p>
              <div className="flex items-center text-xes-primary font-medium">
                开始学习
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          to="/wrong-book"
          className="xes-card p-6 hover:shadow-lg transition-all animate-slide-up"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="text-4xl mb-3">📝</div>
          <h3 className="text-lg font-bold text-xes-dark mb-2">错题本</h3>
          <p className="text-xes-gray text-sm">复习错题，巩固薄弱知识点</p>
        </Link>
        <Link
          to="/ai-tutor"
          className="xes-card p-6 hover:shadow-lg transition-all animate-slide-up"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="text-4xl mb-3">🤖</div>
          <h3 className="text-lg font-bold text-xes-dark mb-2">AI答疑</h3>
          <p className="text-xes-gray text-sm">有问题随时问，AI老师在线解答</p>
        </Link>
        <Link
          to="/profile"
          className="xes-card p-6 hover:shadow-lg transition-all animate-slide-up"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="text-4xl mb-3">👤</div>
          <h3 className="text-lg font-bold text-xes-dark mb-2">个人中心</h3>
          <p className="text-xes-gray text-sm">查看学习记录和进步情况</p>
        </Link>
      </div>
    </div>
  )
}
