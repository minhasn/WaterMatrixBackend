const express = require('express');
const router = express.Router();
const { addProperty, getProperties, getPropertyById } = require('../controllers/propertyController');
const multer = require('multer');
const path = require('path');

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads'); // Using dynamic path
    console.log('Uploading file to:', uploadPath); // Debugging log
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Route to add a property with images
router.post('/addproperty', upload.array('images', 5), addProperty); // Allow up to 5 images
router.get('/properties', getProperties); // Get all properties
router.get('/:id', getPropertyById); // Get property by ID

module.exports = router;
