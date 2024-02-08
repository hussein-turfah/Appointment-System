const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const httpStatus = require("http-status");

/**
 * Get doctor by id
 * @param {ObjectId} req.params.id
 * @returns {Promise<User>}
 */
const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.get(id);

    if (!user || user.type !== "doctor") {
      throw new Error({
        message: "Doctor does not exist",
        status: httpStatus.NOT_FOUND,
      });
    }

    // Transform user data before sending response
    const transformedUser = user.transform();

    res.status(httpStatus.OK).json(transformedUser);
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

/**
 * Get all doctors
 * @returns {Promise<User[]>}
 */
const getAllDoctors = async (req, res) => {
    try {
      const doctors = await User.find({ type: "doctor" }).exec();
  
      if (!doctors.length) {
        res.status(httpStatus.OK).json([]);
      } else {
        // Transform doctor data before sending response
        const transformedDoctors = doctors.map((doctor) => doctor.transform());
        res.status(httpStatus.OK).json(transformedDoctors);
      }
    } catch (error) {
      res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  };
  
  /**
   * Delete doctor by id
   * @param {ObjectId} req.params.id - The id of the doctor
   * @returns {Promise<void>}
   */
  const deleteDoctorById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedDoctor = await User.findByIdAndDelete(id);
  
      if (!deletedDoctor) {
        throw new Error({
          message: "Doctor does not exist",
          status: httpStatus.NOT_FOUND,
        });
      }
  
      res.status(httpStatus.NO_CONTENT).json();
    } catch (error) {
      res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  };

  // Create doctor 
const addDoctor = async (req, res) => {
    try {
      const newDoctor = new User({
        type: 'doctor',
        ...req.body,
        password: await bcrypt.hash(req.body.password, 10),
      });
  
      await newDoctor.save();
  
      res.status(201).json({
        message: 'Doctor created successfully!',
        data: newDoctor.transform(), 
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating doctor');
    }
  };
  
/**
 * Update doctor by id
 * @param {ObjectId} req.params.id 
 * @param {Object} req.body 
 * @returns {Promise<User>}
 */
const updateDoctorById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      // Check if the doctor exists
      const doctor = await User.findById(id);
      if (!doctor || doctor.type !== 'doctor') {
        const error = new Error('Doctor not found');
        error.status = httpStatus.NOT_FOUND;
        throw error;
      }
  
      // Update doctor's data
      Object.assign(doctor, updateData);
      await doctor.save();
  
      res.status(httpStatus.OK).json(doctor.transform());
    } catch (error) {
      next(error);
    }
  };
  
module.exports = {
    addDoctor,
    deleteDoctorById,
    getAllDoctors,
    getDoctorById,
    updateDoctorById
};
