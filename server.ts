import * as dotenv from 'dotenv'
import app from './app'
import mongoose from 'mongoose'
import ErrorService from './service/error-service'

dotenv.config({ path: __dirname + '/.env' })

const PORT = process.env.PORT || 3070

startServer()

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_DB || '')
    console.log('====================================')
    console.log(`БД подключена`)
  } catch (error) {
    console.log('====================================')
    console.error(`ERROR: Ошибка при подключении к БД!!!`)
    ErrorService.append(error)
  }
  app.listen(PORT, () => {
    console.log('====================================')
    console.log(`Сервер запущен, порт: ${PORT}`)
    console.log('====================================')
  })
}
