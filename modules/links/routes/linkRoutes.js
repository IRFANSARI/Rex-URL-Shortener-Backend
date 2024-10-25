const router = require('express').Router();
const linkController = require('../controllers/linkController.js');

router
  .route('/')
  .get(linkController.getLinks)
  .post(linkController.createLink)
  .patch(linkController.updateLink)
  .delete(linkController.deleteLink);

router.get('/:shortURL', linkController.redirectShortURL);

module.exports = router;
