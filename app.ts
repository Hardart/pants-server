import express from 'express'
import routerV1 from './router/v1'
import routerV2 from './router/v2'
import { ErrorHandler } from './middlewear/error-middleware'
import cors from 'cors'
import cookerParser from 'cookie-parser'
import otherRoutes from './handlers/routes-handler'

const app = express()

const allowedOrigin = process.env.NODE_ENV === 'production' ? 'https://radioshtani.ru' : 'http://localhost:3000'

app.use(express.json())
app.use(express.static('assets'))
app.use(cookerParser())
app.use(cors({ credentials: true, origin: allowedOrigin }))
app.use('/api/v1', routerV1)
app.use('/api/v2', routerV2)

app.use('*', otherRoutes)
app.use(ErrorHandler)

export default app
