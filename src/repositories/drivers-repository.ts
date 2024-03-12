import { PrismaClient, Driver } from '@prisma/client'
import { CreateDriverBody } from '../modules/drivers/schemas/create-driver'
import { db } from '../config/db'

export default class DriversRepository {
  private db: PrismaClient

  constructor() {
    this.db = db
  }

  public create(driver: CreateDriverBody) {
    return this.db.driver.create({
      data: driver,
    })
  }

  public findManyByName(name: string | undefined): Promise<Driver[]> {
    return this.db.driver.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    })
  }

  public findOneByName(name: string) {
    return this.db.driver.findUnique({
      where: { name },
    })
  }

  public findById(id: string) {
    return this.db.driver.findUnique({
      where: { id },
    })
  }

  public update(id: string, driver: Partial<Driver>) {
    return this.db.driver.update({
      where: { id },
      data: driver,
    })
  }

  public delete(id: string) {
    return this.db.driver.delete({
      where: { id },
    })
  }
}
