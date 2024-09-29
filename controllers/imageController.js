const PropertyImage = require('../models/PropertyImage');

class PropertyImageController {
  static async addImage(req, res) {
    const { propertyId, imageUrl } = req.body;
    try {
      const newImage = await PropertyImage.create({ propertyId, imageUrl });
      res.status(201).json(newImage);
    } catch (error) {
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