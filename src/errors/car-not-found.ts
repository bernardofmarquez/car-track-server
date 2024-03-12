class CarNotFound extends Error {
  constructor(message: string = 'The provided car does not exist on our system.') {
    super(message)
    this.name = 'CarNotFound'
  }
}

export { CarNotFound }
