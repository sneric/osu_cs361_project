import fetch from 'node-fetch';

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


  const getAppActivityDateQuery = `
  query GetAppActivityDate {
    getAppActivityDate {
      date
    }
  }
`;

fetch(graphqlEndpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: getAppActivityDateQuery}),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Response from Server:', data);
  })
  .catch((error) => console.error('Error:', error));

  const updateAppActivityDateQuery = `
  query UpdateAppActivityDate {
    updateAppActivityDate {
      date
    }
  }
`;

fetch(graphqlEndpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: updateAppActivityDateQuery}),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Response from Server:', data);
  })
  .catch((error) => console.error('Error:', error));