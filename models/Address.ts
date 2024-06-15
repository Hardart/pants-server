import { Schema, model, InferSchemaType } from 'mongoose'

const AddressSchema = new Schema(
  {
    text: { type: String, required: true },
    href: { type: String, required: true }
  },
  { timestamps: false, versionKey: false }
)

export type Address = InferSchemaType<typeof AddressSchema>
export const Address = model('Address', AddressSchema)
