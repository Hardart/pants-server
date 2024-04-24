import { Schema, model, InferSchemaType } from 'mongoose'

const CategorySchema = new Schema(
  {
    title: String,
    slug: String,
    image: String,
    description: String,
    articleIds: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false, toObject: { virtuals: true } }
)

CategorySchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
    delete ret.__v
  },
})

export type Category = InferSchemaType<typeof CategorySchema>
export type CategoryWithID = Category & { id: string }
export const Category = model('Category', CategorySchema)
