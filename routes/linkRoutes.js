const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

// router
//   .route('/')
//   .get(linkController.getAllLinks)
//   .post(linkController.createLink)
//   .delete(linkController.deleteLink);

router.route('/').get(linkController.getLinkByURL);

module.exports = router;
