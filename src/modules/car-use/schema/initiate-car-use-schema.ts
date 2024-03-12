import { JSONSchema7 } from 'json-schema'
import { FromSchema } from 'json-schema-to-ts'

const initiateCarUseSchema = {
  type: 'object',
  properties: {
    driverId: {
      type: 'string',
      minLength: 1,
    },
    carId: {
      type: 'string',
      minLength: 1,
    },
    usageReason: {
      type: 'string',
      minLength: 1,
    },
    startDate: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['driverId', 'carId', 'usageReason', 'startDate'],
  additionalProperties: false,
} as const

export const initiateCarUseJsonSchema: JSONSchema7 = {
  ...initiateCarUseSchema,
  required: ['driverId', 'carId', 'usageReason', 'startDate'],
  additionalProperties: false,
}

export type InitiateCarUseBody = FromSchema<typeof initiateCarUseSchema>
