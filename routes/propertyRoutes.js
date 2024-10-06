const express = require('express');
const router = express.Router();
const { addProperty, getProperties, getPropertyById } = require('../controllers/propertyController');
const multer = require('multer');
const path = require('path');

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads'); // Correct relative path to the uploads folder
    console.log('Saving files to:', uploadPath); // Debugging: logs the actual path
    cb(null, uploadPath); // This ensures the files go to the correct directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  }
});

const upload = multer({ storage });
// Route to add a property with images
router.post('/addproperty', upload.array('images',5), addProperty);  // Allow up to 5 images
router.get('/properties', getProperties);    
router.get('/properties/:id', getPropertyById);


module.exports = router;
