import { Request, Response, Router } from 'express'
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

driversRouter.post(
  '/v1/drivers',
  validateSchema(createDriverJsonSchema),
  (req: Request, res: Response) => driversController.create(req, res),
)

driversRouter.get(
  '/v1/drivers',
  (req: Request, res: Response) => driversController.findMany(req, res),
)

driversRouter.get(
  '/v1/drivers/:id',
  (req: Request<{ id: string }>, res: Response) => driversController.findById(req, res),
)

driversRouter.put(
  '/v1/drivers/:id',
  validateSchema(updateDriverJsonSchema),
  (req: Request<{ id: string }>, res: Response) => driversController.update(req, res),
)
driversRouter.delete(
  '/v1/drivers/:id',
  (req: Request<{ id: string }>, res: Response) => driversController.delete(req, res),
)

export default driversRouter
