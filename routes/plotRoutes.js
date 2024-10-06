const express = require('express');
const router = express.Router();
const {getPlots} = require('../controllers/plotController');

router.get('/plots', getPlots);

module.exports = router;
