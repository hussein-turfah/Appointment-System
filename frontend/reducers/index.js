import { combineReducers } from "redux";
import UserData from "./UserData";
import DoctorData from "./DoctorData";
import AppointmentData from "./AppointmentData";

const combinedReducers = combineReducers({
  UserData,
  DoctorData,
  AppointmentData,
});

export default combinedReducers;
