const express = require('express');
const router = express.Router();
const PropertyImageController = require('../controllers/imageController');

// Route to add an image
router.post('/', PropertyImageController.addImage);

// Route to get images by property ID
router.get('/property/:propertyId', PropertyImageController.getImages);

// Route to delete an image
router.delete('/:id', PropertyImageController.deleteImage);

module.exports = router;