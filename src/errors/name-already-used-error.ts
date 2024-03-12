class NameAlreadyUsedError extends Error {
  constructor(message: string = 'The provided name is already in use. Please use a different name.') {
    super(message)
    this.name = 'NameAlreadyUsedError'
  }
}

export { NameAlreadyUsedError }
