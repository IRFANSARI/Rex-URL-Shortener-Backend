const linkService = require('../services/linkService');

async function getLinks(req, res) {
  try {
    if (req.query.url) {
      const link = await linkService.getLinks(req.username, req.query.url);
      return res.status(200).json(link);
    }

    if (!req.username) {
      return res.status(401).json({
        message: 'Please login or provide url parameter to use this feature',
      });
    }

    const links = await linkService.getLinks(req.username);
    res.status(200).json(links);
  } catch (error) {
    const message = error.message;
    res.status(500).json({ message });
  }
}

async function createLink(req, res) {
  try {
    const newLink = await linkService.createLink(req.username, req.body.url);
    res.status(201).json(newLink);
  } catch (error) {
    const message = error.message;
    res.status(500).json({ message });
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
    const message = error.message;
    if (error.message === 'Link not found') {
      return res.status(404).json({ message });
    }

    if (error.message === 'You are not authorized to update this link') {
      return res.status(403).json({ message });
    }

    res.status(500).json({ message });
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

    res.status(200).send({ message: 'Link deleted successfully', deletedLink });
  } catch (error) {
    const message = error.message;
    if (error.message === 'Link not found') {
      return res.status(404).json({ message });
    }

    if (error.message === 'You are not authorized to delete this link') {
      return res.status(403).json({ message });
    }

    res.status(500).json({ message });
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

    if (link.status !== 'active') {
      return res.status(404).json({ message: 'Link is inactive' });
    }

    return res.status(302).redirect(link.longURL);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
  redirectShortURL,
};
