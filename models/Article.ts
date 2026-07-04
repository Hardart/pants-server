import { Schema, model, InferSchemaType } from 'mongoose'

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: [true, 'Поле SLUG обязательно!'], trim: true },
    image: String,
    content: { type: String, required: true },
    publishAt: { type: Schema.Types.Date, default: new Date() },
    isPublished: { type: Boolean, default: false },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: [String]
  },
  { timestamps: true, versionKey: false }
)

ArticleSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    //@ts-ignore
    ret.category = ret.categoryId
    //@ts-ignore
    delete ret._id
    //@ts-ignore
    delete ret.categoryId
    //@ts-ignore
    ret.to = `/${ret.category.slug}/${ret.slug}`
  }
})

export type Article = InferSchemaType<typeof ArticleSchema>
export type ArticleWithID = Article & { id: string }
export const Article = model('Article', ArticleSchema)
