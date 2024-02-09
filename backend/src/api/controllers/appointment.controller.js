const Appointment = require("../models/appointment.model");
const httpStatus = require("http-status");
const User = require("../models/user.model");
const Patient = require("../models/patientSchema");
const Invoice = require("../models/invoice.model");

/**
 * Get appointment by id
 * @param {ObjectId} req.params.id
 * @returns {Promise<Appointment>}
 */
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.get(id);

    if (!appointment) {
      throw new Error({
        message: "Appointment does not exist",
        status: httpStatus.NOT_FOUND,
      });
    }

    // Transform appointment data before sending response
    const transformedAppointment = appointment.transform();

    res.status(httpStatus.OK).json(transformedAppointment);
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

/**
 * Get all appointments
 * @returns {Promise<Appointment[]>}
 */
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().exec();

    if (!appointments.length) {
      res.status(httpStatus.OK).json([]);
    } else {
      // Transform appointment data before sending response
      const transformedAppointments = appointments.map((appointment) =>
        appointment.transform()
      );
      res.status(httpStatus.OK).json(transformedAppointments);
    }
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

/**
 * Create new appointment
 * @param {ObjectId} req.body.doctor
 * @param {ObjectId} req.body.patient
 * @param {Date} req.body.start
 * @param {Date} req.body.start
 * @param {String} req.body.reason
 * @returns {Promise<Appointment>}
 */
const createAppointment = async (req, res) => {
  try {
    const { doctor, patient, start, end, reason } = req.body;

    const existingDoctor = await User.get(doctor);
    if (!existingDoctor || existingDoctor.type !== "doctor") {
      throw new Error({
        message: "Doctor does not exist",
        status: httpStatus.NOT_FOUND,
      });
    }

    const existingPatient = await Patient.get(patient);
    if (!existingPatient) {
      throw new Error({
        message: "Patient does not exist",
        status: httpStatus.NOT_FOUND,
      });
    }

    const invoice = new Invoice({
      doctor,
      patient,
      amount: 0,
      currency: "USD",
      paymentStatus: "Unpaid",
    });

    const createdInvoice = await invoice.save();
    const invoiceId = createdInvoice._id;

    const newAppointment = new Appointment({
      doctor,
      patient,
      invoice: invoiceId,
      start,
      end,
      reason,
    });

    const appointment = await newAppointment.save();

    // Transform appointment data before sending response
    const transformedAppointment = appointment.transform();

    res.status(httpStatus.CREATED).json(transformedAppointment);
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

/**
 * Get appointment by doctor id
 *
 */
const getAppointmentsByDoctorId = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.getByDoctorId(id);

    if (!appointment) {
      throw new Error({
        message: "Appointment does not exist",
        status: httpStatus.NOT_FOUND,
      });
    }

    // Transform appointment data before sending response
    const transformedAppointment = appointment.transform();

    res.status(httpStatus.OK).json(transformedAppointment);
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

/**
 * Get appointment by patient id
 *
 */

const getAppointmentByPatientId = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.getByPatientId(id);

    if (!appointment) {
      throw new Error({
        message: "Appointment does not exist",
        status: httpStatus.NOT_FOUND,
      });
    }

    // Transform appointment data before sending response
    const transformedAppointment = appointment.transform();

    res.status(httpStatus.OK).json(transformedAppointment);
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

/**
 * Update appointment status
 *
 */
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id, status } = req.params;

    const appointment = await Appointment.updateStatus(id, status);

    if (!appointment) {
      throw new Error({
        message: "Appointment does not exist",
        status: httpStatus.NOT_FOUND,
      });
    }

    // Transform appointment data before sending response
    const transformedAppointment = appointment.transform();

    res.status(httpStatus.OK).json(transformedAppointment);
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

/**
 * Update appointment
 *
 */

const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    const appointment = await Appointment.update(id, data);

    if (!appointment) {
      throw new Error({
        message: "Appointment does not exist",
        status: httpStatus.NOT_FOUND,
      });
    }

    // Transform appointment data before sending response
    const transformedAppointment = appointment.transform();

    res.status(httpStatus.OK).json(transformedAppointment);
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

/**
 * Delete appointment
 *
 */
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.delete(id);

    if (!appointment) {
      throw new Error({
        message: "Appointment does not exist",
        status: httpStatus.NOT_FOUND,
      });
    }

    res.status(httpStatus.OK).json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAppointmentById,
  getAllAppointments,
  createAppointment,
  getAppointmentsByDoctorId,
  getAppointmentByPatientId,
  updateAppointmentStatus,
  updateAppointment,
  deleteAppointment,
};
