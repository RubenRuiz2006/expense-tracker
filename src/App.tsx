import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GastosProvider from './context/GastosProvider'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ResumenPage from './pages/ResumenPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    // GastosProvider envuelve toda la app — los datos están disponibles en todas partes
    <GastosProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resumen" element={<ResumenPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </GastosProvider>
  )
}