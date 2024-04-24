import { Schema, model, InferSchemaType } from 'mongoose'

const TagSchema = new Schema(
  {
    title: { type: String, required: true },
  },
  { timestamps: false, versionKey: false, toObject: { virtuals: true } }
)

TagSchema.set('toJSON', {
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id
    delete ret.__v
  },
})

// TagSchema.post('find', (res, next) => {
//   if (!res) return next()
//   res = res.map((item: any) => item.title)
//   console.log(res)
//   next()
// })

export type Tag = InferSchemaType<typeof TagSchema>
export const Tag = model('Tag', TagSchema)
