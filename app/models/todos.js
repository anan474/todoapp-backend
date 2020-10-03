const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const TodoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: true
    },
    done: {
      type: Boolean,
      default: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
TodoSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Todo', TodoSchema)
