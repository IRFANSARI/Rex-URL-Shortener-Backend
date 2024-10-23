const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

router
  .route('/')
  .get('/', linkController.getLinks)
  .post('/', linkController.createLink)
  .delete('/', linkController.deleteLink);

router.get('/:shortURL', linkController.redirectShortURL);

module.exports = router;
