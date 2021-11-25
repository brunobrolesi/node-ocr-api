import multer from 'multer'
import path from 'path'

const uploadsDir = path.join(__dirname, '../../uploads')

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, uploadsDir),
  filename: (req, file, callback) => {
    const filename = `${Date.now()}-${file.originalname}`
    req.body.file = path.join(uploadsDir, filename)
    return callback(null, filename)
  }
})

const uploads = multer({ storage: storage })

export default uploads
