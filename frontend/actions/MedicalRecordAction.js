import axios from "../utils/Http";
import { toast } from "react-toastify";

export const ACTIONS = {
  CREATE_MEDICAL_RECORD: "/medicalRecords",
  UPDATE_MEDICAL_RECORD: "/medicalRecords/:id",
  DELETE_MEDICAL_RECORD: "/medicalRecords/:id",
  GET_MEDICAL_RECORD_BY_ID: "/medicalRecords/:id",
  GET_MEDICAL_RECORDS_BY_PATIENT_ID: "/medicalRecords/patient/:id",
};

export const createMedicalRecord = (patientId, recordData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/medicalRecords/${patientId}`, recordData);
    dispatch({ type: ACTIONS.CREATE_MEDICAL_RECORD, data });
  } catch (error) {
    toast.error("Error while creating medical record");
  }
};

export const updateMedicalRecord = (id, recordData) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/medicalRecords/${id}`, recordData);
    dispatch({ type: ACTIONS.UPDATE_MEDICAL_RECORD, data });
  } catch (error) {
    toast.error("Error while updating medical record");
  }
};

export const deleteMedicalRecord = (id) => async (dispatch) => {
  try {
    await axios.delete(`/medicalRecords/${id}`);
    dispatch({ type: ACTIONS.DELETE_MEDICAL_RECORD, id });
  } catch (error) {
    toast.error("Error while deleting medical record");
  }
};

export const getMedicalRecordById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/medicalRecords/${id}`);
    dispatch({ type: ACTIONS.GET_MEDICAL_RECORD_BY_ID, data });
  } catch (error) {
    toast.error("Error while fetching medical record");
  }
};

export const getMedicalRecordsByPatientId = (patientId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/medicalRecords/patient/${patientId}`);
    dispatch({ type: ACTIONS.GET_MEDICAL_RECORDS_BY_PATIENT_ID, data });
  } catch (error) {
    toast.error("Error while fetching medical records");
  }
};
