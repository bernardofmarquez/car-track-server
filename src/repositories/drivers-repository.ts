import { PrismaClient, Driver } from '@prisma/client'
import { CreateDriverBody } from '../modules/drivers/schemas/create-driver'

export default class DriversRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  public async create(driver: CreateDriverBody) {
    return this.prisma.driver.create({
      data: driver,
    })
  }

  public async findAll() {
    return this.prisma.driver.findMany()
  }

  public async findManyByName(name: string): Promise<Driver[]> {
    return this.prisma.driver.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    })
  }

  public async findOneByName(name: string) {
    return this.prisma.driver.findUnique({
      where: { name },
    })
  }

  public async findById(id: string) {
    return this.prisma.driver.findUnique({
      where: { id },
    })
  }

  public async update(id: string, driver: Partial<Driver>) {
    return this.prisma.driver.update({
      where: { id },
      data: driver,
    })
  }

  public async delete(id: string) {
    return this.prisma.driver.delete({
      where: { id },
    })
  }
}
