const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/userRoutes'); // Adjust this path as necessary
const propertyRoutes = require('./routes/propertyRoutes');
const i8_4326Routes = require('./routes/i8_4326Routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
app.use('/api/auth', authRoutes); // User routes prefixed with /api/auth
app.use('/api/property', propertyRoutes); // Property routes prefixed with /api/property
app.use('/api/polygons', i8_4326Routes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
