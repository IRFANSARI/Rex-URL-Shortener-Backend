const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: true
    },
    shortURL: {
      type: String,
      required: true,
      unique: true,
    },
    longURL: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: String,
    },
    visits: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

const linkModel = mongoose.model('links', linkSchema);
module.exports = linkModel;
