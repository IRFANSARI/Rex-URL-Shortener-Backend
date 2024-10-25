const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    shortURL: {
      type: String,
      required: true,
      unique: true,
    },
    longURL: {
      type: String,
      required: true,
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
