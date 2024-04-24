import { Track } from '../models/Track'
import { ArchiveTrack } from '../models/TrackArchive'

export class TrackService {
  static async findOne(artistName: string, trackTitle: string) {
    return await Track.findOne({ artistName, trackTitle })
  }

  async list() {
    return await Track.find().select('-updatedAt -preview').sort({ createdAt: 'desc' })
  }

  async archive(date: string) {
    const from = new Date(date)
    const to = new Date(Date.parse(date) + 3 * 3600 * 1000)

    return await ArchiveTrack.aggregate([
      {
        $match: { createdAt: { $gte: from, $lt: to } }
      },
      {
        $lookup: {
          from: 'tracks',
          localField: 'trackId',
          foreignField: '_id',
          as: 'track'
        }
      },
      {
        $unwind: '$track'
      },
      {
        $addFields: {
          artistName: '$track.artistName',
          trackTitle: '$track.trackTitle',
          cover: '$track.cover',
          preview: '$track.preview',
          id: '$_id'
        }
      },
      {
        $project: { track: 0, trackId: 0, _id: 0 }
      },
      {
        $sort: { createdAt: -1 }
      }
    ])
  }

  async count() {
    return await Track.find().countDocuments()
  }
}

export default new TrackService()
