const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send({ info: 'Node.js, Express, and Postgres API' });
});

var categoriesRoutes = require('./api/routes/categoriesRoutes'); //importing route
categoriesRoutes(app); //register the route

app.listen(port, () =>{
  console.log(`Api running on port ${port}`);
});

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
