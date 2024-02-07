const DoctorSchedule = require('../models/scheduleSchema'); 

// CREATE 
async function createDoctorSchedule(req, res) {
  const { doctorId } = req.params;
  const {weekday, startTime, endTime } = req.body;
  try {
    const newSchedule = await DoctorSchedule.create({
      doctor: doctorId,
      weekday: weekday,
      startTime: startTime,
      endTime: endTime
    });
    res.status(201).json(newSchedule);
  } catch (error) {
    console.error("Error creating doctor schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// GET 
async function getDoctorSchedules(req, res) {
    const { doctorId } = req.params; 
    try {
      const schedules = await DoctorSchedule.find({ doctor: doctorId });
      res.json(schedules);
    } catch (error) {
      console.error("Error fetching doctor schedules:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  

// UPDATE 
async function updateDoctorSchedule(req, res) {
  const { scheduleId } = req.params;
  const updatedFields = req.body;
  try {
    const updatedSchedule = await DoctorSchedule.findByIdAndUpdate(scheduleId, updatedFields, { new: true });
    res.json(updatedSchedule);
  } catch (error) {
    console.error("Error updating doctor schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// DELETE 
async function deleteDoctorSchedule(req, res) {
    const { doctorId, scheduleId } = req.params;
    try {
      await DoctorSchedule.findOneAndDelete({ _id: scheduleId, doctor: doctorId });
      console.log("Doctor schedule deleted successfully.");
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting doctor schedule:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  

module.exports={
  createDoctorSchedule,
  deleteDoctorSchedule,
  getDoctorSchedules,
  updateDoctorSchedule
}