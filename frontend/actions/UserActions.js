import axios from "../utils/Http";

import { toast } from "react-toastify";

export const ACTIONS = {
  SET_USER: "/auth/login",
};

export const login = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/login", formData);


    dispatch({ type: ACTIONS.SET_USER, data });
  } catch (error) {
    toast.error("Invalid email or password");
  }
}
