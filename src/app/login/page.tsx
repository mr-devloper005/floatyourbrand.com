'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, LogIn, Mail } from 'lucide-react'
import { AuthShell } from '@/components/shared/auth-shell'
import { useAuth } from '@/lib/auth-context'

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }
    setSubmitting(true)
    try {
      await login(email.trim(), password)
      router.replace('/')
      router.refresh()
    } catch {
      setError('Unable to sign in. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const busy = submitting || isLoading

  return (
    <AuthShell
      side="login"
      eyebrow="Sign in"
      title="Pick up where you left off."
      description="Sign in to continue reading, save articles for later, and stay close to the writers you follow."
      bullets={[
        'Resume reading on any device',
        'Save and revisit articles you love',
        'A calmer, distraction-free experience',
      ]}
      altLink={{
        helper: 'New here?',
        label: 'Create account',
        href: '/register',
      }}
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="grid gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Email
          </span>
          <span className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
              className="h-11 w-full rounded-sm border border-zinc-300 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-[#ff5500]"
            />
          </span>
        </label>

        <label className="grid gap-1.5">
          <span className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-zinc-500">
            <span>Password</span>
            <Link
              href="/forgot-password"
              className="text-[11px] font-semibold normal-case text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </span>
          <span className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Your password"
              className="h-11 w-full rounded-sm border border-zinc-300 bg-white px-3 pr-10 text-sm outline-none transition focus:border-[#ff5500]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1.5 text-zinc-500 hover:bg-zinc-100"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </span>
        </label>

        <label className="flex items-center gap-2 text-sm text-zinc-600">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 cursor-pointer accent-[#ff5500]"
          />
          Keep me signed in on this device
        </label>

        {error ? (
          <p className="rounded-sm border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-[#ff5500] text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#e64d00] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogIn className="h-4 w-4" />
          )}
          {busy ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="text-center text-sm text-zinc-600">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Create one
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}
