const express = require('express');
const router = express.Router();

const { addProperty, getProperties } = require('../controllers/propertyController');

router.post('/addproperty', addProperty);
router.get('/properties', getProperties);

module.exports = router;
