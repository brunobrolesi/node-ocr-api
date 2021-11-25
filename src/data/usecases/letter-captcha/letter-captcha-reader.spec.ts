import { Ocr } from '../../protocols/ocr'
import { LetterCaptchaReader } from './letter-captcha-reader'

const makeOcrStub = (): Ocr => {
  class OcrStub implements Ocr {
    async read (file: object): Promise<string> {
      return await Promise.resolve('text')
    }
  }

  return new OcrStub()
}

interface SutTypes {
  sut: LetterCaptchaReader
  ocrStub: Ocr
}

const makeSut = (): SutTypes => {
  const ocrStub = makeOcrStub()
  const sut = new LetterCaptchaReader(ocrStub)

  return {
    sut,
    ocrStub
  }
}

const makeFakeFile = (): object => ({
  data: 'valid_file'
})

describe('LetterCaptchaReader', () => {
  it('Should call ocr with correct value', async () => {
    const { sut, ocrStub } = makeSut()
    const readSpy = jest.spyOn(ocrStub, 'read')
    await sut.read(makeFakeFile())
    expect(readSpy).toHaveBeenCalledWith(makeFakeFile())
  })

  it('Should returns a string on success', async () => {
    const { sut } = makeSut()
    const letters = await sut.read(makeFakeFile())
    expect(letters).toBe('text')
  })
})
