import { PrismaClient } from '@prisma/client'
import { CreateCarBody } from '../modules/cars/schemas/create-car'
import { UpdateCarBody } from '../modules/cars/schemas/update-car'

export default class CarsRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  public create(car: CreateCarBody) {
    return this.prisma.car.create({
      data: car,
    })
  }

  public findMany(color: string | undefined, brand: string | undefined) {
    return this.prisma.car.findMany({
      where: {
        color,
        brand,
      },
    })
  }

  public findOneByLicensePlate(licensePlate: string) {
    return this.prisma.car.findUnique({
      where: { licensePlate },
    })
  }

  public findById(id: string) {
    return this.prisma.car.findUnique({
      where: { id },
    })
  }

  public update(id: string, car: UpdateCarBody) {
    return this.prisma.car.update({
      where: { id },
      data: car,
    })
  }

  public delete(id: string) {
    return this.prisma.car.delete({
      where: { id },
    })
  }
}
