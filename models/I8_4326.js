const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const I8_4326 = sequelize.define('I8_4326', {
  id_0: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dimension: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  landuse_su: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  landuse__1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  propertyno: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sub_sector: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sector: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  WKT: {
    type: DataTypes.TEXT, // WKT format for storing geometries
    allowNull: true,
  },
  geometry: {
    type: DataTypes.GEOMETRY('POLYGON'), // Storing polygons
    allowNull: false,
  },
}, {
  tableName: 'I8_4326',
  timestamps: true, // Assuming created_at and updated_at fields
});

module.exports = I8_4326;
