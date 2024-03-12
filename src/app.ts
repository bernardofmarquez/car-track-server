import express from 'express'
import driversRouter from './routes/drivers-route'
import carsRouter from './routes/cars-route'

const app = express()

app.use(express.json())
app.use(driversRouter)
app.use(carsRouter)

export { app }
