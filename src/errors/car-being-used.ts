class CarBeingUsed extends Error {
  constructor(message: string = 'The provided car is being used at the moment.') {
    super(message)
    this.name = 'CarBeingUsed'
  }
}

export { CarBeingUsed }
