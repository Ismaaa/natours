// libs
const dotenv = require("dotenv");

// modules
const app = require("./app");

// config
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 8080;

// start server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
