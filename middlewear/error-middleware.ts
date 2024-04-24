import { Response, Request, ErrorRequestHandler, NextFunction } from 'express'
import AppError from '../handlers/error-handler'
import { ResponseStatuses } from '../enums/responseStatuses'
import mongoose from 'mongoose'

export const ErrorHandler: ErrorRequestHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || ResponseStatuses.ERROR

  const { status, message, statusCode, errors, stack } = err

  switch (process.env.NODE_ENV) {
    case 'development':
      if (err instanceof mongoose.Error.ValidationError) console.error('%s: ValidationError 🧨', ResponseStatuses.ERROR)
      res.status(statusCode).json({ status, message, errors, stack, error: err })
      break
    case 'production':
      switch (true) {
        case err instanceof mongoose.mongo.MongoServerError && err.code === 11000:
          err = AppError.custom(11000)
          res.status(err.statusCode).json({ status: ResponseStatuses.FAIL, message: err.message, errors: err.errors })
          break
        case err.isOperational:
          res.status(statusCode).json({ status, message, errors })
          break
        case err instanceof mongoose.Error.ValidationError:
          err = AppError.ValidationError(err)
          res.status(err.statusCode).json({ status: ResponseStatuses.FAIL, message: err.message, errors: err.errors })
          break
        default:
          res.status(statusCode).json({ status: ResponseStatuses.ERROR, message: 'Неизвестная ошибка, сообщите разработчику', errors })
      }

      break
    default:
      res.status(statusCode).json({ status, message, errors })
  }
}
