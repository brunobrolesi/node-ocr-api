import { Ocr } from '../../../data/protocols/ocr'
import { ImageAnnotatorClient } from '@google-cloud/vision'
import path from 'path'

export class GoogleVisionAdapter implements Ocr {
  async read (file: string): Promise<string> {
    const client = new ImageAnnotatorClient({
      keyFilename: path.join(__dirname, '../../../../api-key.json')
    })

    const [result] = await client.textDetection(file)
    const texts = result.textAnnotations
    return texts[0].description.replace(/\s/g, '')
  }
}
