import axios from "../utils/Http";
import { toast } from "react-toastify";

export const ACTIONS = {
  LOGIN_USER: "/auth/login",
  GET_USER: "/auth",
};

const token = global.window?.localStorage?.getItem("token");

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });

      if (data.success) {
        toast.success("You have successfully logged in!");
      } else {
        toast.error("Invalid email or password!");
      }
      if (data.token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        localStorage.setItem("token", data.token);
      }
      if (data.token.refreshToken) {
        localStorage.setItem("refreshToken", data.token.refreshToken);
      }
      console.log(data, "data");

      dispatch({
        type: ACTIONS.LOGIN_USER,
        data: data.data,
      });
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  };

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/auth");
    dispatch({
      type: ACTIONS.GET_USER,
      data
    });
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};
