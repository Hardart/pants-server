import type { Response, Request, NextFunction } from 'express'
import { ResponseStatuses } from '../enums/responseStatuses'
import mongoose from 'mongoose'

export function asyncErrorHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next)
}

export function isError(error: any): error is NodeJS.ErrnoException {
  return error instanceof Error
}

export default class AppError extends Error {
  statusCode
  isOperational
  errors
  status

  constructor(statusCode: number, message: string, errors: any[] = []) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    this.errors = errors
    this.status = `${statusCode}`.startsWith('4') ? ResponseStatuses.FAIL : ResponseStatuses.ERROR

    Error.captureStackTrace(this, this.constructor)
  }

  static BadRequest(message: string, errors?: any[]) {
    return new AppError(400, message, errors)
  }

  static NoEnvVariable(varaible: string) {
    return new AppError(404, `Переменной ${varaible} нет в файле .env`)
  }

  static NoRoute(URLPath: string) {
    return new AppError(404, `API по адресу ${URLPath} не существует либо укзан неверный метод запроса данных`)
  }

  static NoItemById(item: 'Category' | 'Article' | 'User', id: string) {
    return new AppError(404, `${item} c ID: ${id} не существует`)
  }

  static UnathorizedError() {
    return new AppError(401, 'Пользователь не авторизован')
  }

  static articleExist() {
    return new AppError(11000, 'Новость с таким слагом уже существует')
  }

  static userUpdateFail(message: string) {
    return new AppError(400, message)
  }

  static ValidationError(err: mongoose.Error.ValidationError) {
    const mongooseError = { ...err } as unknown as mongoose.Error.ValidationError
    const values = Object.values(mongooseError.errors)
    const errors = values.map(e => {
      return { message: e.message, path: e.path, value: e.value }
    })
    return new AppError(400, 'Ошибка при валидации данных', errors)
  }

  static custom(code?: number | string) {
    const errors = [
      { code: -66, message: 'Удаление невозможно! Папка, которую Вы пытаетесь удалить, содержит файлы' },
      { code: 11000, message: 'Новость с таким слагом уже существует' },
      { code: 'id', message: 'Параметр ID в запросе отсутствует или имеет не верный формат' },
    ]
    const message = errors.find(er => er.code == code)?.message || 'Не обработанная ошибка, сообщите разработчику'
    return new AppError(400, message)
  }
}
