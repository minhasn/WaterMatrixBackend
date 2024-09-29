const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const propertyImageRoutes=require('./routes/propertyImageRoutes');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/property', propertyRoutes);
app.use('/propertyImageRoutes', propertyImageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
