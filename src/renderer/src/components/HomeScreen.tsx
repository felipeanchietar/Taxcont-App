interface HomeScreenProps {
  nome: string
  onLogout: () => void
}

function HomeScreen({ nome, onLogout }: HomeScreenProps): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-100">
      <h1 className="text-2xl font-semibold text-slate-800">Olá, {nome}</h1>
      <button
        onClick={onLogout}
        className="rounded-md bg-slate-800 px-4 py-2 font-medium text-white hover:bg-slate-700"
      >
        Sair
      </button>
    </div>
  )
}

export default HomeScreen
