// libs
const express = require('express');
const morgan = require('morgan');

// routes
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
  req.requestTime = new Date().toISOString();
  next();
});

// mount routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
