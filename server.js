// modules
const app = require("./app");

// config
const port = 8080;

// start server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
