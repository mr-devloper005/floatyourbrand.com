'use client'

import { useMemo, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, Mail, User, UserPlus } from 'lucide-react'
import { AuthShell } from '@/components/shared/auth-shell'
import { useAuth } from '@/lib/auth-context'

function scorePassword(pw: string) {
  let score = 0
  if (pw.length >= 8) score += 1
  if (/[A-Z]/.test(pw)) score += 1
  if (/[0-9]/.test(pw)) score += 1
  if (/[^A-Za-z0-9]/.test(pw)) score += 1
  return score
}

const STRENGTH_LABEL = ['Too short', 'Weak', 'Okay', 'Good', 'Strong']
const STRENGTH_COLOR = [
  'bg-zinc-200',
  'bg-rose-500',
  'bg-amber-500',
  'bg-yellow-500',
  'bg-emerald-500',
]

export default function RegisterPage() {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agree, setAgree] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const strength = useMemo(() => scorePassword(password), [password])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in your name, email and a password.')
      return
    }
    if (password.length < 8) {
      setError('Use at least 8 characters for your password.')
      return
    }
    if (!agree) {
      setError('Please accept the terms to create your account.')
      return
    }
    setSubmitting(true)
    try {
      await signup(name.trim(), email.trim(), password)
      router.replace('/')
      router.refresh()
    } catch {
      setError('Could not create your account. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const busy = submitting || isLoading

  return (
    <AuthShell
      side="register"
      eyebrow="Create account"
      title="Join a calmer corner of the web."
      description="Save articles, follow writers you trust, and pitch your own stories — all from one minimal account."
      bullets={[
        'Save and organise the articles you love',
        'Follow authors and topics that matter',
        'Submit pitches and write for the desk',
      ]}
      altLink={{
        helper: 'Already a member?',
        label: 'Sign in',
        href: '/login',
      }}
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="grid gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Full name
          </span>
          <span className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="Your full name"
              className="h-11 w-full rounded-sm border border-zinc-300 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-[#ff5500]"
            />
          </span>
        </label>

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
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Password
          </span>
          <span className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="At least 8 characters"
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
          <span className="mt-1 grid grid-cols-4 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1 rounded-full ${
                  i < strength ? STRENGTH_COLOR[strength] : 'bg-zinc-200'
                }`}
              />
            ))}
          </span>
          <span className="text-[11px] text-zinc-500">
            Strength: {STRENGTH_LABEL[strength]} • mix letters, numbers, and a
            symbol for best results.
          </span>
        </label>

        <label className="flex items-start gap-2 text-sm text-zinc-600">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-1 h-4 w-4 cursor-pointer accent-[#ff5500]"
          />
          <span>
            I agree to the{' '}
            <Link
              href="/terms"
              className="font-medium text-blue-600 hover:underline"
            >
              terms of service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="font-medium text-blue-600 hover:underline"
            >
              privacy policy
            </Link>
            .
          </span>
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
            <UserPlus className="h-4 w-4" />
          )}
          {busy ? 'Creating account…' : 'Create account'}
        </button>

        <p className="text-center text-sm text-zinc-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}
