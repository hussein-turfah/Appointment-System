import axios from "../utils/Http";
import { toast } from "react-toastify";

export const ACTIONS = {
  CREATE_MEDICAL_RECORD: "/record",
  UPDATE_MEDICAL_RECORD: "/record/:id",
  DELETE_MEDICAL_RECORD: "/record/:id",
  GET_MEDICAL_RECORD_BY_ID: "/record/:id",
  GET_MEDICAL_RECORDS_BY_PATIENT_ID: "/record/patient/:patientId",
};

export const createMedicalRecord =
  (patientId, { title, description }) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post(`/record/${patientId}`, {
        title,
        description,
      });

      toast.success("Medical record created successfully");
      dispatch({ type: ACTIONS.CREATE_MEDICAL_RECORD, data });
    } catch (error) {
      toast.error("Error while creating medical record");
    }
  };

export const updateMedicalRecord =
  (id, { title, description }) =>
  async (dispatch) => {
    try {
      const { data } = await axios.put(`/record/${id}`, {
        title,
        description,
      });
      toast.success("Medical record updated successfully");
      dispatch({ type: ACTIONS.UPDATE_MEDICAL_RECORD, data });
    } catch (error) {
      toast.error("Error while updating medical record");
    }
  };

export const deleteMedicalRecord = (id) => async (dispatch) => {
  try {
    await axios.delete(`/record/${id}`);
    toast.success("Medical record deleted successfully");
    dispatch({ type: ACTIONS.DELETE_MEDICAL_RECORD, id });
  } catch (error) {
    toast.error("Error while deleting medical record");
  }
};

export const getMedicalRecordById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/record/${id}`);
    dispatch({ type: ACTIONS.GET_MEDICAL_RECORD_BY_ID, data });
  } catch (error) {
    toast.error("Error while fetching medical record");
  }
};

export const getMedicalRecordsByPatientId = (patientId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/record/patient/${patientId}`);
    dispatch({ type: ACTIONS.GET_MEDICAL_RECORDS_BY_PATIENT_ID, data });
  } catch (error) {
    toast.error("Error while fetching medical records");
  }
};
