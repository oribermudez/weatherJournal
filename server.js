/* Empty JS object to act as endpoint for all routes */
projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
const moment = require('moment');

/* Initialize the main project folder */
app.use(express.static('website'));

const port = 3000;

/* Spin up the server */
app.listen( port, () => (console.log(`Server running on localhost: ${port}`)));

// GET route
app.get('/weatherInfo', getWeather);
function getWeather(req, res) {
  res.send(projectData);
}

// POST route
app.post('/saveWeather', (req, res) => {
  projectData = {
    date: moment(req.body.date).format('dddd, MMMM Do YYYY'),
    temp: req.body.temp,
    content: req.body.content
  };
  res.send({ data: projectData });
})

