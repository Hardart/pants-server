import { Schema, model, InferSchemaType } from 'mongoose'
import { Phone } from './Phone'
import { Mail } from './Mail'
import { Address } from './Address'

const ContactSchema = new Schema(
  {
    label: { type: String, required: true },
    mailId: { type: Schema.Types.ObjectId, ref: Mail },
    phoneId: { type: Schema.Types.ObjectId, ref: Phone },
    addressId: { type: Schema.Types.ObjectId, ref: Address },
    showTo: { type: [String], enum: ['footer', 'contacts', 'commersial'] },
    priority: Number
  },
  { timestamps: true, versionKey: false }
)

ContactSchema.set('toJSON', {
  versionKey: false,
  transform: function (_, ret) {
    ret.phone = ret.phoneId
    ret.mail = ret.mailId
    ret.address = ret.addressId
    delete ret.phoneId
    delete ret.mailId
    delete ret.addressId
  }
})

export type Contact = InferSchemaType<typeof ContactSchema>
export const Contact = model('Contact', ContactSchema)
