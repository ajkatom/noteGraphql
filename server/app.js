const express = require('express');
const graphlHTTP = require('express-graphql');
const schema = require('./db/schema').default;
const app = express();



app.get('/', (req, res, next) => {
  res.json({
    message: 'noteTaking API V1',
  });
});

app.use(
  '/graphql',
  graphlHTTP({
    schema: schema,
    graphiql: true,
  })
);

module.exports = app;
