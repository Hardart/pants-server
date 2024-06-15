import type { Response, Request } from 'express'
import trackService from '../service/track-service'
import trackArchiveService from '../service/track-archive-service'

class TrackController {
  async list(req: Request, res: Response) {
    const tracks = await trackService.list()
    res.status(200).json(tracks)
  }

  async archive(req: Request, res: Response) {
    const date = req.query.dateFilter
    if (typeof date !== 'string') {
      res.status(200).json(false)
    } else {
      const archive = await trackService.archive(date)
      const firstItemDate = await trackArchiveService.firstItemDate()
      res.status(200).json({ archive, startFrom: firstItemDate })
    }
  }
}

export default new TrackController()
