import { BodyValidator } from '../protocols/body-validator-protocol'
import { HttpRequest } from '../protocols/http-protocol'
import { LettersCaptchaController } from './letters-captcha-controller'

const makeBodyValidatorStub = (): BodyValidator => {
  class BodyValidatorStub implements BodyValidator {
    validate (body: object): Error {
      return null
    }
  }

  return new BodyValidatorStub()
}

interface SutTypes {
  sut: LettersCaptchaController
  bodyValidatorStub: BodyValidator
}

const makeSut = (): SutTypes => {
  const bodyValidatorStub = makeBodyValidatorStub()
  const sut = new LettersCaptchaController(bodyValidatorStub)

  return {
    sut,
    bodyValidatorStub
  }
}

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    file: 'valid_file'
  }
})

describe('LettersCaptcha Controller', () => {
  it('Should call Body Validator with correct values', async () => {
    const { sut, bodyValidatorStub } = makeSut()
    const validateSpy = jest.spyOn(bodyValidatorStub, 'validate')
    await sut.handle(makeFakeHttpRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeHttpRequest().body)
  })
})
