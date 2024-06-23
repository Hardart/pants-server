import { Schema, model, InferSchemaType } from 'mongoose'
import { Phone } from './Phone'
import { Mail } from './Mail'
import { Address } from './Address'
import { Social } from './Social'

const ContactSchema = new Schema(
  {
    section: { type: String, enum: ['footer', 'contacts', 'commersial'] },
    emails: [
      {
        id: { type: Schema.Types.ObjectId, ref: Mail, alias: 'address' },
        label: { type: String, required: true },
        description: String,
        priority: Number
      }
    ],
    phones: [
      {
        id: { type: Schema.Types.ObjectId, ref: Phone },
        label: { type: String, required: true },
        description: String,
        priority: Number
      }
    ],
    addresses: [
      {
        id: { type: Schema.Types.ObjectId, ref: Address },
        label: { type: String, required: true },
        description: String,
        priority: Number
      }
    ],
    socials: [
      {
        social: { type: Schema.Types.ObjectId, ref: Social },
        label: { type: String, required: true },
        description: String,
        priority: Number
      }
    ]
  },
  { timestamps: false, versionKey: false }
)

ContactSchema.post('findOne', async function (contact) {
  await contact.populate({ path: 'phones.id', transform: (d: any) => (d == null ? null : d.number) })
  await contact.populate({ path: 'emails.id', transform: (d: any) => (d == null ? null : d.address) })
  await contact.populate({
    path: 'addresses.id',
    transform: (d: Address | null) =>
      d == null ? null : { fullAddress: combineAddressString(d), yaMapUrl: d.yaMapUrl }
  })
})

export type Contact = InferSchemaType<typeof ContactSchema>
export const Contact = model('Contact', ContactSchema)

function combineAddressString(a: Address) {
  const city = a.city ? `${a.city}, ` : ''
  const locality = a.locality ? `${a.locality}, ` : ''
  return `${a.region}, ${a.district}, ${city}${locality}${a.street}, ${a.houseNumber}`
}
