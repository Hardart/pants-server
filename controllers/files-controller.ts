import type { Response, Request, NextFunction } from 'express'
import fileService from '../service/file-service'
import AppError from '../handlers/error-handler'

class FileController {
  async upload(req: Request, res: Response, next: NextFunction) {
    if (!req.file) throw AppError.BadRequest('При загрузке изображения произошла ошибка')
    const path = req.file.path.replace('assets', '')
    res.status(200).json({ path })
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ file: req.body })
  }

  async list(req: Request, res: Response, next: NextFunction) {
    const files = fileService.readImages(req.body.src)
    res.status(200).json({ files })
  }
}

export default new FileController()
