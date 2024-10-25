const linkService = require('../services/linkService');

async function getLinks(req, res) {
  try {
    if (req.params.url) {
      const link = await linkService.getLinks(req.query.url);
      return res.status(200).json(link);
    }

    if (!req.username) {
      res.status(401).json({
        message: 'Please login or provide url parameter to use this feature',
      });
    }

    const links = await linkService.getLinks(username);
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching links', error });
  }
}

async function createLink(req, res) {
  try {
    const newLink = await linkService.createLink(req.username, req.body.url);
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ message: 'Error creating link', error });
  }
}

async function updateLink(req, res) {
  try {
    if (!req.username) {
      return res
        .status(401)
        .json({ message: 'Please login to use this feature' });
    }

    const link = await linkService.updateLink(
      req.username,
      req.body.url,
      req.body.status
    );

    return res.status(200).json(link);
  } catch (error) {
    if (error.message === 'Link not found') {
      return res.status(404).json({ message: error.message });
    }

    if (error.message === 'You are not authorized to update this link') {
      return res.status(403).json({ message: error.message });
    }

    res.status(500).json({ message: 'Error updating link', error });
  }
}

async function deleteLink(req, res) {
  try {
    if (!req.username) {
      return res
        .status(401)
        .json({ message: 'Please login to use this feature' });
    }

    const deletedLink = await linkService.deleteLink(
      req.username,
      req.body.url
    );

    res.status(204).send({ message: 'Link deleted successfully', deletedLink });
  } catch (error) {
    if (error.message === 'Link not found') {
      return res.status(404).json({ message: error.message });
    }

    if (error.message === 'You are not authorized to delete this link') {
      return res.status(403).json({ message: error.message });
    }

    res.status(500).json({ message: 'Error deleting link', error });
  }
}

async function redirectShortURL(req, res) {
  try {
    const link = await linkService.getLongURLAndIncreaseVisits(
      req.params.shortURL
    );

    if (!link) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    return res.status(302).redirect(link.longURL);
  } catch (error) {
    return res.status(500).json({ message: 'Error redirecting URL', error });
  }
}

module.exports = {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
  redirectShortURL,
};
