const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    unique: true,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,

  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: 'no-image.png'
  },
},
  { timestamps: true }
)
module.exports = mongoose.model('User', userSchema)