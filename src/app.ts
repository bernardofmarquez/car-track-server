import express from 'express'
import driversRouter from './routes/drivers-route'

const app = express()

app.use(express.json())
app.use(driversRouter)

export { app }
