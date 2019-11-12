const express = require('express');
const { json, urlencoded } = require('body-parser');
// import '@babel/polyfill';
const app = express();

const router = require('./routes');
// setup postgress db

app.use(json());
app.use(
  urlencoded({
    extended: true,
  }),
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});


app.use('/api/v1', router);

const port = 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
