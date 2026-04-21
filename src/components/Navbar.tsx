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
          className="bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-blue-50"
        >
          Ver gastos
        </Link>
      ) : (
        <Link
          to="/resumen"
          className="bg-white text-blue-600 px4 py-2 rounded font-medium hover:bg-blue-50"
        >
          Ver resumen
        </Link>
      )}
    </nav>
  )
}