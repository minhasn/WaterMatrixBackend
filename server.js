const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const app = express();
const propertyImageRoutes = require('./routes/propertyImageRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userFavoriteRoutes = require('./routes/userFavoriteRoutes');
const userContactedPropertyRoutes = require('./routes/userContactedPropertyRoutes');
const otpRoutes = require('./routes/otpRoutes');


app.use(bodyParser.json());
app.use(cors());

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/property', propertyRoutes);

app.use('/api', propertyRoutes);
app.use('/api', propertyImageRoutes);
app.use('/api', chatRoutes);
app.use('/api', messageRoutes);
app.use('/api', userFavoriteRoutes);
app.use('/api', userContactedPropertyRoutes);
app.use('/api', otpRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
