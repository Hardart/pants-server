import type { Response, Request, NextFunction } from 'express'
import programService from '../service/program-service'


class ProgramController {
  async schedule(req: Request, res: Response, next: NextFunction) {
    const schedule = await programService.schedule()
    res.status(200).json(schedule)
  }
  
  async list(req: Request, res: Response, next: NextFunction) {
    const programs = await programService.list()
    res.status(200).json({programs})
  }

  async oneBySlug(req: Request, res: Response, next: NextFunction) {
    const program = await programService.oneBySlug(req.params.slug)
    res.status(200).json(program)
  }
}

export default new ProgramController()
