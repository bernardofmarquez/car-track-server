import { JSONSchema7 } from 'json-schema'
import { FromSchema } from 'json-schema-to-ts'

const createDriverSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['name'],
} as const

export const createDriverJsonSchema: JSONSchema7 = {
  ...createDriverSchema,
  required: ['name'],
  additionalProperties: false,
}

export type CreateDriverBody = FromSchema<typeof createDriverSchema>
