import axios from "../utils/Http";
import { toast } from "react-toastify";
import { validationResult } from 'express-validator';

export const ACTIONS = {
  CREATE_DOCTOR_SCHEDULE: "/doctorSchedules",
  GET_DOCTOR_SCHEDULES: "/doctorSchedules",
  UPDATE_DOCTOR_SCHEDULE: "/doctorSchedules/:doctorId/:scheduleId",
  DELETE_DOCTOR_SCHEDULE: "/doctorSchedules/:doctorId/:scheduleId",
};

export const createDoctorSchedule = (doctorId, scheduleData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/doctorSchedules/${doctorId}`, scheduleData);
    dispatch({ type: ACTIONS.CREATE_DOCTOR_SCHEDULE, data });
  } catch (error) {
    toast.error("Error while creating doctor schedule");
  }
};

export const getDoctorSchedules = (doctorId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/doctorSchedules/${doctorId}`);
    dispatch({ type: ACTIONS.GET_DOCTOR_SCHEDULES, data });
  } catch (error) {
    toast.error("Error while fetching doctor schedules");
  }
};

export const updateDoctorSchedule = (doctorId, scheduleId, scheduleData) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/doctorSchedules/${doctorId}/${scheduleId}`, scheduleData);
    dispatch({ type: ACTIONS.UPDATE_DOCTOR_SCHEDULE, data });
  } catch (error) {
    toast.error("Error while updating doctor schedule");
  }
};

export const deleteDoctorSchedule = (doctorId, scheduleId) => async (dispatch) => {
  try {
    await axios.delete(`/doctorSchedules/${doctorId}/${scheduleId}`);
    dispatch({ type: ACTIONS.DELETE_DOCTOR_SCHEDULE, doctorId, scheduleId });
  } catch (error) {
    toast.error("Error while deleting doctor schedule");
  }
};
