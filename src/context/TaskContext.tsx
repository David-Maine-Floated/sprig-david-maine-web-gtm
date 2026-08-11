import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type TaskWhen = 'today' | 'upcoming' | 'later'

export type Task = {
  id: string
  title: string
  when: TaskWhen
  completed: boolean
  projectSlug?: string
}

type TaskContextValue = {
  tasks: Task[]
  addTask: (title: string, when: TaskWhen, projectSlug?: string) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined)
const STORAGE_KEY = 'flow-tasks'

const seedTasks: Task[] = [
  { id: 'seed-1', title: 'Wireframe new homepage', when: 'today', completed: false, projectSlug: 'website-redesign' },
  { id: 'seed-2', title: 'Get design sign-off', when: 'upcoming', completed: true, projectSlug: 'website-redesign' },
  { id: 'seed-3', title: 'Audit page load performance', when: 'later', completed: false, projectSlug: 'website-redesign' },
  { id: 'seed-4', title: 'Draft campaign brief', when: 'today', completed: false, projectSlug: 'q3-marketing-plan' },
  { id: 'seed-5', title: 'Set Q3 ad spend budget', when: 'upcoming', completed: false, projectSlug: 'q3-marketing-plan' },
  { id: 'seed-6', title: 'Finalize App Store listing copy', when: 'today', completed: true, projectSlug: 'mobile-app-launch' },
  { id: 'seed-7', title: 'QA sign-off for v1.0', when: 'upcoming', completed: false, projectSlug: 'mobile-app-launch' },
  { id: 'seed-8', title: 'Fix crash on first launch', when: 'today', completed: false, projectSlug: 'mobile-app-launch' },
  { id: 'seed-9', title: 'Write onboarding email sequence', when: 'later', completed: false, projectSlug: 'customer-onboarding' },
  { id: 'seed-10', title: 'User test new signup flow', when: 'upcoming', completed: true, projectSlug: 'customer-onboarding' },
]

function readInitialTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const stored = raw ? (JSON.parse(raw) as Task[]) : []
    const storedIds = new Set(stored.map((t) => t.id))
    const missingSeeds = seedTasks.filter((t) => !storedIds.has(t.id))
    return [...missingSeeds, ...stored]
  } catch {
    return seedTasks
  }
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(readInitialTasks)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask(title: string, when: TaskWhen, projectSlug?: string) {
    const task: Task = {
      id: Math.random().toString(36).slice(2, 10),
      title,
      when,
      completed: false,
      projectSlug,
    }
    setTasks((prev) => [...prev, task])
  }

  function toggleTask(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks must be used within a TaskProvider')
  return ctx
}
