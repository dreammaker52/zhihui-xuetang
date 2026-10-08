import { useState, useEffect } from 'react'
import { learningAPI } from '../api/learning'
import type { Stats, StudyRecord } from '../types'

const subjectNames: Record<string, string> = {
  chinese: '语文',
  math: '数学',
  english: '英语',
}

export default function ProfilePage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [practiceRecords, setPracticeRecords] = useState<any[]>([])
  const [studyRecords, setStudyRecords] = useState<StudyRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'practice' | 'study'>('practice')

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, practiceData, studyData] = await Promise.all([
          learningAPI.getStats(),
          learningAPI.getPracticeRecords(10),
          learningAPI.getStudyRecords(20),
        ])
        setStats(statsData as Stats)
        setPracticeRecords((practiceData as any).records)
        setStudyRecords((studyData as any).records)
      } catch (error) {
        console.error('Failed to load profile:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse-soft">👤</div>
          <p className="text-xes-gray">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 用户信息卡片 */}
      <div className="xes-card p-6 mb-8 animate-fade-in">
        <div className="flex items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-xes-primary to-xes-secondary flex items-center justify-center text-4xl text-white mr-6">
            👦
          </div>
          <div>
            <h2 className="text-2xl font-bold text-xes-dark">小学三年级学生</h2>
            <p className="text-xes-gray">坚持学习，天天进步！</p>
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="xes-card p-4 text-center animate-slide-up">
            <div className="text-3xl font-bold text-xes-primary">{stats.totalPractices}</div>
            <div className="text-sm text-xes-gray mt-1">练习次数</div>
          </div>
          <div className="xes-card p-4 text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-3xl font-bold text-xes-secondary">{stats.totalQuestions}</div>
            <div className="text-sm text-xes-gray mt-1">累计做题</div>
          </div>
          <div className="xes-card p-4 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl font-bold text-xes-success">{stats.correctRate}%</div>
            <div className="text-sm text-xes-gray mt-1">正确率</div>
          </div>
          <div className="xes-card p-4 text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-3xl font-bold text-xes-warning">{stats.wrongCount}</div>
            <div className="text-sm text-xes-gray mt-1">错题数</div>
          </div>
        </div>
      )}

      {/* 正确率环形图 */}
      {stats && (
        <div className="xes-card p-6 mb-8 animate-slide-up">
          <h3 className="text-lg font-bold text-xes-dark mb-4">学习概览</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#FFE4D6"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth="3"
                  strokeDasharray={`${stats.correctRate}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-xes-primary">{stats.correctRate}%</span>
                <span className="text-sm text-xes-gray">正确率</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-xes-dark">{stats.totalCorrect}</p>
              <p className="text-sm text-xes-gray">答对题数</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-xes-dark">{stats.totalQuestions - stats.totalCorrect}</p>
              <p className="text-sm text-xes-gray">答错题数</p>
            </div>
          </div>
        </div>
      )}

      {/* 记录标签页 */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('practice')}
          className={`px-6 py-3 rounded-full font-medium transition-all ${
            activeTab === 'practice'
              ? 'bg-xes-primary text-white'
              : 'bg-white text-xes-gray hover:bg-xes-accent'
          }`}
        >
          📝 练习记录
        </button>
        <button
          onClick={() => setActiveTab('study')}
          className={`px-6 py-3 rounded-full font-medium transition-all ${
            activeTab === 'study'
              ? 'bg-xes-primary text-white'
              : 'bg-white text-xes-gray hover:bg-xes-accent'
          }`}
        >
          📖 学习记录
        </button>
      </div>

      {/* 记录列表 */}
      <div className="space-y-3">
        {activeTab === 'practice' ? (
          practiceRecords.length > 0 ? (
            practiceRecords.map((record, index) => (
              <div key={record.id} className="xes-card p-4 animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">
                      {record.subject === 'chinese' ? '📖' : record.subject === 'math' ? '🔢' : '🔤'}
                    </span>
                    <div>
                      <p className="font-medium text-xes-dark">{record.lessonTitle}</p>
                      <p className="text-sm text-xes-gray">{formatDate(record.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getScoreColor(record.score)}`}>{record.score}分</p>
                    <p className="text-sm text-xes-gray">
                      {record.correctCount}/{record.totalQuestions} 题
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 xes-card">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-xes-gray">暂无练习记录</p>
            </div>
          )
        ) : (
          studyRecords.length > 0 ? (
            studyRecords.map((record, index) => (
              <div key={record.id} className="xes-card p-4 animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">
                    {record.subject === 'chinese' ? '📖' : record.subject === 'math' ? '🔢' : '🔤'}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-xes-dark">{record.lessonTitle}</p>
                    <p className="text-sm text-xes-gray">
                      {subjectNames[record.subject]} · {formatDate(record.createdAt)}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-xes-accent text-xes-primary text-sm rounded-full">
                    {record.action === 'watch_video' ? '观看课程' : record.action}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 xes-card">
              <div className="text-4xl mb-4">📖</div>
              <p className="text-xes-gray">暂无学习记录</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}
