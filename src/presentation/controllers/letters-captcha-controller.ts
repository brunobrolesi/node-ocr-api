import { BodyValidator } from '../protocols/body-validator-protocol'
import { Controller } from '../protocols/controller-protocol'
import { HttpRequest, HttpResponse } from '../protocols/http-protocol'

export class LettersCaptchaController implements Controller {
  constructor (private readonly bodyValidator: BodyValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.bodyValidator.validate(httpRequest.body)
    return null
  }
}
