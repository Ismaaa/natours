// libs
const express = require("express");
const morgan = require("morgan");

// routes
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// config
const port = 8080;

// init express
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// mount routers
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// start server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
