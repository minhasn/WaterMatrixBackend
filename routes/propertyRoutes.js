const express = require('express');
const router = express.Router();
const { addProperty, getProperties } = require('../controllers/propertyController');

router.post('/addproperty', addProperty);  // Route to add a property
router.get('/properties', getProperties);    // Route to get all properties

module.exports = router;
