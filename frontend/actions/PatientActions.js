import axios from "../utils/Http";
import { toast } from "react-toastify";

export const ACTIONS = {
  GET_ALL_PATIENTS: "/patient",
  CREATE_PATIENT: "/patient",
  UPDATE_PATIENT: "/patient/:id",
  DELETE_PATIENT: "/patient/:id",
  GET_PATIENT_BY_ID: "/patient/:id",
};

export const getAllPatients = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/patient");
    dispatch({ type: ACTIONS.GET_ALL_PATIENTS, data });
  } catch (error) {
    toast.error("Error while fetching patients");
  }
};

export const createPatient = (patient) => async (dispatch) => {
  try {
    const { data } = await axios.post("/patient", patient);
    dispatch({ type: ACTIONS.CREATE_PATIENT, data });
    toast.success("Patient created successfully");
  } catch (error) {
    toast.error("Error while creating patient");
  }
};

export const updatePatient = (id, patient) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/patient/${id}`, patient);
    dispatch({ type: ACTIONS.UPDATE_PATIENT, data });
    toast.success("Patient updated successfully");
  } catch (error) {
    toast.error("Error while updating patient");
  }
};

export const deletePatient = (id) => async (dispatch) => {
  try {
    await axios.delete(`/patient/${id}`);
    dispatch({ type: ACTIONS.DELETE_PATIENT, id });
    toast.success("Patient deleted successfully");
  } catch (error) {
    toast.error("Error while deleting patient");
  }
};

export const getPatientById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/patient/${id}`);
    dispatch({ type: ACTIONS.GET_PATIENT_BY_ID, data });
  } catch (error) {
    toast.error("Error while fetching patient");
  }
};
