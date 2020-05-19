// libs
const dotenv = require("dotenv");

// modules
const app = require("./app");

// config
dotenv.config({ path: "./config.env" });
const port = process.env.PORT;

// start server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

console.log(process.env);
