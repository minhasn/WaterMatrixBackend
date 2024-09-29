const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const propertyImageRoutes=require('./routes/propertyImageRoutes');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema'); 
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/property', propertyRoutes);
app.use('/propertyImageRoutes', propertyImageRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Backend is working!');
});
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enable GraphiQL interface for testing
}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
