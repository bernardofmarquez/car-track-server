import { Driver } from '@prisma/client'
import { NameAlreadyUsedError } from '../errors/name-already-used-error'
import { CreateDriverBody } from '../modules/drivers/schemas/create-driver'
import DriversRepository from '../repositories/drivers-repository'
import { UpdateDriverBody } from '../modules/drivers/schemas/update-driver'

export default class DriversService {
  constructor(private driversRepository: DriversRepository) {}

  public async create(driverData: CreateDriverBody): Promise<Driver> {
    const existingDriver = await this.driversRepository.findOneByName(driverData.name)
    if (existingDriver) throw new NameAlreadyUsedError()

    const createdDriver = await this.driversRepository.create(driverData)

    return createdDriver
  }

  public findMany(name: string | undefined): Promise<Driver[]> {
    return this.driversRepository.findMany(name)
  }

  public findById(id: string): Promise<Driver | null> {
    return this.driversRepository.findById(id)
  }

  public async update(id: string, driverData: UpdateDriverBody): Promise<Driver | null> {
    const existingDriverWithName = await this.driversRepository.findOneByName(driverData.name)
    if (existingDriverWithName && existingDriverWithName.id !== id) {
      throw new NameAlreadyUsedError()
    }

    const updatedDriver = await this.driversRepository.update(id, driverData)

    return updatedDriver
  }

  public delete(id: string) {
    return this.driversRepository.delete(id)
  }
}
