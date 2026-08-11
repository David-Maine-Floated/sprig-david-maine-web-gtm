import { Link, Navigate, useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import { useTasks } from '../context/TaskContext'

export function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  const { tasks, toggleTask, deleteTask } = useTasks()

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  const projectTasks = tasks.filter((t) => t.projectSlug === project.slug)

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <Link to="/projects" className="text-sm font-medium text-stone-500 hover:text-stone-900">
        ← Projects
      </Link>

      <div className="mt-4 flex items-center gap-2">
        <span className={`h-3 w-3 rounded-full ${project.color}`} />
        <h1 className="text-2xl font-semibold text-stone-900">{project.name}</h1>
      </div>
      <p className="mt-2 text-sm text-stone-500">{project.description}</p>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-stone-500">
          Tasks {projectTasks.length > 0 && `(${projectTasks.length})`}
        </h2>

        {projectTasks.length === 0 ? (
          <p className="mt-3 text-sm text-stone-500">
            No tasks assigned to this project yet — add one from the home page.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-stone-200 border-y border-stone-200">
            {projectTasks.map((task) => (
              <li key={task.id} className="flex items-center gap-3 py-2.5">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-4 w-4 rounded border-stone-300"
                />
                <span
                  className={`flex-1 text-sm ${
                    task.completed ? 'text-stone-400 line-through' : 'text-stone-900'
                  }`}
                >
                  {task.title}
                </span>
                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  className="text-xs text-stone-400 hover:text-stone-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
