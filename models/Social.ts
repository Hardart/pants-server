import { Schema, model, InferSchemaType } from 'mongoose'

const SocialSchema = new Schema(
  {
    imageUrl: { type: String, required: true },
    to: { type: String, required: true }
  },
  { timestamps: false, versionKey: false, toObject: { virtuals: true } }
)

SocialSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
  }
})

export type Social = InferSchemaType<typeof SocialSchema>
export const Social = model('Social', SocialSchema)
