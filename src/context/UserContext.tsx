import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type User = {
  name: string
  email: string
  cid: string
}

type UserContextValue = {
  user: User | null
  login: (user: Omit<User, 'cid'>) => User
  logout: () => void
}

const UserContext = createContext<UserContextValue | undefined>(undefined)
const STORAGE_KEY = 'flow-user'

function generateCid(): string {
  return Math.random().toString(36).slice(2, 10)
}

function readInitialUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readInitialUser)

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  function login(nextUser: Omit<User, 'cid'>) {
    const userWithCid = { ...nextUser, cid: generateCid() }
    setUser(userWithCid)
    return userWithCid
  }

  function logout() {
    setUser(null)
  }

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within a UserProvider')
  return ctx
}
