// Home, Seach, Contact
const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController')

router.get('/searchs', siteController.searchs);
router.get('/', siteController.home);


module.exports = router;

