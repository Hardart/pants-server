import express from 'express'
import routerV1 from './router/v1'
import { ErrorHandler } from './middlewear/error-middleware'
import cors from 'cors'
import cookerParser from 'cookie-parser'
import otherRoutes from './handlers/routes-handler'

const app = express()

app.use(express.json())
app.use(express.static('assets'))
app.use(cookerParser())
app.use(cors({ credentials: true, origin: 'https://radioshtani.ru' }))
app.use('/api/v1', routerV1)

app.use('*', otherRoutes)
app.use(ErrorHandler)

export default app
