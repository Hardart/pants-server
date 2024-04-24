import type { Response, Request } from 'express'
import trackService from '../service/track-service'

class TrackController {
  async list(req: Request, res: Response) {
    const tracks = await trackService.list()
    res.status(200).json(tracks)
  }

  async archive(req: Request, res: Response) {
    const date = req.query.dateFilter
    const archive = await trackService.archive(`${date}`)
    res.status(200).json({ archive })
  }
}

export default new TrackController()
