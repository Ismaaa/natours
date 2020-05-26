module.exports = (error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.status || 'fail',
    message: error.message,
  });
  console.error(error.stack); // log to firebase
  next();
};
