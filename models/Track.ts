import { Schema, model, InferSchemaType } from 'mongoose'

const TrackSchema = new Schema(
  {
    artistName: String,
    trackTitle: String,
    cover: String,
    preview: String,
  },
  { timestamps: true, versionKey: false, toObject: { virtuals: true } }
)

TrackSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
  },
})

export type Track = InferSchemaType<typeof TrackSchema>
export const Track = model('Track', TrackSchema)
