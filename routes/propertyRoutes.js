const express = require('express');
const router = express.Router();
const { addProperty, getProperties } = require('../controllers/propertyController');
const multer = require('multer');
const path = require('path');

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to save images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  }
});

const upload = multer({ storage });

// Route to add a property with images
router.post('/addproperty', upload.array('images',5), addProperty);  // Allow up to 5 images
router.get('/properties', getProperties);    // Route to get all properties
router.get('/properties/:id', getPropertyById);


module.exports = router;
