import { Request, Response } from 'express'
import {
  CarBeingUsed,
  CarNotFound, DriverAlreadyUsingCar, DriverNotFound, FutureStartDate,
} from '../../errors'
import { InitiateCarUseBody } from './schema/initiate-car-use-schema'
import CarUseService from '../../services/car-use-service'

export default class CarUseController {
  constructor(
    private carUseService: CarUseService,
  ) {}

  public async initiateCarUse(req: Request<{}, {}, InitiateCarUseBody>, res: Response): Promise<Response> {
    try {
      const carUseData = req.body
      const initiateCarUse = await this.carUseService.initiateCarUse(carUseData)

      return res.status(201).send(initiateCarUse)
    } catch (error) {
      if (error instanceof FutureStartDate) return res.status(400).send({ message: error.message })
      if (error instanceof DriverNotFound) return res.status(404).send({ message: error.message })
      if (error instanceof CarNotFound) return res.status(404).send({ message: error.message })
      if (error instanceof DriverAlreadyUsingCar) return res.status(400).send({ message: error.message })
      if (error instanceof CarBeingUsed) return res.status(400).send({ message: error.message })
      return res.status(500).send(error)
    }
  }

  public async finalizeCarUse(req: Request<{ id: string }>, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      if (!await this.carUseService.findById(id)) {
        return res.status(404).send()
      }

      const finalizedCarUse = await this.carUseService.finalizeCarUse(id)

      return res.status(200).send(finalizedCarUse)
    } catch (error) {
      return res.status(500).send(error)
    }
  }

  public async findMany(req: Request, res: Response): Promise<Response> {
    try {
      const carUsesList = await this.carUseService.findMany()

      return res.status(200).send(carUsesList)
    } catch (error) {
      return res.status(500).send(error)
    }
  }
}
