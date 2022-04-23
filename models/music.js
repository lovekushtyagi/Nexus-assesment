const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const MusicSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    // default: new Date(Date.now)
  },
  artist: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true
  },
  mp3File: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('music', MusicSchema);