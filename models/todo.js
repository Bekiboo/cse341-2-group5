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
    // doer: {
    //   type: Object,
    //   required: true,
    //},
    creator: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Todo', todoSchema)