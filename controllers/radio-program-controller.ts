import type { Response, Request } from 'express'
import radioProgramService from '../service/radio-program-service'

class RadioProgramController {
  async list(req: Request, res: Response) {
    const programs = await radioProgramService.list()
    res.status(200).json({ programs })
  }

  async schedule(req: Request, res: Response) {
    const schedule = await radioProgramService.schedule()
    res.status(200).json(schedule)
  }

  async oneBySlug(req: Request, res: Response) {
    const program = await radioProgramService.oneBySlug(req.params.slug)
    res.status(200).json(program)
  }
}

export default new RadioProgramController()
