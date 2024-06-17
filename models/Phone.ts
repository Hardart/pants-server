import { Schema, model, InferSchemaType } from 'mongoose'

const PhoneSchema = new Schema(
  {
    number: { type: String, required: true },
    label: { type: String, required: true },
    showIn: { type: [String], enum: ['footer', 'contacts', 'commersial'] },
    priority: Number
  },
  { timestamps: false, versionKey: false, toObject: { virtuals: true } }
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
