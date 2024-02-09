import axios from "../utils/Http";
import { toast } from "react-toastify";

export const ACTIONS = {
  GET_ALL_DOCTORS: "/doctor",
};

export const getAllDoctors = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/doctor");

    dispatch({ type: ACTIONS.GET_ALL_DOCTORS, data });
  } catch (error) {
    toast.error("Error while fetching doctors");
  }
}
