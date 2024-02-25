import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

// INSTRUCTIONS: Run node src/microservice/graphql-server.js to start the graphql server

const Location = {
  DALLAS: "Dallas, Texas",
  PARIS: "Paris, France",
};

// TODO: Add at least 9 house records over three locations
// TODO: Add a description field that details the house's features
const houses = [
  {
    id: "1",
    description:
      "Nestled in Dallas, this beautiful home captivates with its timeless architecture and lush surroundings. The exterior boasts a perfect blend of modern and classic design, complemented by well-maintained gardens. Inside, sunlit rooms and high-end finishes create an elegant atmosphere, with expansive windows offering stunning views of the city. The master suite, complete with a private balcony, provides a tranquil escape, making this Dallas residence a perfect blend of luxury and comfort.",
    key: "house-1",
    homeStyle: "Farmhouse",
    location: Location.DALLAS,
    name: "Beautiful Dallas Farmhouse",
    price: "$200,000",
  },
  {
    id: "2",
    description:
      "Perched in the heart of Paris, this stunning home is a testament to the city's timeless elegance and sophisticated charm. The exterior, adorned with wrought-iron balconies and ivy-covered walls, exudes a quintessential Parisian allure. As you enter, the interiors unfold with a seamless blend of historic details and modern amenities, creating a luxurious yet inviting atmosphere. With its panoramic views of iconic landmarks like the Eiffel Tower and the Seine River, this Parisian abode captures the romantic essence of the city, offering an enchanting haven in the midst of cultural richness.",
    key: "house-2",
    homeStyle: "Farmhouse",
    location: Location.PARIS,
    name: "Beautiful Paris Farmhouse",
    price: "300,000",
  },
  {
    id: "3",
    description:
      "Perched in the heart of Paris, this stunning home is a testament to the city's timeless elegance and sophisticated charm. The exterior, adorned with wrought-iron balconies and ivy-covered walls, exudes a quintessential Parisian allure. As you enter, the interiors unfold with a seamless blend of historic details and modern amenities, creating a luxurious yet inviting atmosphere. With its panoramic views of iconic landmarks like the Eiffel Tower and the Seine River, this Parisian abode captures the romantic essence of the city, offering an enchanting haven in the midst of cultural richness.",
    key: "house-3",
    homeStyle: "Chateau",
    location: Location.PARIS,
    name: "Gorgeous Paris Chateau",
    price: "300,000",
  },
];

const resolvers = {
  Query: {
    getHouse: (_, args) => houses.find((house) => house.id === args.id),
    getHouseList: (_, args) => [
      {
        location: args.location,
        houses: houses.filter((house) => house.location === args.location),
      },
    ],
    getSearchResults: (_, args) =>
      houses.filter(
        (house) =>
          house.location === args.location &&
          (!args.homeStyle || house.homeStyle === args.homeStyle)
      ),
    getAllResults: () => houses,
  },
};

const typeDefs = gql`
  type House {
    id: ID
    description: String
    key: String
    homeStyle: String
    location: String
    name: String
    price: String
  }

  type HouseList {
    location: String!
    houses: [House]
  }

  type Query {
    getHouse(id: ID!): House!
    getHouseList(location: String!): [HouseList!]!
    getSearchResults(location: String, homeStyle: String): [House!]!
    getAllResults: [House!]!
  }
`;

// Create executable schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: "http://localhost:5173", // Replace with your React app's URL
    credentials: true,
  },
});

// Express app setup
const app = express();

await server.start();
server.applyMiddleware({ app });

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
