const express = require("express");
const router = express.Router();
const {
  createAppointmentValidator,
  getAppointmentValidator,
  updateAppointmentValidator,
  deleteAppointmentValidator,
  getAppointmentByDoctorValidator,
  getAppointmentByPatientValidator,
  updateAppointmentStatusValidator,
} = require("../../utils/validators/appointmentValidator");
const {
  getAppointmentById,
  getAllAppointments,
  createAppointment,
  getAppointmentsByDoctorId,
  getAppointmentByPatientId,
  updateAppointmentStatus,
  updateAppointment,
  deleteAppointment,
} = require("../../controllers/appointment.controller");

router
  .post("/", createAppointmentValidator, createAppointment)
  .put("/:id", updateAppointmentValidator, updateAppointment);

router
  .get("/", getAllAppointments)
  .get("/:id", getAppointmentValidator, getAppointmentById)
  .delete("/:id", deleteAppointmentValidator, deleteAppointment);

router
  .get(
    "/doctor/:id",
    getAppointmentByDoctorValidator,
    getAppointmentsByDoctorId
  )
  .get(
    "/patient/:id",
    getAppointmentByPatientValidator,
    getAppointmentByPatientId
  );

router.put(
  "/:id/:status",
  updateAppointmentStatusValidator,
  updateAppointmentStatus
);

module.exports = router;
