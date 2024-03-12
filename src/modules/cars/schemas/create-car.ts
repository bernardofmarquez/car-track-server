import { JSONSchema7 } from 'json-schema'
import { FromSchema } from 'json-schema-to-ts'

const createCarSchema = {
  type: 'object',
  properties: {
    licensePlate: {
      type: 'string',
      pattern: '^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$',
    },
    color: {
      type: 'string',
      minLength: 1,
    },
    brand: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['licensePlate', 'color', 'brand'],
  additionalProperties: false,
} as const

export const createCarJsonSchema: JSONSchema7 = {
  ...createCarSchema,
  required: ['licensePlate', 'color', 'brand'],
  additionalProperties: false,
}

export type CreateCarBody = FromSchema<typeof createCarSchema>
