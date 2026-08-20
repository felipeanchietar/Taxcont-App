import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import LoginScreen from './components/LoginScreen'
import SignupScreen from './components/SignupScreen'
import HomeScreen from './components/HomeScreen'

type AuthView = 'login' | 'signup'

function App(): React.JSX.Element {
  const [session, setSession] = useState<Session | null>(null)
  const [nome, setNome] = useState<string | null>(null)
  const [checkingSession, setCheckingSession] = useState(true)
  const [authView, setAuthView] = useState<AuthView>('login')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setCheckingSession(false)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session) {
      return
    }

    supabase
      .from('profiles')
      .select('nome')
      .eq('id', session.user.id)
      .single()
      .then(({ data }) => setNome(data?.nome ?? null))
  }, [session])

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-slate-500">Carregando...</p>
      </div>
    )
  }

  if (!session) {
    return authView === 'login' ? (
      <LoginScreen onSwitchToSignup={() => setAuthView('signup')} />
    ) : (
      <SignupScreen onSwitchToLogin={() => setAuthView('login')} />
    )
  }

  return (
    <HomeScreen nome={nome ?? session.user.email ?? ''} onLogout={() => supabase.auth.signOut()} />
  )
}

export default App
