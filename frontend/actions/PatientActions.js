import axios from "../utils/Http";
import { toast } from "react-toastify";

export const ACTIONS = {
  GET_ALL_PATIENTS: "/patients",
  CREATE_PATIENT: "/patients",
  UPDATE_PATIENT: "/patients/:id",
  DELETE_PATIENT: "/patients/:id",
  GET_PATIENT_BY_ID: "/patients/:id",
};

export const getAllPatients = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/patients");
    dispatch({ type: ACTIONS.GET_ALL_PATIENTS, data });
  } catch (error) {
    toast.error("Error while fetching patients");
  }
};

export const createPatient = (patient) => async (dispatch) => {
  try {
    const { data } = await axios.post("/patients", patient);
    dispatch({ type: ACTIONS.CREATE_PATIENT, data });
  } catch (error) {
    toast.error("Error while creating patient");
  }
};

export const updatePatient = (id, patient) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/patients/${id}`, patient);
    dispatch({ type: ACTIONS.UPDATE_PATIENT, data });
  } catch (error) {
    toast.error("Error while updating patient");
  }
};

export const deletePatient = (id) => async (dispatch) => {
  try {
    await axios.delete(`/patients/${id}`);
    dispatch({ type: ACTIONS.DELETE_PATIENT, id });
  } catch (error) {
    toast.error("Error while deleting patient");
  }
};

export const getPatientById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/patients/${id}`);
    dispatch({ type: ACTIONS.GET_PATIENT_BY_ID, data });
  } catch (error) {
    toast.error("Error while fetching patient");
  }
};
