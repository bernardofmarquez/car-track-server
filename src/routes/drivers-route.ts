import { Router } from 'express'
import DriversRepository from '../repositories/drivers-repository'
import DriversService from '../services/drivers-service'
import DriversController from '../modules/drivers/drivers-controller'
import { createDriverJsonSchema } from '../modules/drivers/schemas/create-driver'
import validateSchema from '../middlewares/validate-schema'
import { updateDriverJsonSchema } from '../modules/drivers/schemas/update-driver'

const driversRouter = Router()

const driversRepository = new DriversRepository()
const driversService = new DriversService(driversRepository)
const driversController = new DriversController(driversService)

driversRouter.post('/v1/drivers', validateSchema(createDriverJsonSchema), driversController.create)
driversRouter.get('/v1/drivers', driversController.findMany)
driversRouter.put('/v1/drivers/:id', validateSchema(updateDriverJsonSchema), driversController.update)
driversRouter.delete('/v1/drivers/:id', driversController.delete)

export default driversRouter
