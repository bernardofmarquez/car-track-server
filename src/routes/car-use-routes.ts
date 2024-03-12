import { Request, Response, Router } from 'express'
import validateSchema from '../middlewares/validate-schema'
import CarsRepository from '../repositories/cars-repository'
import CarUseRepository from '../repositories/car-use-repository'
import DriversRepository from '../repositories/drivers-repository'
import CarUseService from '../services/car-use-service'
import CarUseController from '../modules/car-use/car-use-controller'
import { initiateCarUseJsonSchema } from '../modules/car-use/schema/initiate-car-use-schema'

const carUseRouter = Router()

const carUseRepository = new CarUseRepository()
const carsRepository = new CarsRepository()
const driversRepository = new DriversRepository()
const carUseService = new CarUseService(carUseRepository, driversRepository, carsRepository)
const carUseController = new CarUseController(carUseService)

carUseRouter.post(
  '/v1/car-use',
  validateSchema(initiateCarUseJsonSchema),
  (req: Request, res: Response) => carUseController.initiateCarUse(req, res),
)

carUseRouter.get(
  '/v1/car-use',
  (req: Request, res: Response) => carUseController.findMany(req, res),
)

carUseRouter.put(
  '/v1/car-use/:id',
  (req: Request<{ id: string }>, res: Response) => carUseController.finalizeCarUse(req, res),
)

export default carUseRouter
