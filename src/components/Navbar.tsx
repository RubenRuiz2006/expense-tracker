import { useLocation, Link } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const enResumen = location.pathname === '/resumen'

  return (
    <nav className="bg-blue-800 text-white px-6 h-14 flex items-center justify-between">
      <h1 className="text-base font-medium tracking-tight">Expense Tracker</h1>
      {enResumen ? (
        <Link to="/" className="border border-white/40 text-white px-4 py-1.5 rounded-full text-sm hover:bg-white/15 hover:border-white/70 transition-all">
          ← Ver gastos
        </Link>
      ) : (
        <Link to="/resumen" className="border border-white/40 text-white px-4 py-1.5 rounded-full text-sm hover:bg-white/15 hover:border-white/70 transition-all">
          Ver resumen →
        </Link>
      )}
    </nav>
  )
}