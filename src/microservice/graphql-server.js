import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';

const Location ={
  DALLAS: 'Dallas, Texas',
  PARIS: 'Paris, France',
}

const houses = [
  { id: '1', key: 'house-1', homeStyle: 'Farmhouse', location: 'Location.DALLAS', name: 'Beautiful Dallas Farmhouse', price: 200000.00},
  { id: '2', key: 'house-2', homeStyle: 'Farmhouse', location: Location.PARIS, name: 'Beautiful Dallas Farmhouse', price: 300000.00},
];

// Root resolvers
const resolvers = {
  Query: {
    getHouse: (_, args) => houses.find((house) => house.id === args.id),
    getHouseList: (_, args) => houses.find((house) => house.location === args.location),
    getSearchResults: (_, args) => houses.find((house) => house.location === args.location && house.homeStyle === args.homeStyle),
  },
};

// Load schema from file
const typeDefs = gql`
type House {
  id: ID!
  key: String!
  homeStyle: String!
  location: String!
  name: String!
  price: Float!
}

type HouseList {
  location: String!
  houses : [House!]!
}

type Query {
  getHouse(id: ID!): House!
  getHouseList(location: String!): [HouseList!]!
  getSearchResults(id: ID!): [House!]!
}`

// Create executable schema
const server = new ApolloServer({ typeDefs, resolvers, cors: {
  origin: 'http://localhost:5173', // Replace with your React app's URL
  credentials: true,
}, });

// Express app setup
const app = express();

await server.start();
// GraphQL endpoint
server.applyMiddleware({ app });


// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
