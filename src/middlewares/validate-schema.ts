import Ajv from 'ajv'
import { NextFunction, Request, Response } from 'express'
import { JSONSchema7 } from 'json-schema'

const addFormats = require('ajv-formats').default

export default function validateSchema(schema: JSONSchema7) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ajv = new Ajv({ allErrors: true })
    addFormats(ajv)
    const validate = ajv.compile(schema)
    const bodyValidation = validate(req.body)

    if (!bodyValidation) {
      return res.status(400).send(validate.errors)
    }

    return next()
  }
}
