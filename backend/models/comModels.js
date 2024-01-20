const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  character: {type: mongoose.Schema.Types.ObjectId, ref: 'Character'}
})

module.exports = mongoose.model('Comment', commentSchema);