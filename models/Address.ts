import { Schema, model, InferSchemaType } from 'mongoose'

const AddressSchema = new Schema(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true },
    mapUrl: {
      yandex: { type: String, required: true }
    }
  },
  { timestamps: false, versionKey: false }
)

AddressSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
  }
})

export type Address = InferSchemaType<typeof AddressSchema>
export const Address = model('Address', AddressSchema)
