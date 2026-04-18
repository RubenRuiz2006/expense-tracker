import express from 'express'
import cors from 'cors'
import gastosRoutes from './routes/gastosRoutes'

const app = express()
const PORT = 3000

app.use(cors({
  origin: 'https://expense-tracker-sigma-seven-70.vercel.app'
}))
app.use(express.json())
app.use('/api/v1/gastos', gastosRoutes)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})