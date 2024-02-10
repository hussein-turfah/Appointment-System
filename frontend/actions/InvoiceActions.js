import axios from "../utils/Http";
import { toast } from "react-toastify";

export const ACTIONS = {
  CREATE_INVOICE: "/invoices",
  UPDATE_INVOICE: "/invoices/:id",
  DELETE_INVOICE: "/invoices/:id",
  GET_ALL_INVOICES: "/",
  GET_INVOICES_BY_PATIENT_ID: "/invoices/patient/:id",
  GET_INVOICE_BY_ID: "/invoices/:id",
  GET_INVOICES_BY_DOCTOR_ID: "/invoices/doctor/:id",
  GET_INVOICES_BY_DATE: "/invoices/day/:date",
};

export const createInvoice = (patientId, invoice) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/invoices/${patientId}`, invoice);
    dispatch({ type: ACTIONS.CREATE_INVOICE, data });
  } catch (error) {
    toast.error("Error while creating invoice");
  }
};

export const updateInvoice = (id, invoice) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/invoices/${id}`, invoice);
    dispatch({ type: ACTIONS.UPDATE_INVOICE, data });
  } catch (error) {
    toast.error("Error while updating invoice");
  }
};

export const deleteInvoice = (id) => async (dispatch) => {
  try {
    await axios.delete(`/invoices/${id}`);
    dispatch({ type: ACTIONS.DELETE_INVOICE, id });
  } catch (error) {
    toast.error("Error while deleting invoice");
  }
};

export const getInvoicesByPatientId = (patientId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/invoices/patient/${patientId}`);
    dispatch({ type: ACTIONS.GET_INVOICES_BY_PATIENT_ID, data });
  } catch (error) {
    toast.error("Error while fetching invoices");
  }
};

export const getInvoiceById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/invoices/${id}`);
    dispatch({ type: ACTIONS.GET_INVOICE_BY_ID, data });
  } catch (error) {
    toast.error("Error while fetching invoice");
  }
};

export const getInvoicesByDoctorId = (doctorId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/invoices/doctor/${doctorId}`);
    dispatch({ type: ACTIONS.GET_INVOICES_BY_DOCTOR_ID, data });
  } catch (error) {
    toast.error("Error while fetching invoices");
  }
};

export const getInvoicesByDate = (date) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/invoices/day/${date}`);
    dispatch({ type: ACTIONS.GET_INVOICES_BY_DATE, data });
  } catch (error) {
    toast.error("Error while fetching invoices");
  }
};

export const getAllInvoices = () => async (dispatch) => {
    try {
      const { data } = await axios.get("/invoices");
      console.log("raan")
      dispatch({ type: ACTIONS.GET_ALL_INVOICES, data });
    } catch (error) {
      toast.error("Error while fetching invoices");
    }
  };
  