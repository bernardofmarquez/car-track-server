import { PrismaClient } from '@prisma/client'
import { CreateCarBody } from '../modules/cars/schemas/create-car'
import { UpdateCarBody } from '../modules/cars/schemas/update-car'
import { db } from '../config/db'

export default class CarsRepository {
  private db: PrismaClient

  constructor() {
    this.db = db
  }

  public create(car: CreateCarBody) {
    return this.db.car.create({
      data: car,
    })
  }

  public findMany(color: string | undefined, brand: string | undefined) {
    return this.db.car.findMany({
      where: {
        color,
        brand,
      },
    })
  }

  public findOneByLicensePlate(licensePlate: string) {
    return this.db.car.findUnique({
      where: { licensePlate },
    })
  }

  public findById(id: string) {
    return this.db.car.findUnique({
      where: { id },
    })
  }

  public update(id: string, car: UpdateCarBody) {
    return this.db.car.update({
      where: { id },
      data: car,
    })
  }

  public delete(id: string) {
    return this.db.car.delete({
      where: { id },
    })
  }
}
