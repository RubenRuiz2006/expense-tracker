import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useGastos from './hooks/useGastos'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ResumenPage from './pages/ResumenPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  // Toda la lógica de gastos viene del hook
  const { gastos, guardarGasto, eliminarGasto } = useGastos()

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              gastos={gastos}
              onGuardar={guardarGasto}
              onEliminar={eliminarGasto}
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