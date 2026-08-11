import { useState } from 'react'
import { useTasks, type Task, type TaskWhen } from '../context/TaskContext'
import { useUser } from '../context/UserContext'
import { projects } from '../data/projects'

const sections: { when: TaskWhen; label: string }[] = [
  { when: 'today', label: 'Do today' },
  { when: 'upcoming', label: 'Do next week' },
  { when: 'later', label: 'Do later' },
]

export function Home() {
  const { user } = useUser()
  const { tasks, addTask, toggleTask, deleteTask } = useTasks()
  const [title, setTitle] = useState('')
  const [when, setWhen] = useState<TaskWhen>('today')
  const [projectSlug, setProjectSlug] = useState('')

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    addTask(title.trim(), when, projectSlug || undefined)
    setTitle('')
  }

  function handleWhenChange(nextWhen: TaskWhen) {
    setWhen(nextWhen)
  }

  function handleToggle(task: Task) {
    toggleTask(task.id)
  }

  const incomplete = tasks.filter((t) => !t.completed)
  const completed = tasks.filter((t) => t.completed)

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-stone-900">
        Good to see you, {user?.name ?? 'there'}
      </h1>
      <p className="mt-1 text-sm text-stone-500">Here's what's on your plate.</p>

      <form onSubmit={handleAdd} className="mt-8 flex gap-2">
        <input
          value={title}
          onChange={(e: { target: { value: any } }) => setTitle(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 rounded-md border border-stone-300 px-3 py-2 text-sm"
        />
        <select
          value={when}
          onChange={(e) => handleWhenChange(e.target.value as TaskWhen)}
          className="rounded-md border border-stone-300 px-2 py-2 text-sm"
        >
          <option value="today">Today</option>
          <option value="upcoming">Upcoming</option>
          <option value="later">Later</option>
        </select>
        <select
          value={projectSlug}
          onChange={(e) => setProjectSlug(e.target.value)}
          className="rounded-md border border-stone-300 px-2 py-2 text-sm"
        >
          <option value="">No project</option>
          {projects.map((project) => (
            <option key={project.slug} value={project.slug}>
              {project.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700"
        >
          Add
        </button>
      </form>

      <div className="mt-10 space-y-8">
        {sections.map((section) => {
          const sectionTasks = incomplete.filter((t) => t.when === section.when)
          if (sectionTasks.length === 0) return null
          return (
            <div key={section.when}>
              <h2 className="text-sm font-semibold text-stone-500">{section.label}</h2>
              <ul className="mt-3 divide-y divide-stone-200 border-y border-stone-200">
                {sectionTasks.map((task) => (
                  <li key={task.id} className="flex items-center gap-3 py-2.5">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggle(task)}
                      className="h-4 w-4 rounded border-stone-300"
                    />
                    <span className="flex-1 text-sm text-stone-900">
                      {task.title}
                      {task.projectSlug && (
                        <span className="ml-2 text-xs text-stone-400">
                          {projects.find((p) => p.slug === task.projectSlug)?.name}
                        </span>
                      )}
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
            </div>
          )
        })}

        {incomplete.length === 0 && (
          <p className="text-sm text-stone-500">Nothing on your list yet — add a task above.</p>
        )}

        {completed.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-stone-500">Completed</h2>
            <ul className="mt-3 divide-y divide-stone-200 border-y border-stone-200">
              {completed.map((task) => (
                <li key={task.id} className="flex items-center gap-3 py-2.5">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggle(task)}
                    className="h-4 w-4 rounded border-stone-300"
                  />
                  <span className="flex-1 text-sm text-stone-400 line-through">{task.title}</span>
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
          </div>
        )}
      </div>
    </div>
  )
}
