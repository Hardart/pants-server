import { Schema, model, InferSchemaType } from 'mongoose'

const MailSchema = new Schema(
  {
    address: { type: String, required: true },
    label: { type: String, required: true },
    showIn: { type: [String], enum: ['footer', 'contacts', 'commersial'] },
    priority: Number
  },
  { timestamps: false, versionKey: false, toObject: { virtuals: true } }
)

MailSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
  }
})

export type Mail = InferSchemaType<typeof MailSchema>
export const Mail = model('Mail', MailSchema)
