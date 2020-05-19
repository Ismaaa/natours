// libs
const express = require("express");

// handlers
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

// router
const router = express.Router();

// routes
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
