const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const pool = require('../server/modules/pool');

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const ratingsRouter = require('./routes/ratings.router');
const breweryRouter = require('./routes/brewery.router');
const breweriesRouter = require('./routes/breweries.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));
app.use(express.json({ limit: '1mb' }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/ratings', ratingsRouter);
app.use('/api/brewery', breweryRouter);
app.use('/api/breweries', breweriesRouter);

app.post('/beer-list', (request, response) => {
  console.log(request.body)
  const data = request.body;
  response.json({
    latitude: data.lat,
    longitude: data.lon
  })
})


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
