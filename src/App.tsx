import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import SubjectPage from './pages/SubjectPage'
import PracticePage from './pages/PracticePage'
import WrongBookPage from './pages/WrongBookPage'
import ProfilePage from './pages/ProfilePage'
import AITutorPage from './pages/AITutorPage'

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subject/:subjectId" element={<SubjectPage />} />
          <Route path="/practice/:lessonId" element={<PracticePage />} />
          <Route path="/wrong-book" element={<WrongBookPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ai-tutor" element={<AITutorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}

export default App
