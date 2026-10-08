import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/subject/chinese', label: '语文', icon: '📖' },
  { path: '/subject/math', label: '数学', icon: '🔢' },
  { path: '/subject/english', label: '英语', icon: '🔤' },
  { path: '/wrong-book', label: '错题本', icon: '📝' },
  { path: '/ai-tutor', label: 'AI答疑', icon: '🤖' },
  { path: '/profile', label: '个人中心', icon: '👤' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl">🎓</span>
              <span className="text-xl font-bold text-xes-primary hidden sm:block">
                智慧学堂
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || 
                  (item.path !== '/' && location.pathname.startsWith(item.path))
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                      isActive
                        ? 'bg-xes-primary text-white'
                        : 'text-xes-gray hover:bg-xes-accent'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-xes-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path ||
                  (item.path !== '/' && location.pathname.startsWith(item.path))
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? 'bg-xes-primary text-white'
                        : 'text-xes-gray hover:bg-xes-accent'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-xes-gray">
            <p>🎓 智慧学堂 - 让学习更有趣</p>
            <p className="mt-2">AI驱动的智能学习平台 | 语文 · 数学 · 英语</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
