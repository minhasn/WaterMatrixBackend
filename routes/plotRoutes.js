const express = require('express');
const router = express.Router();
const plotController = require('../controllers/plotController').default;

router.get('/plots', plotController.getPlots);

module.exports = router;
