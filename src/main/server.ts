import { existsSync, mkdirSync } from 'fs'
import path from 'path'
import app from './config/app'
import env from './config/env'

const port = env.port

const uploadDir = path.join(__dirname, '../uploads')

if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir)
}

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
