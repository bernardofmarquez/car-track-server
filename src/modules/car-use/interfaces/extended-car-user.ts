import { CarUse, Driver, Car } from '@prisma/client'

interface ExtendedCarUse extends Omit<CarUse, 'driverId' | 'carId'> {
  driver: Driver;
  car: Car;
}

export default ExtendedCarUse
