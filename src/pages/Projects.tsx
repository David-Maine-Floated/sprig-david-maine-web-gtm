import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { useTasks } from '../context/TaskContext'
import { useUser } from '../context/UserContext'
import { useSprigInit } from '../hooks/useSprigInit'

export function Projects() {
  useSprigInit()
  const { tasks } = useTasks()
  const { user } = useUser()

  function handleOpenProject(projectName: string) {
    window.Sprig('identifyAndTrack', {
      eventName: 'open_project',
      ...(user?.cid ? { userId: user.cid } : {}),
      properties: {
        project_name: projectName,
      },
    })
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-stone-900">Projects</h1>
      <p className="mt-1 text-sm text-stone-500">A quick look at what your team is working on.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project) => {
          const taskCount = tasks.filter((t) => t.projectSlug === project.slug).length
          return (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              onClick={() => handleOpenProject(project.name)}
              className="rounded-lg border border-stone-200 bg-white p-4 transition-colors hover:border-stone-300 hover:bg-stone-50"
            >
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${project.color}`} />
                <h2 className="text-sm font-medium text-stone-900">{project.name}</h2>
              </div>
              <p className="mt-2 text-xs text-stone-500">{taskCount} tasks</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
