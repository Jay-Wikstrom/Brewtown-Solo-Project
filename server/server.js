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

app.post('/beer-list', (request, response) => {
  console.log(request.body)
  const data = request.body;
  response.json({
    latitude: data.lat,
    longitude: data.lon
  })
})
//     let sqlQuery = `
//       INSERT INTO
//           "location" ("lat", "lon" )
//       VALUES
//           ($1, $2);
//       `;
//     console.log('sqlQuery', sqlQuery);
//     let sqlParams = [
//       data.lat,
//       data.lon
//     ]
//     console.log('sqlParams', sqlParams);

//     pool.query(sqlQuery, sqlParams)
//       .then((dbRes) => {
//         console.log(dbRes.rows)
//         response.sendStatus(201);
//       })
//       .catch((error) => {
//         console.log('Error in DB post', error)
//         response.sendStatus(500);
//   })
// })


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
