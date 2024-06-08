import { Schema, model, InferSchemaType } from 'mongoose'

const PhoneSchema = new Schema(
  {
    number: { type: String, required: true }
  },
  { timestamps: false, versionKey: false, toObject: { virtuals: true } }
)

export type Phone = InferSchemaType<typeof PhoneSchema>
export const Phone = model('Phone', PhoneSchema)
