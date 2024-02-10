import { combineReducers } from "redux";
import UserData from "./UserData";
import DoctorData from "./DoctorData";
import AppointmentData from "./AppointmentData";
import InvoiceData from "./InvoiceData";
import MedicalRecordData from "./MedicalrecordData";
import PatientData from "./PatientData";

const combinedReducers = combineReducers({
  UserData,
  DoctorData,
  AppointmentData,
  InvoiceData,
  MedicalRecordData,
  PatientData,
});

export default combinedReducers;
