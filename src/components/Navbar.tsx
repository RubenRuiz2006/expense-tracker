import { useLocation, Link } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const enResumen = location.pathname === '/resumen'

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Expense Tracker</h1>
      <div className="flex gap-4">
        {enResumen ? (
          <Link to="/" className="hover:underline">Ver gastos</Link>
        ) : (
          <Link to="/resumen" className="hover:underline">Ver resumen</Link>
        )}
      </div>
    </nav>
  )
}