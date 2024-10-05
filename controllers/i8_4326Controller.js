const I8_4326 = require('../models/I8_4326');

// Create a new polygon
exports.createPolygon = async (req, res) => {
  try {
    const { id_0, dimension, landuse_su, landuse__1, propertyno, sub_sector, sector, WKT, geometry } = req.body;
    const polygon = await I8_4326.create({
      id_0, dimension, landuse_su, landuse__1, propertyno, sub_sector, sector, WKT, geometry
    });
    res.status(201).json(polygon);
  } catch (error) {
    console.error('Error creating polygon:', error); // Log the actual error
    res.status(500).json({ error: error.message || 'Error creating polygon' });
  }
};

// Get all polygons
exports.getAllPolygons = async (req, res) => {
  try {
    const polygons = await I8_4326.findAll();
    res.status(200).json(polygons);
  } catch (error) {
    console.error('Error fetching polygons:', error); // Log the actual error
    res.status(500).json({ error: error.message || 'Error fetching polygons' });
  }
};

// Get a polygon by ID
exports.getPolygonById = async (req, res) => {
  try {
    const polygon = await I8_4326.findByPk(req.params.id);
    if (polygon) {
      res.status(200).json(polygon);
    } else {
      res.status(404).json({ error: 'Polygon not found' });
    }
  } catch (error) {
    console.error('Error fetching polygon:', error); // Log the actual error
    res.status(500).json({ error: error.message || 'Error fetching polygon' });
  }
};

// Update a polygon
exports.updatePolygon = async (req, res) => {
  try {
    const { id_0, dimension, landuse_su, landuse__1, propertyno, sub_sector, sector, WKT, geometry } = req.body;
    const polygon = await I8_4326.findByPk(req.params.id);
    if (polygon) {
      polygon.id_0 = id_0;
      polygon.dimension = dimension;
      polygon.landuse_su = landuse_su;
      polygon.landuse__1 = landuse__1;
      polygon.propertyno = propertyno;
      polygon.sub_sector = sub_sector;
      polygon.sector = sector;
      polygon.WKT = WKT;
      polygon.geometry = geometry;
      await polygon.save();
      res.status(200).json(polygon);
    } else {
      res.status(404).json({ error: 'Polygon not found' });
    }
  } catch (error) {
    console.error('Error updating polygon:', error); // Log the actual error
    res.status(500).json({ error: error.message || 'Error updating polygon' });
  }
};

// Delete a polygon
exports.deletePolygon = async (req, res) => {
  try {
    const polygon = await I8_4326.findByPk(req.params.id);
    if (polygon) {
      await polygon.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Polygon not found' });
    }
  } catch (error) {
    console.error('Error deleting polygon:', error); // Log the actual error
    res.status(500).json({ error: error.message || 'Error deleting polygon' });
  }
};
