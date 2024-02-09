const express = require("express");
const { authLimiter } = require("../../middleware/rateLimiter");

const authRoutes = require("./auth.route");
const authRoute = require("./auth.route");
const patientRoute = require("./patientRoute");
const doctorRoute = require("./doctorRoute");
const RecordRoute = require("./recordRoutes");
const PrescriptionsRoute = require("./prescriptionRoutes");
const InvoiceRoute = require("./invoiceRoutes");
const SecretaryRoute = require("./secretaryRoute");

const appointmentRoutes = require("./appointment.route");
const scheduleRoutes = require("./scheduleRoute");
const app = express();

const router = express.Router();

router.get("/status", (req, res) => res.send("OK"));
router.use("/auth", authLimiter, authRoutes);
app.use("/auth", authRoute);
app.use("/patient", patientRoute);
app.use("/doctor", doctorRoute);
app.use("/record", RecordRoute);
app.use("/prescription", PrescriptionsRoute);
app.use("/invoices", InvoiceRoute);
app.use("/secretary",SecretaryRoute);

router.use("/appointment", appointmentRoutes);
// router.use("/schedule", scheduleRoutes);

module.exports = router;
