import { Schema, model, InferSchemaType } from 'mongoose'

const AddressSchema = new Schema(
  {
    region: { type: String, required: true },
    district: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String },
    locality: { type: String },
    houseNumber: { type: Number },
    appartment: { type: Number },
    zip: { type: Number, required: true },
    yaMapUrl: { type: String }
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
