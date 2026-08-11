import { Link, NavLink } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/survey', label: 'Survey' },
]

export function Sidebar() {
  const { user, logout } = useUser()

  return (
    <aside className="flex h-svh w-56 flex-shrink-0 flex-col border-r border-stone-200 bg-stone-100 px-4 py-6">
      <Link to="/" className="px-2 text-lg font-semibold tracking-tight text-stone-900">
        Flow
      </Link>

      <nav className="mt-8 flex flex-col gap-1">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `rounded-md px-2 py-1.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-stone-200 text-stone-900' : 'text-stone-600 hover:bg-stone-200/60'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-2">
        {user ? (
          <div className="flex items-center justify-between text-sm text-stone-600">
            <span className="truncate">{user.name}</span>
            <button type="button" onClick={logout} className="font-medium text-stone-500 hover:text-stone-900">
              Log Out
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-sm font-medium text-stone-600 hover:text-stone-900">
            Log In
          </Link>
        )}
      </div>
    </aside>
  )
}
