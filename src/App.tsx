import type { ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { ProjectDetail } from './pages/ProjectDetail'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Survey } from './pages/Survey'
import { useUser } from './context/UserContext'

function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useUser()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}

function App() {
  return (
    <div className="flex min-h-svh bg-stone-50 text-stone-900">
      <Sidebar />
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/projects"
            element={
              <RequireAuth>
                <Projects />
              </RequireAuth>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <RequireAuth>
                <ProjectDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/survey"
            element={
              <RequireAuth>
                <Survey />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
