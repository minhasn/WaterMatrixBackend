const express = require('express');
const router = express.Router();
const i8_4326Controller = require('../controllers/i8_4326Controller');

// Define the routes
router.post('/', i8_4326Controller.createPolygon); // Create a new polygon
router.get('/', i8_4326Controller.getAllPolygons); // Get all polygons
router.get('/:id', i8_4326Controller.getPolygonById); // Get a polygon by ID
router.put('/:id', i8_4326Controller.updatePolygon); // Update a polygon by ID
router.delete('/:id', i8_4326Controller.deletePolygon); // Delete a polygon by ID

module.exports = router;
