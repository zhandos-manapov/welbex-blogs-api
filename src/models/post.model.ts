import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    message: {
      type: String,
      required: [true, 'Post message must be provided'],
    },
    media: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Post', PostSchema)
