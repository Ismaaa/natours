// libs
const express = require('express');
const morgan = require('morgan');

// routes
const tourRouter = require('./routes/TourRoutes');
const userRouter = require('./routes/UserRoutes');

// init express
const app = express();

// Middlewares
// app.use(morgan('combined'));

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
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl}`,
  });
});

module.exports = app;
