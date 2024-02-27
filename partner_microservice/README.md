# Communication Contract for Microservice

This README serves as a communication contract for the microservice. It provides clear instructions on how to programmatically request and receive data from the microservice.

### Endpoints

#### GraphQL Schema
```graphql

type DayDiff {
  days: Int!
}

type AppDate {
  date: String!
}

type Query {
  cardActivityDayDiff(date: String!): DayDiff
  getAppActivityDate: AppDate
  updateAppActivityDate: AppDate
}
```

#### Endpoint Usage
1. cardActivityDayDiff: send in a ISO Date Timestamp and recieve the number of days between the input the app's last activity ISO Date Timestamp

2. getAppActivityDate: send in no arguments and recieve the app's last activity ISO Date Timestamp

3. updateAppActivityDate: send in on arguments and update the app's last activity ISO Date Timestamp to now

## How to run the Microservice

1. Change directory to  ./partner_microservice

2. Within the terminal, run `npm install` to install packages required to run the microservice

3. To run the microservice server, run `node server.js` in the terminal. The server will run on 'http://localhost:3001/graphql'

## How to REQUEST Data

To request data, you can use the `node-fetch` API to call an avaliable GraphQL endpoint on the localhost:

```javascript
const graphqlEndpoint = 'http://localhost:3001/graphql';

const cardActivityDate = new Date().toISOString();

const cardActivityDayDiffQuery = `
  query CardActivityDayDiff($date: String!) {
    cardActivityDayDiff(date: $date) {
      days
    }
  }
`;

fetch(graphqlEndpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: cardActivityDayDiffQuery, variables: {date: cardActivityDate }}),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Response from Server:', data);
  })
  .catch((error) => console.error('Error:', error));
```

## How to RECEIVE Data

When you make a request to the microservice, it will return a response. This response contains the data you requested. Here is an example response from the `cardActivityDayDiff` GraphQL endpoint:

```javascript
{
  "data": {
    "cardActivityDayDiff": {
      "days": 3
    }
  }
}
```

In this example, the response.json() method is used to convert the response data to a JavaScript object. This object can then be used to access the data you requested.

The actual structure of the data will depend on the specific endpoint you are requesting from. Refer to the endpoint descriptions in this README for more information on what data each endpoint returns.


## UML Sequence Diagram

![UML Diagram](./UML.png)
