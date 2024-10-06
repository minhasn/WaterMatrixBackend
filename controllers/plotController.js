import { getAllPlots } from "../models/PlotModel";

const getPlots = async (req, res) => {
  try {
    const plots = await getAllPlots();
    res.status(200).json(plots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getPlots,
};
