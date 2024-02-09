const express = require("express");

const AuthRoute = require("./authRoutes")
const patientRoute = require("./patientRoute");
const doctorRoute = require("./doctorRoute");
const RecordRoute = require("./recordRoutes");
const PrescriptionsRoute = require("./prescriptionRoutes");
const InvoiceRoute = require("./invoiceRoutes");
const SecretaryRoute = require("./secretaryRoute");
const appointmentRoutes = require("./appointment.route");
const scheduleRoutes = require("./scheduleRoute");
// const {protect}= require("../../controllers/authControllers")
const app = express();

const router = express.Router();
router.use(express.json());

router.get("/status", (req, res) => res.send("OK"));
<<<<<<< HEAD
// router.use("/auth", authLimiter, authRoutes);
// app.use("/auth", authRoute);
=======

router.use("/auth",AuthRoute)
>>>>>>> f428854d613df8e69267e356ce0c9458a027e7ed
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
