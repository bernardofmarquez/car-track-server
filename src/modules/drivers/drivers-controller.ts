import { Request, Response } from 'express'
import { Driver } from '@prisma/client'
import DriversService from '../../services/drivers-service'
import { NameAlreadyUsedError } from '../../errors'
import { CreateDriverBody } from './schemas/create-driver'
import { UpdateDriverBody } from './schemas/update-driver'

export default class DriversController {
  constructor(
    private driversService: DriversService,
  ) {}

  public async create(req: Request<{}, {}, CreateDriverBody>, res: Response): Promise<Response> {
    try {
      const driverData = req.body
      const createdDriver = await this.driversService.create(driverData)

      return res.status(201).send(createdDriver)
    } catch (error) {
      if (error instanceof NameAlreadyUsedError) {
        return res.status(400).send(error)
      }
      console.log(error)
      return res.status(500).send(error)
    }
  }

  public async findMany(req: Request<{}, {}, {}, { name?: string }>, res: Response): Promise<Response> {
    try {
      const { name } = req.query

      let drivers: Driver[]

      if (name) {
        drivers = await this.driversService.findManyByName(name)
      } else {
        drivers = await this.driversService.findAll()
      }

      return res.status(200).send(drivers)
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

      const deletedDriver = await this.driversService.delete(id)

      return res.status(200).send(deletedDriver)
    } catch (error) {
      return res.status(500).send(error)
    }
  }
}