import { Driver } from '@prisma/client'
import DriversModel from '../repositories/drivers-repository'
import { NameAlreadyUsedError } from '../errors/name-already-used-error'
import { CreateDriverBody } from '../modules/drivers/schemas/create-driver'

export default class DriversService {
  constructor(private driversModel: DriversModel) {}

  public async create(driverData: CreateDriverBody): Promise<Driver> {
    const existingDriver = await this.driversModel.findOneByName(driverData.name)
    if (existingDriver) throw new NameAlreadyUsedError()

    const createdDriver = await this.driversModel.create(driverData)

    return createdDriver
  }

  public findAll(): Promise<Driver[]> {
    return this.driversModel.findAll()
  }

  public findManyByName(name: string): Promise<Driver[]> {
    return this.driversModel.findManyByName(name)
  }

  public findById(id: string): Promise<Driver | null> {
    return this.driversModel.findById(id)
  }

  public async update(id: string, driverData: CreateDriverBody): Promise<Driver | null> {
    if (driverData.name) {
      const existingDriverWithName = await this.driversModel.findOneByName(driverData.name)
      if (existingDriverWithName && existingDriverWithName.id !== id) {
        throw new NameAlreadyUsedError()
      }
    }

    const updatedDriver = await this.driversModel.update(id, driverData)

    return updatedDriver
  }

  public delete(id: string) {
    return this.driversModel.delete(id)
  }
}
