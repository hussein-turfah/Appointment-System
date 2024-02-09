const express = require("express");
const router = express.Router();
const {
  login,
  forgotPassword,
  loggedIn,
} = require("../../controllers/authControllers");

// Route for user login
router.post("/login", login);
router.post("/forgetpassword", forgotPassword);
router.get("/", loggedIn);

module.exports = router;
