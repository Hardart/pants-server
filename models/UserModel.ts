import mongoose, { Schema, model, InferSchemaType } from 'mongoose'
import AppError from '../handlers/error-handler'

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: String,
    roles: { type: [String], default: ['editor'], required: true }
  },
  {
    timestamps: false,
    versionKey: false
  }
)

UserSchema.post('save', function (error: Error, _: any, next: mongoose.CallbackWithoutResultAndOptionalError) {
  if (error instanceof mongoose.mongo.MongoError) {
    next(AppError.BadRequest('Пользователь с таким Email уже существует'))
  } else {
    next()
  }
})

UserSchema.set('toJSON', {
  versionKey: false,
  virtuals: true
})

UserSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName
})

export type User = InferSchemaType<typeof UserSchema> & { fullName?: string }
export const User = model('User', UserSchema)
