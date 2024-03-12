class LicensePlateAlreadyRegistered extends Error {
  constructor(message: string = 'The provided license plate is already in our system.') {
    super(message)
    this.name = 'LicensePlateAlreadyRegistered'
  }
}

export { LicensePlateAlreadyRegistered }
