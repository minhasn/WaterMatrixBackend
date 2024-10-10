const pool = require('../config/db');

// Function to fetch all plots from the database
const getAllPlots = async () => {
  try {
    const [rows] = await pool.promise().query(`
     SELECT WKT, id_0, id, dimension, landuse_su, landuse__1, propertyno, sub_sector, sector, geometry
FROM I8_4326
    `);
    return rows;
   
  } catch (error) {
    throw new Error('Error fetching plot data: ' + error.message);
  }
};

module.exports = {
  getAllPlots,
};
