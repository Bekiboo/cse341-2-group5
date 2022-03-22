const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    doer: {
      type: Schema.Types.ObjectId,
      ref: 'Family',
      required: true,
    },
    creator: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Todo', todoSchema)