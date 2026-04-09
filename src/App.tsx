import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import type { Gasto } from './types/gasto'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ResumenPage from './pages/ResumenPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  // Movemos los gastos aquí para compartirlos entre HomePage y ResumenPage
  const [gastos, setGastos] = useState<Gasto[]>([])

  return (
    <BrowserRouter>
      {/* La Navbar aparece en todas las páginas */}
      <Navbar />

      {/* Aquí React Router decide qué página mostrar según la URL */}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              gastos={gastos}
              setGastos={setGastos}
            />
          }
        />
        <Route
          path="/resumen"
          element={<ResumenPage gastos={gastos} />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}