import { ReadLettersFromCaptcha } from '../../domain/usecases/read-letters-from-captcha'
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

const makeReadLettersFromCaptchaStub = (): ReadLettersFromCaptcha => {
  class ReadLettersFromCaptchaStub implements ReadLettersFromCaptcha {
    async read (file: string): Promise<string> {
      return await Promise.resolve('letters')
    }
  }

  return new ReadLettersFromCaptchaStub()
}

interface SutTypes {
  sut: LettersCaptchaController
  bodyValidatorStub: BodyValidator
  captchaReader: ReadLettersFromCaptcha
}

const makeSut = (): SutTypes => {
  const bodyValidatorStub = makeBodyValidatorStub()
  const captchaReader = makeReadLettersFromCaptchaStub()
  const sut = new LettersCaptchaController(bodyValidatorStub, captchaReader)

  return {
    sut,
    bodyValidatorStub,
    captchaReader
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

  it('Should return 400 and error message if body is not valid', async () => {
    const { sut, bodyValidatorStub } = makeSut()
    jest.spyOn(bodyValidatorStub, 'validate').mockReturnValueOnce(new Error('error_message'))
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toEqual('error_message')
  })

  it('Should call Captcha Reader with correct value', async () => {
    const { sut, captchaReader } = makeSut()
    const readSpy = jest.spyOn(captchaReader, 'read')
    await sut.handle(makeFakeHttpRequest())
    expect(readSpy).toHaveBeenCalledWith(makeFakeHttpRequest().body.file)
  })

  it('Should return 200 and correct letters on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response.statusCode).toEqual(200)
    expect(response.body.data).toEqual('letters')
  })

  it('Should return 500 if Captcha Reader throws', async () => {
    const { sut, captchaReader } = makeSut()
    jest.spyOn(captchaReader, 'read').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response.statusCode).toEqual(500)
    expect(response.body.error).toEqual('internal server error')
  })
})
