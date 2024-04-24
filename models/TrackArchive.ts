import { Schema, model, InferSchemaType } from 'mongoose'

const ArchiveTrackSchema = new Schema(
  {
    createdAt: {type: Date, required: true},
    trackId: { type: Schema.Types.ObjectId, ref: 'Track', required: true }
  },
  { timestamps: true, versionKey: false, toObject: { virtuals: true } }
)

ArchiveTrackSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
  
  },
})

export type ArchiveTrack = InferSchemaType<typeof ArchiveTrackSchema>
export const ArchiveTrack = model('ArchiveTrack', ArchiveTrackSchema)
