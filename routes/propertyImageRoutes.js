const express = require('express');
const router = express.Router();
const PropertyImageController = require('../controllers/imageController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


// Route to add an image
router.post('/property-images', upload.single('image'), PropertyImageController.addImage);

// Route to get images by property ID
router.get('/property/:propertyId', PropertyImageController.getImages);

// Route to delete an image
router.delete('/:id', PropertyImageController.deleteImage);


module.exports = router;