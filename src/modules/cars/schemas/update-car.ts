import { CreateCarBody, createCarJsonSchema } from './create-car'

export const updateCarJsonSchema = createCarJsonSchema

export type UpdateCarBody = CreateCarBody
