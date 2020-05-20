// libs
const express = require('express');
const morgan = require('morgan');

// routes
const baseRouter = require('./routes/BaseRoutes');
const tourRouter = require('./routes/TourRoutes');
const userRouter = require('./routes/UserRoutes');

// init express
const app = express();

// Middlewares
if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  // cache forever
  res.set('Cache-Control', 'public, max-age=31557600, s-maxage=31557600');
  next();
});

// mount routers
app.use('/', baseRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;