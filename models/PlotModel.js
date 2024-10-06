const pool = require('../config/db');

// Function to fetch all plots from the database
const getAllPlots = async () => {
  try {
    const [rows] = await pool.promise().query(`
      SELECT OGR_FID, SHAPE, entity, layer, plotid, plot_num, address1, address2, city, desc_
      FROM i_8_plot_4326_uni
    `);
    return rows;
   
  } catch (error) {
    throw new Error('Error fetching plot data: ' + error.message);
  }
};

module.exports = {
  getAllPlots,
};
