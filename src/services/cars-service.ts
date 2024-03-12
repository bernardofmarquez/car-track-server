import { Car } from '@prisma/client'
import CarsRepository from '../repositories/cars-repository'
import { CreateCarBody } from '../modules/cars/schemas/create-car'
import { LicensePlateAlreadyRegistered } from '../errors'
import { UpdateCarBody } from '../modules/cars/schemas/update-car'

export default class CarsService {
  constructor(private carsRepository: CarsRepository) {}

  public async create(carData: CreateCarBody): Promise<Car> {
    const existingCar = await this.carsRepository.findOneByLicensePlate(carData.licensePlate)
    if (existingCar) throw new LicensePlateAlreadyRegistered()

    const createdCar = await this.carsRepository.create(carData)

    return createdCar
  }

  public findMany(color: string | undefined, brand: string | undefined): Promise<Car[]> {
    return this.carsRepository.findMany(color, brand)
  }

  public findById(id: string): Promise<Car | null> {
    return this.carsRepository.findById(id)
  }

  public async update(id: string, carData: UpdateCarBody): Promise<Car | null> {
    const existingCarWithName = await this.carsRepository.findOneByLicensePlate(carData.licensePlate)
    if (existingCarWithName && existingCarWithName.id !== id) throw new LicensePlateAlreadyRegistered()

    const updatedCar = await this.carsRepository.update(id, carData)

    return updatedCar
  }

  public delete(id: string) {
    return this.carsRepository.delete(id)
  }
}
