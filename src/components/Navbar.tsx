import { Link } from "react-router-dom"
export default function Navbar(){
      return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Expense Tracker</h1>
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">
          Gastos
        </Link>
        <Link to="/resumen" className="hover:underline">
          Resumen
        </Link>
      </div>
    </nav>
  )
}
