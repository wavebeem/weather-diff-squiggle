const express = require('express');
const routes = require('./routes');

function greet() {
  console.log('Weather Diff listening on http://localhost:3000');
}

express()
  .use('/app', routes.Static)
  .get('/', routes.Index)
  .get('/weather/:zip', routes.Weather)
  .listen(3000, greet);
