import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useUser } from '../context/UserContext'
import { pushToDataLayer } from '../utils/dataLayer'

type LocationState = { from?: string } | null

export function Signup() {
  const { login } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const from = (location.state as LocationState)?.from ?? '/'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const user = login({ name, email })
    pushToDataLayer({
      event: 'sign_up',
      userId: user.cid,
      email: user.email,
      name: user.name,
      plan_type: 'Gold',
      role: 'Developer',
    })
    navigate(from, { replace: true })
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <h1 className="text-2xl font-semibold text-stone-900">Sign Up</h1>
      <p className="mt-2 text-sm text-stone-500">
        This is a demo signup — any name and email will work.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="w-full rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-6 text-sm text-stone-500">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-stone-900 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}
