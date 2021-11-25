import { LetterCaptchaValidator } from './letter-captcha-body-validator'

const makeSut = (): LetterCaptchaValidator => {
  return new LetterCaptchaValidator()
}

describe('LetterCaptcha Validator', () => {
  it('Should return an error if file is not provided', () => {
    const sut = makeSut()
    const body = {}
    const result = sut.validate(body)
    expect(result).toBeInstanceOf(Error)
  })

  it('Should return null on successes', () => {
    const sut = makeSut()
    const body = {
      file: 'valid_file'
    }
    const result = sut.validate(body)
    expect(result).toBeNull()
  })
})
