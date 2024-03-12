import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { LicensePlateAlreadyRegistered } from '../../errors'
import { CreateCarBody } from './schemas/create-car'
import CarsService from '../../services/cars-service'
import { UpdateCarBody } from './schemas/update-car'
import { db } from '../../config/db'
import CarUseService from '../../services/car-use-service'

export default class CarsController {
  private db: PrismaClient

  constructor(
    private carsService: CarsService,
    private carUseService: CarUseService,
  ) {
    this.db = db
  }

  public async create(req: Request<{}, {}, CreateCarBody>, res: Response): Promise<Response> {
    try {
      const carData = req.body
      const createdCar = await this.carsService.create(carData)

      return res.status(201).send(createdCar)
    } catch (error) {
      if (error instanceof LicensePlateAlreadyRegistered) {
        return res.status(400).send({ message: error.message })
      }
      return res.status(500).send(error)
    }
  }

  public async findMany(req: Request<{}, {}, {}, { color?: string, brand?: string }>, res: Response): Promise<Response> {
    try {
      const { color, brand } = req.query

      const drivers = await this.carsService.findMany(color, brand)

      return res.status(200).send(drivers)
    } catch (error) {
      return res.status(500).send(error)
    }
  }

  public async findById(req: Request<{ id: string }>, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const car = await this.carsService.findById(id)
      if (!car) {
        return res.status(404).send()
      }

      return res.status(200).send(car)
    } catch (error) {
      return res.status(500).send(error)
    }
  }

  public async update(req: Request<{ id: string }, {}, UpdateCarBody>, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const driverData = req.body

      if (!await this.carsService.findById(id)) {
        return res.status(404).send()
      }

      const updatedDriver = await this.carsService.update(id, driverData)

      return res.status(200).send(updatedDriver)
    } catch (error) {
      if (error instanceof LicensePlateAlreadyRegistered) {
        return res.status(400).send({ message: error.message })
      }
      return res.status(500).send(error)
    }
  }

  public async delete(req: Request<{ id: string }>, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      if (!await this.carsService.findById(id)) {
        return res.status(404).send()
      }
      await db.$transaction([
        this.carUseService.deleteManyByCarId(id),
        this.carsService.delete(id),
      ])

      return res.status(200).send()
    } catch (error) {
      return res.status(500).send(error)
    }
  }
}
