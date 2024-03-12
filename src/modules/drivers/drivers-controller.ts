import { Request, Response } from 'express'
// import { Driver } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { NameAlreadyUsedError } from '../../errors'
import { CreateDriverBody } from './schemas/create-driver'
import { UpdateDriverBody } from './schemas/update-driver'
import DriversService from '../../services/drivers-service'
import CarUseService from '../../services/car-use-service'
import { db } from '../../config/db'

export default class DriversController {
  private db: PrismaClient

  constructor(
    private driversService: DriversService,
    private carUseService: CarUseService,
  ) {
    this.db = db
  }

  public async create(req: Request<{}, {}, CreateDriverBody>, res: Response): Promise<Response> {
    try {
      const driverData = req.body
      const createdDriver = await this.driversService.create(driverData)

      return res.status(201).send(createdDriver)
    } catch (error) {
      if (error instanceof NameAlreadyUsedError) {
        return res.status(400).send({ message: error.message })
      }
      return res.status(500).send(error)
    }
  }

  public async findMany(req: Request<{}, {}, {}, { name?: string }>, res: Response): Promise<Response> {
    try {
      const { name } = req.query

      const drivers = await this.driversService.findMany(name)

      return res.status(200).send(drivers)
    } catch (error) {
      return res.status(500).send(error)
    }
  }

  public async findById(req: Request<{ id: string }>, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const driver = await this.driversService.findById(id)
      if (!driver) {
        return res.status(404).send()
      }

      return res.status(200).send(driver)
    } catch (error) {
      return res.status(500).send(error)
    }
  }

  public async update(req: Request<{ id: string }, {}, UpdateDriverBody>, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const driverData = req.body

      if (!await this.driversService.findById(id)) {
        return res.status(404).send()
      }

      const updatedDriver = await this.driversService.update(id, driverData)

      return res.status(200).send(updatedDriver)
    } catch (error) {
      if (error instanceof NameAlreadyUsedError) {
        return res.status(400).send(error)
      }
      return res.status(500).send(error)
    }
  }

  public async delete(req: Request<{ id: string }>, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      if (!await this.driversService.findById(id)) {
        return res.status(404).send()
      }

      await db.$transaction([
        this.carUseService.deleteManyByDriverId(id),
        this.driversService.delete(id),
      ])

      return res.status(200).send()
    } catch (error) {
      return res.status(500).send(error)
    }
  }
}
