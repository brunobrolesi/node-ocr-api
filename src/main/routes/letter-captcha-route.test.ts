import path from 'path'
import request from 'supertest'
import app from '../config/app'

describe('LetterCaptcha Routes', () => {
  describe('POST /api/letter-captcha', () => {
    it('Should return correct letter on success', async () => {
      const response = await request(app)
        .post('/api/letter-captcha')
        .attach('file', path.join(__dirname, '../../../file-test/sample.jpeg'))
        .expect(200)

      expect(response.body.data).toBe('56DF2')
    })
  })
})
