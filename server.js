// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/userRoutes'); // Adjust this path as necessary
const propertyRoutes = require('./routes/propertyRoutes');
const propertyImageRoutes = require('./routes/propertyImageRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes); // User routes prefixed with /api/auth
app.use('/api/property', propertyRoutes); // Property routes prefixed with /api/property
app.use('/api/propertyImages', propertyImageRoutes); // Property image routes

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
