require('dotenv').config();
const crypto = require('crypto');
const linkModel = require('../models/linkModel');
const BASE_URL = process.env.BASE_URL;

async function getLinks(url) {
  if (url) {
    return await linkModel.findOne({
      $or: [{ shortURL: url }, { longURL: url }],
    });
  } else {
    return await linkModel.find();
  }
}

async function createLink(longURL) {
  const hash = crypto
    .createHash('md5')
    .update(longURL.toString())
    .digest('hex');

  const shortURL = BASE_URL + hash.substring(0, 6);
  return await linkModel.create({
    shortURL,
    longURL,
  });
}

async function deleteLink(url) {
  return await linkModel.findOneAndDelete({
    $or: [{ shortURL: url }, { longURL: url }],
  });
}

module.exports = {
  getLinks,
  createLink,
  deleteLink,
};
