import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLetterCaptchaController } from '../factories/letter-captcha-controller-factory'
import uploads from '../middlewares/multer'

const router = Router()

router.post('/api/letter-captcha', uploads.single('file'), adaptRoute(makeLetterCaptchaController()))

export default router
