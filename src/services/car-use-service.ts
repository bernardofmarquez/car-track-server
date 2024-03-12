import { CarUse } from '@prisma/client'
import { InitiateCarUseBody } from '../modules/car-use/schema/initiate-car-use-schema'
import CarUseRepository from '../repositories/car-use-repository'
import DriversRepository from '../repositories/drivers-repository'
import CarsRepository from '../repositories/cars-repository'
import {
  CarBeingUsed, CarNotFound, DriverAlreadyUsingCar, DriverNotFound, FutureStartDate,
} from '../errors'

export default class CarUseService {
  constructor(
    private carUseRepository: CarUseRepository,
    private driversRepository: DriversRepository,
    private carsRepository: CarsRepository,
  ) {}

  public async initiateCarUse(carUseData: InitiateCarUseBody): Promise<CarUse> {
    const carUseStartDate = new Date(carUseData.startDate)
    const now = new Date()

    if (carUseStartDate > now) throw new FutureStartDate()

    if (!await this.driversRepository.findById(carUseData.driverId)) throw new DriverNotFound()

    if (!await this.carsRepository.findById(carUseData.carId)) throw new CarNotFound()

    if (await this.carUseRepository.findOngoingCarUseByDriverId(carUseData.driverId)) throw new DriverAlreadyUsingCar()

    if (await this.carUseRepository.findOngoingCarUseByCarId(carUseData.carId)) throw new CarBeingUsed()

    const initiatedCarUse = await this.carUseRepository.create(carUseData)

    return initiatedCarUse
  }

  public async findMany() {
    const carUses = await this.carUseRepository.findMany()

    const extendedCarUses = await Promise.all(carUses.map(async (carUse) => {
      const driver = await this.driversRepository.findById(carUse.driverId)
      if (!driver) return null
      const car = await this.carsRepository.findById(carUse.carId)
      if (!car) return null

      return {
        id: carUse.id,
        driver,
        car,
        usageReason: carUse.usageReason,
        startDate: carUse.startDate,
        endDate: carUse.endDate,
      }
    }))

    return extendedCarUses.filter((value) => value !== null)
  }

  public findById(id: string): Promise<CarUse | null> {
    return this.carUseRepository.findById(id)
  }

  public finalizeCarUse(id: string): Promise<CarUse> {
    return this.carUseRepository.finalizeCarUse(id)
  }

  public deleteManyByDriverId(driverId: string) {
    return this.carUseRepository.deleteManyByDriverId(driverId)
  }

  public deleteManyByCarId(carId: string) {
    return this.carUseRepository.deleteManyByCarId(carId)
  }
}
