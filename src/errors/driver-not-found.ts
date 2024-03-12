class DriverNotFound extends Error {
  constructor(message: string = 'The provided driver does not exist on our system.') {
    super(message)
    this.name = 'DriverNotFound'
  }
}

export { DriverNotFound }
