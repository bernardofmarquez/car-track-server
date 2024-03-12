class FutureStartDate extends Error {
  constructor(message: string = 'The provided start date is in the future.') {
    super(message)
    this.name = 'FutureStartDate'
  }
}

export { FutureStartDate }
