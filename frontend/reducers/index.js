import { combineReducers } from "redux";
import UserData from "./UserData";
import DoctorData from "./DoctorData";

const combinedReducers = combineReducers({
  UserData,
  DoctorData
});

export default combinedReducers;
