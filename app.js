// libs
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

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

// route handlers
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  // Find by ID
  const id = parseInt(req.params.id, 10); // To decimal
  const tour = tours.find((item) => item.id === id);

  if (tour === undefined) {
    return res.status(404).json({
      status: "fail",
      message: "not_found",
      params: req.params,
    });
  }

  res.status(200).json({
    status: "success",
    params: req.params,
    tour,
  });
};

const createTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  // New object with the ID and the data from the request
  const tour = { id, ...req.body };

  tours.push(tour);

  // Always async, as we are inside a callback function and we never want to block the event loop
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours, null, "\t"), // Pretty output
    (err) => {
      res.status(201).json({
        status: "success",
        created_at: req.requestTime,
        data: {
          tour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  // Find by ID
  const id = parseInt(req.params.id, 10); // To decimal
  const tour = tours.find((item) => item.id === id);

  if (tour === undefined) {
    return res.status(404).json({
      status: "fail",
      message: "not_found",
      params: req.params,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour>",
    },
  });
};

const deleteTour = (req, res) => {
  // Find by ID
  const id = parseInt(req.params.id, 10); // To decimal
  const tour = tours.find((item) => item.id === id);

  if (tour === undefined) {
    return res.status(404).json({
      status: "fail",
      message: "not_found",
      params: req.params,
    });
  }

  // It won't return anything, as we are using 204
  res.status(204).json({
    status: "success",
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(501).json({
    status: "error",
    message: "Feature not implemented yet",
  });
};
const createUser = (req, res) => {
  res.status(501).json({
    status: "error",
    message: "Feature not implemented yet",
  });
};
const getUser = (req, res) => {
  res.status(501).json({
    status: "error",
    message: "Feature not implemented yet",
  });
};
const updateUser = (req, res) => {
  res.status(501).json({
    status: "error",
    message: "Feature not implemented yet",
  });
};
const deleteUser = (req, res) => {
  res.status(501).json({
    status: "error",
    message: "Feature not implemented yet",
  });
};

// endpoints
const tourRouter = express.Router();
const userRouter = express.Router();
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

// start server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
