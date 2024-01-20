const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // image: {
  //   type: String,
  //   required: true
  // },
  // comments: [
  //   {
  //     text: String,
  //     created: {type: Date, default: Data.now},
  //     postedBy: {type: O}
  //   }
  //]
}, {timestamps: true})

module.exports = mongoose.model('Character', characterSchema);

// every characted needs to have a unique name, description, image, comment section, and maybe rating