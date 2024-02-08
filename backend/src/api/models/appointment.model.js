const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    reason: String,
    status: {
      type: String,
      enum: ["scheduled", "cancelled", "completed"],
      default: "scheduled",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Methods
 */
appointmentSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "doctor",
      "patient",
      "invoice",
      "startTime",
      "endTime",
      "reason",
      "status",
      "createdAt",
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
appointmentSchema.statics = {
  statuses: ["scheduled", "cancelled", "completed"],

  /**
   * Get appointment
   *
   * @param {ObjectId} id - The objectId of appointment.
   * @returns {Promise<Appointment, APIError>}
   */
  async get(id) {
    try {
      let appointment;

      if (mongoose.Types.ObjectId.isValid(id)) {
        appointment = await this.findById(id).exec();
      }
      if (appointment) {
        return appointment;
      }

      throw new Error("No such appointment exists!");
    } catch (error) {
      throw error;
    }
  },

  /**
   * List appointments in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of appointments to be skipped.
   * @param {number} limit - Limit number of appointments to be returned.
   * @returns {Promise<Appointment[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find().sort({ createdAt: -1 }).skip(+skip).limit(+limit).exec();
  },

  /**
   * Get appointments by doctorId
   */
  async getByDoctorId(doctorId) {
    try {
      let appointments;

      if (mongoose.Types.ObjectId.isValid(doctorId)) {
        appointments = await this.find({ doctor: doctorId }).exec();
      }
      if (appointments) {
        return appointments;
      }

      throw new Error("No such appointment exists!");
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get appointments by patientId
   */
  async getByPatientId(patientId) {
    try {
      let appointments;

      if (mongoose.Types.ObjectId.isValid(patientId)) {
        appointments = await this.find({ patient: patientId }).exec();
      }
      if (appointments) {
        return appointments;
      }

      throw new Error("No such appointment exists!");
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update appointment status
   */
  async updateStatus(id, status) {
    try {
      let appointment;

      if (mongoose.Types.ObjectId.isValid(id)) {
        appointment = await this.findById(id).exec();
      }
      if (appointment) {
        appointment.status = status;
        return appointment.save();
      }

      throw new Error("No such appointment exists!");
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update appointment
   */
  async update(id, data) {
    try {
      let appointment;

      if (mongoose.Types.ObjectId.isValid(id)) {
        appointment = await this.findById(id).exec();
      }
      if (appointment) {
        appointment.set(data);
        return appointment.save();
      }

      throw new Error("No such appointment exists!");
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete appointment
   */
  async delete(id) {
    try {
      let appointment;

      if (mongoose.Types.ObjectId.isValid(id)) {
        appointment = await this.findById(id).exec();
      }
      if (appointment) {
        return appointment.remove();
      }

      throw new Error("No such appointment exists!");
    } catch (error) {
      throw error;
    }
  },
};

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
