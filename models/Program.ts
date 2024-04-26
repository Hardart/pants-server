import { Schema, model, InferSchemaType } from 'mongoose'
import { User } from './UserModel'

const ProgramSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: String,
    image: String,
    hosts: [{ type: Schema.Types.ObjectId, ref: User }],
    schedule: [{
      weekdayIds: [Number],
      properties: [
        {
          start: {
            hh: { type: String, required: true },
            mm: { type: String, required: true }
          },
          end: {
            hh: { type: String, required: true },
            mm: { type: String, required: true }
          },
          isReplay: { type: Boolean, default: false }
        }
      ]
    }],
    isPublished: { type: Boolean, default: false }
  },
  { timestamps: false, versionKey: false, toObject: { virtuals: true } }
)

ProgramSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
  },
})

export type Program = InferSchemaType<typeof ProgramSchema>
export const Program = model('Program', ProgramSchema)
