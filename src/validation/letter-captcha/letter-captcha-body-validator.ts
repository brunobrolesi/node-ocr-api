import Joi from 'joi'
import { BodyValidator } from '../../presentation/protocols/body-validator-protocol'

export class LetterCaptchaValidator implements BodyValidator {
  validate (body: object): Error {
    const schema = Joi.object({
      file: Joi.string().required()
    })

    const { error } = schema.validate(body)

    if (error) return new Error(error.message)

    return null
  }
}
