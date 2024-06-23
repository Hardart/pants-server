import { Schema, model, InferSchemaType } from 'mongoose'

const PhoneSchema = new Schema(
  {
    number: { type: String, required: true }
  },
  { timestamps: false, versionKey: false }
)

PhoneSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
  }
})

export type Phone = InferSchemaType<typeof PhoneSchema>
export const Phone = model('Phone', PhoneSchema)
