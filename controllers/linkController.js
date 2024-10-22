const linkService = require('../services/linkService');

async function getAllLinks(req, res) {
  try {
    const links = await linkService.getAllLinks();
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ ErrorMessage: 'Error fetching links', error });
  }
}

async function createLink(req, res) {
  try {
    const newLink = await linkService.createLink(req.body.url);
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ ErrorMessage: 'Error creating link', error });
  }
}

async function deleteLink(req, res) {
  try {
    const deletedLink = await linkService.deleteLink(req.body.url);
    if (!deletedLink) {
      return res.status(404).json({ ErrorMessage: 'Link not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ ErrorMessage: 'Error deleting link', error });
  }
}

async function getLinkByURL(req, res) {
  try {
    console.log(req.query.url);
    const link = await linkService.getLinkByURL(req.query.url);
    if (!link) {
      return res.status(404).json({ ErrorMessage: 'Link not found' });
    }
    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ ErrorMessage: 'Error fetching link', error });
  }
}

module.exports = {
  getAllLinks,
  createLink,
  deleteLink,
  getLinkByURL,
};
