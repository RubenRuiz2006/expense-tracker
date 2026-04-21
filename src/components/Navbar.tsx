import { useLocation, Link } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const enResumen = location.pathname === '/resumen'

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Expense Tracker</h1>
      {enResumen ? (
        <Link
          to="/"
          className="border border-white/60 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/15 hover:border-white transition-all"
        >
          ← Ver gastos
        </Link>
      ) : (
        <Link
          to="/resumen"
          className="border border-white/60 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/15 hover:border-white transition-all"
        >
          Ver resumen →
        </Link>
      )}
    </nav>
  )
}