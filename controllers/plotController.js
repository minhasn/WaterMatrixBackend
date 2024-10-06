// plotController.js
const plotService = require('../services/PlotService');

const getPlots = async (req, res) => {
  try {
    const plots = await plotService.getAllPlots();
    res.status(200).json(plots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {getPlots};
