import express from 'express'
import driversRouter from './routes/drivers-routes'
import carsRouter from './routes/cars-routes'
import carUseRouter from './routes/car-use-routes'

const app = express()

app.use(express.json())
app.use(driversRouter)
app.use(carsRouter)
app.use(carUseRouter)

export { app }
