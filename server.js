const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Importing routes
const authRoutes = require('./routes/userRoutes'); // User routes
const propertyRoutes = require('./routes/propertyRoutes'); // Property routes
const propertyImageRoutes = require('./routes/propertyImageRoutes'); // Property image routes
const plotRoutes = require('./routes/plotRoutes'); // Plot routes for background map

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve images

// Use property routes with multer integrated
app.use('/api/property', propertyRoutes); // Property-related routes

// Other routes
app.use('/api/auth', authRoutes); // User-related routes
app.use('/api/propertyImages', propertyImageRoutes); // Property image routes
app.use('/api/plots', plotRoutes); // Plot routes for background map

const PORT = process.env.PORT || 5000;

// Optional: Test route for property
app.get('/api/property', (req, res) => {
  res.send('Property route is working!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
