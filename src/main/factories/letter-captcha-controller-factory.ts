import { LetterCaptchaReader } from '../../data/usecases/letter-captcha/letter-captcha-reader'
import { GoogleVisionAdapter } from '../../infra/api/google-vision/google-vision-adapter'
import { LettersCaptchaController } from '../../presentation/controllers/letters-captcha-controller'
import { LetterCaptchaValidator } from '../../validation/letter-captcha/letter-captcha-body-validator'

export const makeLetterCaptchaController = (): LettersCaptchaController => {
  const ocr = new GoogleVisionAdapter()
  const captchaReader = new LetterCaptchaReader(ocr)
  const bodyValidator = new LetterCaptchaValidator()
  return new LettersCaptchaController(bodyValidator, captchaReader)
}
