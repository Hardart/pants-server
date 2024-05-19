import { Schema, model, InferSchemaType } from 'mongoose'

const SlideSchema = new Schema(
  {
    src: { type: String, required: true },
    title: String,
    subtitle: String,
    to: String
  },
  { timestamps: true, versionKey: false, toObject: { virtuals: true } }
)

SlideSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
  }
})

export type Slide = InferSchemaType<typeof SlideSchema>
export const Slide = model('Slide', SlideSchema)
