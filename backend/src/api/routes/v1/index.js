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
const AdminRoute = require("./adminRoutes");
const pdfRoute = require("./pdfRoutes");
// const {protect}= require("../../controllers/authControllers")
const app = express();

const router = express.Router();
router.use(express.json());

router.get("/status", (req, res) => res.send("OK"));

router.use("/auth",AuthRoute)
router.use("/admin",AdminRoute)
router.use("/patient", patientRoute);
router.use("/doctor", doctorRoute);
router.use("/record", RecordRoute);
router.use("/prescription", PrescriptionsRoute);
router.use("/invoices", InvoiceRoute);
router.use("/secretary",SecretaryRoute);
router.use("/appointment", appointmentRoutes);
router.use("/schedule", scheduleRoutes);
router.use("/pdf",pdfRoute)
router.use("/auth",AuthRoute)

module.exports = router;
