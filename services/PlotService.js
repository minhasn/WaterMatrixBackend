const plotModel = require('../models/PlotModel');

const getAllPlots = async () => {
  try {
    return await plotModel.getAllPlots();
  } catch (error) {
    throw new Error('Service Error: ' + error.message);
  }
};

module.exports = {
  getAllPlots,
};
