// libs
const fs = require("fs");

// data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// handlers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
