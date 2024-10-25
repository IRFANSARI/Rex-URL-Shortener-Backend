require('dotenv').config();
const crypto = require('crypto');
const linkModel = require('../models/linkModel.js');
const BASE_URL = process.env.BASE_URL;

async function getLinks(url) {
  if (url) {
    return await linkModel.findOne({
      $or: [{ shortURL: url }, { longURL: url }],
    });
  }
  return await linkModel.find();
}

async function createLink(longURL) {
  const existingLink = await linkModel.findOne({ longURL });
  if (existingLink) {
    return existingLink;
  }

  const hash = crypto.createHash('md5').update(longURL).digest('hex');
  const shortURL = BASE_URL + hash.substring(0, 6);

  const newLink = await linkModel.create({
    shortURL,
    longURL,
  });

  return newLink;
}

async function updateLink(req, res) {}

async function deleteLink(url) {
  return await linkModel.findOneAndDelete({
    $or: [{ shortURL: url }, { longURL: url }],
  });
}

async function getLongURLAndIncreaseVisits(shortURL) {
  const url = BASE_URL + shortURL;
  return await linkModel.findOneAndUpdate(
    { shortURL: url },
    { $inc: { visits: 1 } },
    { new: true }
  );
}

module.exports = {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
  getLongURLAndIncreaseVisits,
};
