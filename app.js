const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());
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

app.post("/api/v1/tours", (req, res) => {
  console.log(req.body);

  res.send("Done");
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
