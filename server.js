const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/userRoutes'); // Make sure this is the correct path
const propertyRoutes = require('./routes/propertyRoutes');
const propertyImageRoutes = require('./routes/propertyImageRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Adjusted base path for user-related routes
app.use('/api/auth', authRoutes); // User routes prefixed with /api/auth
app.use('/api/property', propertyRoutes); // Property routes prefixed with /api/property
app.use('/api/propertyImages', propertyImageRoutes); // Corrected to plural for consistency

const PORT = process.env.PORT || 5000;

app.get('/api/property', (req, res) => {
  res.send( propertyRoutes);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
