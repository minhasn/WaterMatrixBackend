const PropertyImage = require('../models/PropertyImage');
const fs = require('fs').promises;

class PropertyImageController {
  static async addImage(req, res) {
    const { propertyId } = req.body;
    const imageFile = req.file; // Assuming you're using multer for file uploads

    if (!imageFile) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    try {
      // Read the file and convert to base64
      const imageBuffer = await fs.readFile(imageFile.path);
      const base64Image = imageBuffer.toString('base64');

      // Create image URL (adjust this based on your server setup)
      const imageUrl = `/uploads/${imageFile.filename}`;

      const newImage = await PropertyImage.create({ 
        propertyId, 
        imageData: base64Image,
        imageUrl 
      });

      // Delete the temporary file
      await fs.unlink(imageFile.path);

      res.status(201).json(newImage);
    } catch (error) {
      console.error('Error adding image:', error);
      res.status(500).json({ error: 'Failed to add image' });
    }
  }


  static async getImages(req, res) {
    const { propertyId } = req.params;
    try {
      const images = await PropertyImage.getByPropertyId(propertyId);
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve images' });
    }
  }

  static async deleteImage(req, res) {
    const { id } = req.params;
    try {
      await PropertyImage.delete(id);
      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete image' });
    }
  }
}

module.exports = PropertyImageController;
