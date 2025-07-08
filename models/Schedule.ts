import { Schema, model, InferSchemaType } from 'mongoose'

const ScheduleSchema = new Schema(
  {
    startTime: { type: String, required: true },
    duration: { type: Number, required: true },
    dayIndex: { type: Number, required: true },
    dayRange: { type: Number, required: true },
    isReplay: { type: Boolean, default: false },
    priority: { type: Number }
  },
  { timestamps: false, versionKey: false, toObject: { virtuals: true } }
)

ScheduleSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
  }
})
ScheduleSchema.set('toObject', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
  }
})

export type Schedule = InferSchemaType<typeof ScheduleSchema>
export const Schedule = model('Schedule', ScheduleSchema)
