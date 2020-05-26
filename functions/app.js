// libs
const express = require('express');
const morgan = require('morgan');

// modules
const AppError = require('./utils/AppError');
const ErrorHandler = require('./handlers/ErrorHandler');

// routes
const tourRouter = require('./routes/TourRoutes');
const userRouter = require('./routes/UserRoutes');

// init express
const app = express();

// Middlewares
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  // cache forever
  res.set('Cache-Control', 'public, max-age=31557600, s-maxage=31557600');
  next();
});

// mount routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 404 response
app.all('*', (req, res, next) => {
  // If we pass a param, express will know that it's an error
  // and it will skipp all next middlewares and go directly
  // to the error handler
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

// error handling (if we pass 4 params
// express will know that it's an error handler)
app.use(ErrorHandler);

module.exports = app;
