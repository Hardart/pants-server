import type { Response, Request, NextFunction } from 'express'
import AppError from './error-handler'

export default function otherRoutes(req: Request, res: Response, next: NextFunction) {
  next(AppError.NoRoute(req.originalUrl))
}
