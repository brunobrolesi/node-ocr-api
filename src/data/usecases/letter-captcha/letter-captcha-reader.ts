import { ReadLettersFromCaptcha } from '../../../domain/usecases/read-letters-from-captcha'
import { Ocr } from '../../protocols/ocr'

export class LetterCaptchaReader implements ReadLettersFromCaptcha {
  constructor (private readonly ocr: Ocr) {}
  async read (file: object): Promise<string> {
    await this.ocr.read(file)
    return null
  }
}
