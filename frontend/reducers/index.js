import { combineReducers } from "redux";
import UserData from "./UserData";
import DoctorData from "./DoctorData";
import AppointmentData from "./AppointmentData";
import InvoiceData from "./InvoiceData";
import MedicalRecordData from "./MedicalrecordData";
import PatientData from "./PatientData";
import PrescriptionData from "./PrescriptionData";
import ScheduleData from "./ScheduleData";
import AdminData from "./AdminData";

const combinedReducers = combineReducers({
  UserData,
  DoctorData,
  AppointmentData,
  InvoiceData,
  MedicalRecordData,
  PatientData,
  PrescriptionData,
  ScheduleData,
  AdminData,
});

export default combinedReducers;
