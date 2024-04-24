import { Schema, model, InferSchemaType } from 'mongoose'

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
})

export type Token = InferSchemaType<typeof TokenSchema>
export const Token = model('Token', TokenSchema)
