class DriverAlreadyUsingCar extends Error {
  constructor(message: string = 'The provided driver is already using a car.') {
    super(message)
    this.name = 'DriverAlreadyUsingCar'
  }
}

export { DriverAlreadyUsingCar }
