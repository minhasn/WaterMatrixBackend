const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');
const db = require('./db'); // Assuming you have a db.js file for MySQL connection

// Define User Type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    UserId: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone_number: { type: GraphQLString },
    country: { type: GraphQLString },
    city: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          db.query('SELECT * FROM users WHERE UserId = ?', [args.id], (err, results) => {
            if (err) reject(err);
            resolve(results[0]);
          });
        });
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          db.query('SELECT * FROM users', (err, results) => {
            if (err) reject(err);
            resolve(results);
          });
        });
      },
    },
  },
});

// Mutations (for login and registration)
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    registerUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        password_hash: { type: GraphQLString },
        country: { type: GraphQLString },
        city: { type: GraphQLString },
      },
      resolve(parent, args) {
        // Implement user registration logic here
        // Make sure to hash the password before storing it
        return new Promise((resolve, reject) => {
          const { name, email, phone_number, password_hash, country, city } = args;
          const createdAt = new Date().toISOString();
          db.query(
            'INSERT INTO users (name, email, phone_number, password_hash, country, city, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, email, phone_number, password_hash, country, city, createdAt],
            (err, results) => {
              if (err) reject(err);
              resolve({ ...args, UserId: results.insertId, created_at: createdAt });
            }
          );
        });
      },
    },
    loginUser: {
      type: UserType,
      args: {
        phone_number: { type: GraphQLString },
        password_hash: { type: GraphQLString },
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          db.query('SELECT * FROM users WHERE phone_number = ? AND password_hash = ?', [args.phone_number, args.password_hash], (err, results) => {
            if (err) reject(err);
            if (results.length > 0) {
              resolve(results[0]);
            } else {
              reject(new Error('Invalid phone number or password'));
            }
          });
        });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
