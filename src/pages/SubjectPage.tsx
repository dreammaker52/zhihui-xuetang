import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { learningAPI } from '../api/learning'
import type { Subject, Semester, Lesson } from '../types'

export default function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>()
  const [subject, setSubject] = useState<Subject | null>(null)
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(null)
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSubject = async () => {
      try {
        const data = await learningAPI.getCourse(subjectId!)
        setSubject(data as Subject)
        if ((data as Subject).semesters.length > 0) {
          setSelectedSemester((data as Subject).semesters[0])
        }
      } catch (error) {
        console.error('Failed to load subject:', error)
      } finally {
        setLoading(false)
      }
    }
    loadSubject()
  }, [subjectId])

  const toggleUnit = (unitId: string) => {
    const newExpanded = new Set(expandedUnits)
    if (newExpanded.has(unitId)) {
      newExpanded.delete(unitId)
    } else {
      newExpanded.add(unitId)
    }
    setExpandedUnits(newExpanded)
  }

  // 国家中小学智慧教育平台各科目三年级上下册课程目录页 tag
  const COURSE_TAGS: Record<string, { upper: string; lower: string }> = {
    chinese: {
      upper: 'e7bbb2de-0590-11ed-9c79-92fc3b3249d5/e7bbd372-0590-11ed-9c79-92fc3b3249d5/6a749654-0772-11ed-ac74-092ab92074e6/44bee8bc-54e6-11ed-9c34-850ba61fa9f4/ff8080814371757b014390f883db0453/5136342961',
      lower: 'e7bbb2de-0590-11ed-9c79-92fc3b3249d5/e7bbd372-0590-11ed-9c79-92fc3b3249d5/6a749654-0772-11ed-ac74-092ab92074e6/44bee8bc-54e6-11ed-9c34-850ba61fa9f4/ff8080814371757b014390fcdce504bd/5136342961',
    },
    math: {
      upper: 'e7bbb2de-0590-11ed-9c79-92fc3b3249d5/e7bbd372-0590-11ed-9c79-92fc3b3249d5/e7bbcf80-0590-11ed-9c79-92fc3b3249d5/ff8080814371757b01437c363a187b0a/ff8080814371757b014390f883db0453/5136342961',
      lower: 'e7bbb2de-0590-11ed-9c79-92fc3b3249d5/e7bbd372-0590-11ed-9c79-92fc3b3249d5/e7bbcf80-0590-11ed-9c79-92fc3b3249d5/ff8080814371757b01437c363a187b0a/ff8080814371757b014390fcdce504bd/5136342961',
    },
    english: {
      upper: 'e7bbb2de-0590-11ed-9c79-92fc3b3249d5/e7bbd372-0590-11ed-9c79-92fc3b3249d5/6a7495dc-0772-11ed-ac74-092ab92074e6/44becd82-54e6-11ed-9c34-850ba61fa9f4/ff8080814371757b014390f883db0453/5136342961',
      lower: 'e7bbb2de-0590-11ed-9c79-92fc3b3249d5/e7bbd372-0590-11ed-9c79-92fc3b3249d5/6a7495dc-0772-11ed-ac74-092ab92074e6/44becd82-54e6-11ed-9c34-850ba61fa9f4/ff8080814371757b014390fcdce504bd/5136342961',
    },
  }

  const getCourseUrl = (lessonId: string) => {
    const parts = lessonId.split('-')
    if (parts.length < 2) return 'https://basic.smartedu.cn/'
    const semester = parts[1]
    const subjectKey = parts[0]
    const tag = COURSE_TAGS[subjectKey]?.[semester === '3a' ? 'upper' : 'lower']
    if (!tag) return 'https://basic.smartedu.cn/'
    return `https://basic.smartedu.cn/syncClassroom?defaultTag=${encodeURIComponent(tag)}`
  }

  const handleWatchVideo = (lesson: Lesson) => {
    learningAPI.recordStudy({
      subject: subjectId!,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      action: 'watch_video',
    })
    window.open(getCourseUrl(lesson.id), '_blank')
  }

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

  if (!subject) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4">😕</div>
        <p className="text-xes-gray">未找到该科目</p>
        <Link to="/" className="text-xes-primary mt-4 inline-block">返回首页</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center mb-8 animate-fade-in">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mr-4"
          style={{ backgroundColor: subject.color + '20' }}
        >
          {subject.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-xes-dark">{subject.name}</h1>
          <p className="text-xes-gray text-sm">小学三年级课程</p>
        </div>
      </div>

      {/* Semester Tabs */}
      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
        {subject.semesters.map((semester) => (
          <button
            key={semester.id}
            onClick={() => setSelectedSemester(semester)}
            className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
              selectedSemester?.id === semester.id
                ? 'bg-xes-primary text-white shadow-lg'
                : 'bg-white text-xes-gray hover:bg-xes-accent'
            }`}
          >
            {semester.title}
          </button>
        ))}
      </div>

      {/* Units */}
      {selectedSemester && (
        <div className="space-y-4">
          {selectedSemester.units.map((unit, unitIndex) => (
            <div key={unit.id} className="xes-card overflow-hidden animate-slide-up" style={{ animationDelay: `${unitIndex * 0.1}s` }}>
              {/* Unit Header */}
              <button
                onClick={() => toggleUnit(unit.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-xl bg-xes-accent flex items-center justify-center mr-4">
                    <span className="font-bold text-xes-primary">{unitIndex + 1}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-xes-dark">{unit.title}</h3>
                    <p className="text-sm text-xes-gray">{unit.lessons.length}课时</p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-xes-gray transition-transform ${expandedUnits.has(unit.id) ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Lessons */}
              {expandedUnits.has(unit.id) && (
                <div className="border-t">
                  {unit.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="px-6 py-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="text-sm text-xes-gray mr-2">
                              {unitIndex + 1}.{lessonIndex + 1}
                            </span>
                            <h4 className="font-medium text-xes-dark">{lesson.title}</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {lesson.knowledgePoints.map((kp, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-xes-accent text-xes-primary text-xs rounded-full"
                              >
                                {kp}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleWatchVideo(lesson)}
                            className="px-4 py-2 bg-xes-primary text-white rounded-full text-sm font-medium hover:bg-xes-secondary transition-colors flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            观看课程
                          </button>
                          <Link
                            to={`/practice/${lesson.id}?subject=${subjectId}&lessonTitle=${encodeURIComponent(lesson.title)}&knowledgePoints=${encodeURIComponent(JSON.stringify(lesson.knowledgePoints))}`}
                            className="px-4 py-2 border-2 border-xes-primary text-xes-primary rounded-full text-sm font-medium hover:bg-xes-primary hover:text-white transition-colors flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            开始练习
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
