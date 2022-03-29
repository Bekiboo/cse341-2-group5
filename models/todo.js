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
    member: [{
      type: Schema.Types.ObjectId,
      ref: 'Family',
      required: true,
    }],
    completed: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Todo', todoSchema)