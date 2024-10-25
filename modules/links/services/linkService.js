require('dotenv').config();
const crypto = require('crypto');
const linkModel = require('../models/linkModel.js');
const BASE_URL = process.env.BASE_URL;

async function getLinks(username, url) {
  if (url) {
    const link = await linkModel.findOne({ shortURL: url });
    return link;
  }

  const links = await linkModel.find({ createdBy: username });
  return links;
}

async function createLink(username, longURL) {
  const existingLink = await linkModel.findOne({ username, longURL });
  if (existingLink) {
    return existingLink;
  }

  const hash = crypto
    .createHash('md5')
    .update(longURL + username)
    .digest('hex');
  const shortURL = BASE_URL + hash.substring(0, 6);

  const newLink = await linkModel.create({
    shortURL,
    longURL,
    createdBy: username,
  });

  return newLink;
}

async function updateLink(username, url, status) {
  const link = await linkModel.findOne({ shortURL: url });

  if (!link) {
    throw new Error('Link not found');
  }

  if (username !== link.createdBy) {
    throw new Error('You are not authorized to update this link');
  }

  if (status == link.status) {
    return link;
  }

  return linkModel.findOneAndUpdate(
    { shortURL: url },
    { status },
    { new: true }
  );
}

async function deleteLink(username, url) {
  const link = await linkModel.findOne({ shortURL: url });

  if (!link) {
    throw new Error('Link not found');
  }

  if (username !== link.createdBy) {
    throw new Error('You are not authorized to delete this link');
  }

  const deletedLink = await linkModel.findOneAndDelete({ shortURL: url });
  console.log(deletedLink);
  return deletedLink;
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
