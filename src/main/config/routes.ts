import { Express } from 'express'
import letterCaptchaRouter from '../routes/letter-captcha-route'

export default (app: Express): void => {
  app.use(letterCaptchaRouter)
}
