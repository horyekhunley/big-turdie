const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  
  dateOfBirth: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    default: 'no-image.png'
  },
},
  { timestamps: true }
)
module.exports = mongoose.model('User', userSchema)