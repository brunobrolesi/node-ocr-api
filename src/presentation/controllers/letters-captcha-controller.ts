import { ReadLettersFromCaptcha } from '../../domain/usecases/read-letters-from-captcha'
import { badRequest } from '../helpers/http-helper'
import { BodyValidator } from '../protocols/body-validator-protocol'
import { Controller } from '../protocols/controller-protocol'
import { HttpRequest, HttpResponse } from '../protocols/http-protocol'

export class LettersCaptchaController implements Controller {
  constructor (
    private readonly bodyValidator: BodyValidator,
    private readonly captchaReader: ReadLettersFromCaptcha
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.bodyValidator.validate(httpRequest.body)
    if (error) return badRequest(error)
    const { file } = httpRequest.body
    this.captchaReader.read(file)
  }
}
