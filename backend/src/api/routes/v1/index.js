const express = require("express");
const { authLimiter } = require("../../middleware/rateLimiter");

const authRoutes = require("./auth.route");
const calendarRoutes = require("./calendar.route");
// const userRoute = require('./user.route');

const router = express.Router();

// setup api routes
router.get("/status", (req, res) => res.send("OK"));
router.use("/auth", authLimiter, authRoutes);
router.use("/calendar", calendarRoutes);

module.exports = router;
