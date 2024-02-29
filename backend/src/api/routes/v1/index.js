const express = require("express");

const AuthRoute = require("./authRoutes");
const patientRoute = require("./patientRoute");
const doctorRoute = require("./doctorRoute");
const RecordRoute = require("./recordRoutes");
const PrescriptionsRoute = require("./prescriptionRoutes");
const InvoiceRoute = require("./invoiceRoutes");
const SecretaryRoute = require("./secretaryRoute");
const appointmentRoutes = require("./appointment.route");
const scheduleRoutes = require("./scheduleRoute");
const AdminRoute = require("./adminRoutes");
const UserRoute = require("./user.route");
const serviceRoute = require("./serviceRoute");

const { protect } = require("../../controllers/authControllers");
const app = express();

const router = express.Router();
router.use(express.json());

router.get("/status", (req, res) => res.send("OK"));

router.use("/auth", AuthRoute);
router.use("/admin", protect, AdminRoute);
router.use("/patient", protect, patientRoute);
router.use("/doctor", protect, doctorRoute);
router.use("/record", protect, RecordRoute);
router.use("/prescription", protect, PrescriptionsRoute);
router.use("/invoices",  InvoiceRoute);
router.use("/secretary", protect, SecretaryRoute);
router.use("/appointment", protect, appointmentRoutes);
router.use("/schedule", protect, scheduleRoutes);
// router.use("/pdf",pdfRoute)
router.use("/user", protect, UserRoute);
router.use("/service", protect, serviceRoute);

module.exports = router;
