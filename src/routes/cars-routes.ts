import { Request, Response, Router } from 'express'
import validateSchema from '../middlewares/validate-schema'
import CarsRepository from '../repositories/cars-repository'
import CarsService from '../services/cars-service'
import CarsController from '../modules/cars/cars-controller'
import { createCarJsonSchema } from '../modules/cars/schemas/create-car'
import { updateCarJsonSchema } from '../modules/cars/schemas/update-car'
import CarUseRepository from '../repositories/car-use-repository'
import DriversRepository from '../repositories/drivers-repository'
import CarUseService from '../services/car-use-service'

const carsRouter = Router()

const carsRepository = new CarsRepository()
const carUseRepository = new CarUseRepository()
const driversRepository = new DriversRepository()
const carsService = new CarsService(carsRepository)
const carUseService = new CarUseService(carUseRepository, driversRepository, carsRepository)
const carsController = new CarsController(carsService, carUseService)

carsRouter.post(
  '/v1/cars',
  validateSchema(createCarJsonSchema),
  (req: Request, res: Response) => carsController.create(req, res),
)

carsRouter.get(
  '/v1/cars',
  (req: Request, res: Response) => carsController.findMany(req, res),
)

carsRouter.get(
  '/v1/cars/:id',
  (req: Request<{ id: string }>, res: Response) => carsController.findById(req, res),
)

carsRouter.put(
  '/v1/cars/:id',
  validateSchema(updateCarJsonSchema),
  (req: Request<{ id: string }>, res: Response) => carsController.update(req, res),
)
carsRouter.delete(
  '/v1/cars/:id',
  (req: Request<{ id: string }>, res: Response) => carsController.delete(req, res),
)

export default carsRouter
