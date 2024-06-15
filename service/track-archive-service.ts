import { Track } from '../models/Track'
import { ArchiveTrack } from '../models/TrackArchive'

export class TrackArchiveService {
  async list() {
    return await Track.find().limit(40).select('-updatedAt -preview').sort({ createdAt: 'desc' })
  }

  async count() {
    return await Track.find().countDocuments()
  }

  async firstItemDate() {
    const track = await ArchiveTrack.find().limit(1)
    return track[0].createdAt
  }
}

export default new TrackArchiveService()
