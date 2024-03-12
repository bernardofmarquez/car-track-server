import { Driver } from '@prisma/client'
import { NameAlreadyUsedError } from '../errors/name-already-used-error'
import { CreateDriverBody } from '../modules/drivers/schemas/create-driver'
import DriversRepository from '../repositories/drivers-repository'

export default class DriversService {
  constructor(private driversRepository: DriversRepository) {}

  public async create(driverData: CreateDriverBody): Promise<Driver> {
    const existingDriver = await this.driversRepository.findOneByName(driverData.name)
    if (existingDriver) throw new NameAlreadyUsedError()

    const createdDriver = await this.driversRepository.create(driverData)

    return createdDriver
  }

  public findAll(): Promise<Driver[]> {
    return this.driversRepository.findAll()
  }

  public findManyByName(name: string): Promise<Driver[]> {
    return this.driversRepository.findManyByName(name)
  }

  public findById(id: string): Promise<Driver | null> {
    return this.driversRepository.findById(id)
  }

  public async update(id: string, driverData: CreateDriverBody): Promise<Driver | null> {
    if (driverData.name) {
      const existingDriverWithName = await this.driversRepository.findOneByName(driverData.name)
      if (existingDriverWithName && existingDriverWithName.id !== id) {
        throw new NameAlreadyUsedError()
      }
    }

    const updatedDriver = await this.driversRepository.update(id, driverData)

    return updatedDriver
  }

  public delete(id: string) {
    return this.driversRepository.delete(id)
  }
}
