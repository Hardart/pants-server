import { Track } from '../models/Track'

export class TrackArchiveService {
  
  async list() {
    return await Track.find().limit(40).select('-updatedAt -preview').sort({ createdAt: 'desc' })
  }

  async count() {
    return await Track.find().countDocuments()
  }
}

export default new TrackArchiveService()
