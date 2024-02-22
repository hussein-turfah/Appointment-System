const User = require("../models/user.model");

// Create a new service for the logged-in doctor
const createService = async (req, res) => {
  try {
    // Get the logged-in user's ID
    const loggedInUserId = req.data._id;

    // Find the doctor in the database
    const doctor = await User.findById(loggedInUserId);
    if (!doctor || doctor.type !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Extract the doctor's ID
    const doctorId = doctor._id;

    // Extract service details from request body
    const { name, price } = req.body;

    // Add the new service to the doctor's services array
    doctor.services.push({ name, price });

    // Save the updated doctor object
    await doctor.save();

    res.status(201).json({ message: "Service created successfully" });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update an existing service for the logged-in doctor
const updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { name, price } = req.body;

    // Get the logged-in user's ID
    const loggedInUserId = req.user._id;

    // Find the doctor in the database
    const doctor = await User.findById(loggedInUserId);
    if (!doctor || doctor.type !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Find the index of the service to update
    const serviceIndex = doctor.services.findIndex(
      (service) => service._id == serviceId
    );
    if (serviceIndex === -1) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Update the service details
    doctor.services[serviceIndex].name = name;
    doctor.services[serviceIndex].price = price;

    // Save the updated doctor object
    await doctor.save();

    res.status(200).json({ message: "Service updated successfully" });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a service for the logged-in doctor
const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Get the logged-in user's ID
    const loggedInUserId = req.user._id;

    // Find the doctor in the database
    const doctor = await User.findById(loggedInUserId);
    if (!doctor || doctor.type !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Find the index of the service to delete
    const serviceIndex = doctor.services.findIndex(
      (service) => service._id == serviceId
    );
    if (serviceIndex === -1) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Remove the service from the doctor's services array
    doctor.services.splice(serviceIndex, 1);

    // Save the updated doctor object
    await doctor.save();

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
const getServicesByDoctorId = async (req, res) => {
  try {
    const loggedInUser = req.data;

    // Print the logged-in user's data
    console.log(loggedInUser);

    // Get the logged-in user's ID
    const loggedInUserId = req.user._id;

    // Find the user in the database
    const user = await User.findById(loggedInUserId);
    if (!user || user.type !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Extract the doctor's ID
    const doctorId = user._id;

    // Retrieve the services for the doctor
    const services = user.services;

    // Send the services as response
    res.status(200).json({ doctorId, services });
  } catch (error) {
    console.error("Error retrieving services:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createService,
  updateService,
  deleteService,
  getServicesByDoctorId,
};
