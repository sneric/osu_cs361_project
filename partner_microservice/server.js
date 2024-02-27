// server.ts

import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema'
import { importSchema } from 'graphql-import';


const microservice_data = {
  app_last_activity_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
}

function updateAppActivityDate() {
  microservice_data.app_last_activity_date = new Date();
  return microservice_data.app_last_activity_date;
}

// Root resolvers
const resolvers = {
  Query: {
    cardActivityDayDiff: (_, { date }) => {
      const diffTime = Math.abs(new Date(date) - new Date(microservice_data.app_last_activity_date));
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
      return { days: diffDays || 0 };
    },
    getAppActivityDate: () => {
      return { date: microservice_data.app_last_activity_date.toISOString() };
    },
    updateAppActivityDate: () => {
      return { date: updateAppActivityDate().toISOString() };
    },
  },
};

// Load schema from file
const typeDefs = importSchema('./schema.graphql');

// Create executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Express app setup
const app = express();

// GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL for easy testing
  })
);

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
