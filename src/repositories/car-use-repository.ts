import { PrismaClient } from '@prisma/client'
import { InitiateCarUseBody } from '../modules/car-use/schema/initiate-car-use-schema'
import { db } from '../config/db'

export default class CarUseRepository {
  private db: PrismaClient

  constructor() {
    this.db = db
  }

  public create(carUse: InitiateCarUseBody) {
    return this.db.carUse.create({
      data: carUse,
    })
  }

  public findMany() {
    return this.db.carUse.findMany()
  }

  public findById(id: string) {
    return this.db.carUse.findUnique({
      where: { id },
    })
  }

  public findOngoingCarUseByDriverId(driverId: string) {
    return this.db.carUse.findFirst({
      where: {
        driverId,
        endDate: null,
      },
    })
  }

  public findOngoingCarUseByCarId(carId: string) {
    return this.db.carUse.findFirst({
      where: {
        carId,
        endDate: null,
      },
    })
  }

  public finalizeCarUse(id: string) {
    return this.db.carUse.update({
      where: {
        id,
      },
      data: {
        endDate: new Date(),
      },
    })
  }

  public deleteManyByDriverId(driverId: string) {
    return this.db.carUse.deleteMany({
      where: {
        driverId,
      },
    })
  }

  public deleteManyByCarId(carId: string) {
    return this.db.carUse.deleteMany({
      where: {
        carId,
      },
    })
  }
}
