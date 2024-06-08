import { Schema, model, InferSchemaType } from 'mongoose'

const MailSchema = new Schema(
  {
    title: { type: String, required: true }
  },
  { timestamps: false, versionKey: false, toObject: { virtuals: true } }
)

MailSchema.set('toJSON', {
  versionKey: false
})

export type Mail = InferSchemaType<typeof MailSchema>
export const Mail = model('Mail', MailSchema)
