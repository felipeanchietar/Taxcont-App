import { useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'

interface LoginScreenProps {
  onSwitchToSignup: () => void
}

function LoginScreen({ onSwitchToSignup }: LoginScreenProps): React.JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)
    if (signInError) {
      setError(signInError.message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-semibold text-slate-800">Entrar</h1>

        <label className="mb-1 block text-sm font-medium text-slate-600" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 focus:border-blue-500 focus:outline-none"
        />

        <label className="mb-1 block text-sm font-medium text-slate-600" htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 focus:border-blue-500 focus:outline-none"
        />

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="mt-4 text-center text-sm text-slate-600">
          Não tem conta?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:underline"
          >
            Cadastre-se
          </button>
        </p>
      </form>
    </div>
  )
}

export default LoginScreen
