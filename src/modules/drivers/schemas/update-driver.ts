import { CreateDriverBody, createDriverJsonSchema } from './create-driver'

export const updateDriverJsonSchema = createDriverJsonSchema

export type UpdateDriverBody = CreateDriverBody
