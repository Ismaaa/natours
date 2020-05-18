const fs = require("fs");
const express = require("express");

const app = express();
const port = 8080;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
