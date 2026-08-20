import { useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'

interface SignupScreenProps {
  onSwitchToLogin: () => void
}

function SignupScreen({ onSwitchToLogin }: SignupScreenProps): React.JSX.Element {
  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault()
    setError(null)
    setInfo(null)
    setLoading(true)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nome, cargo } }
    })

    setLoading(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    if (!data.session) {
      setInfo('Cadastro criado! Confira seu e-mail para confirmar a conta antes de entrar.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-semibold text-slate-800">Criar conta</h1>

        <label className="mb-1 block text-sm font-medium text-slate-600" htmlFor="nome">
          Nome
        </label>
        <input
          id="nome"
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="mb-4 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 focus:border-blue-500 focus:outline-none"
        />

        <label className="mb-1 block text-sm font-medium text-slate-600" htmlFor="cargo">
          Cargo
        </label>
        <input
          id="cargo"
          type="text"
          required
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          className="mb-4 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 focus:border-blue-500 focus:outline-none"
        />

        <label className="mb-1 block text-sm font-medium text-slate-600" htmlFor="signup-email">
          E-mail
        </label>
        <input
          id="signup-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 focus:border-blue-500 focus:outline-none"
        />

        <label className="mb-1 block text-sm font-medium text-slate-600" htmlFor="signup-password">
          Senha
        </label>
        <input
          id="signup-password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 focus:border-blue-500 focus:outline-none"
        />

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        {info && <p className="mb-4 text-sm text-green-600">{info}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Criando conta...' : 'Criar conta'}
        </button>

        <p className="mt-4 text-center text-sm text-slate-600">
          Já tem conta?{' '}
          <button type="button" onClick={onSwitchToLogin} className="text-blue-600 hover:underline">
            Entrar
          </button>
        </p>
      </form>
    </div>
  )
}

export default SignupScreen
