const express = require('express');
const router = express.Router();
const i8_4326Controller = require('../controllers/i8_4326Controller');

// Define the routes
router.post('/', i8_4326Controller.createPolygon);
router.get('/', i8_4326Controller.getAllPolygons);
router.get('/:id', i8_4326Controller.getPolygonById);
router.put('/:id', i8_4326Controller.updatePolygon);
router.delete('/:id', i8_4326Controller.deletePolygon);

module.exports = router;
