const express = require("express");
const { authLimiter } = require("../../middleware/rateLimiter");

// const authRoutes = require("./auth.route");
// const authRoute = require("./auth.route");
const patientRoute = require("./patientRoute");
const doctorRoute = require("./doctorRoute");
const RecordRoute = require("./recordRoutes");
const PrescriptionsRoute = require("./prescriptionRoutes");
const InvoiceRoute = require("./invoiceRoutes");
const SecretaryRoute = require("./secretaryRoute");
const AuthRoute = require("./authRoutes")
const appointmentRoutes = require("./appointment.route");
const scheduleRoutes = require("./scheduleRoute");
// const {protect}= require("../../controllers/authControllers")
const app = express();

const router = express.Router();
router.use(express.json());

router.get("/status", (req, res) => res.send("OK"));
// router.use("/auth", authLimiter, authRoutes);
// app.use("/auth", authRoute);
router.use("/patient", patientRoute);
router.use("/doctor", doctorRoute);
router.use("/record", RecordRoute);
router.use("/prescription", PrescriptionsRoute);
router.use("/invoices", InvoiceRoute);
router.use("/secretary",SecretaryRoute);
router.use("/appointment", appointmentRoutes);
router.use("/schedule", scheduleRoutes);
router.use("/auth",AuthRoute)

module.exports = router;
