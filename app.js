const express = require("express");

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.status(200).send("Hello from the server side");
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
