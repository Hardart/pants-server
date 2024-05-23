import { Schema, model, InferSchemaType } from 'mongoose'
enum ContactType {
  PHONE = 'phone',
  MAIL = 'mail',
  LINK = 'link'
}
const ContactSchema = new Schema(
  {
    label: { type: String, required: true },
    type: { type: String, enum: ContactType, required: true },
    mail: String,
    phone: String,
    text: String,
    href: String,
    priority: Number
  },
  { timestamps: true, versionKey: false, toObject: { virtuals: true } }
)

ContactSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
  }
})

export type Contact = InferSchemaType<typeof ContactSchema>
export const Contact = model('Contact', ContactSchema)
