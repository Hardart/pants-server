import { Schema, model, InferSchemaType } from 'mongoose'
import { Phone } from './Phone'
import { Mail } from './Mail'
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
    mailId: { type: Schema.Types.ObjectId, ref: Mail },
    phoneId: { type: Schema.Types.ObjectId, ref: Phone },
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
    ret.phone = ret.phoneId
    ret.mail = ret.mailId
    delete ret._id
    delete ret.phoneId
    delete ret.mailId
  }
})

export type Contact = InferSchemaType<typeof ContactSchema>
export const Contact = model('Contact', ContactSchema)
