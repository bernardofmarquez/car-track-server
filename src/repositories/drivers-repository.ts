import { PrismaClient, Driver } from '@prisma/client'
import { CreateDriverBody } from '../modules/drivers/schemas/create-driver'

export default class DriversRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  public create(driver: CreateDriverBody) {
    return this.prisma.driver.create({
      data: driver,
    })
  }

  public findMany(name: string | undefined): Promise<Driver[]> {
    return this.prisma.driver.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    })
  }

  public findOneByName(name: string) {
    return this.prisma.driver.findUnique({
      where: { name },
    })
  }

  public findById(id: string) {
    return this.prisma.driver.findUnique({
      where: { id },
    })
  }

  public update(id: string, driver: Partial<Driver>) {
    return this.prisma.driver.update({
      where: { id },
      data: driver,
    })
  }

  public delete(id: string) {
    return this.prisma.driver.delete({
      where: { id },
    })
  }
}
