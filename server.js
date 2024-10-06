const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/userRoutes'); // User routes
const propertyRoutes = require('./routes/propertyRoutes'); // Property routes
const propertyImageRoutes = require('./routes/propertyImageRoutes'); // Property image routes
const plotRoutes = require('./routes/plotRoutes'); // Plot routes for background map

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use(express.static(path.join(__dirname, './uploads')));
app.use('/api/auth', authRoutes); // User-related routes
app.use('/api/property', propertyRoutes); // Property-related routes
app.use('/api/propertyImages', propertyImageRoutes); // Property image routes
app.use('/api/plots', plotRoutes); // Plot routes for background map

const PORT = process.env.PORT || 5000;

// Optional: Test route for property
app.get('/api/property', (req, res) => {
  res.send(propertyRoutes);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
