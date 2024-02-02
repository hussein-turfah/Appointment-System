import { ACTIONS } from "../actions/UserActions";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const UserData = (state = initialState, {
  type,
  data
}) => {
  switch (type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: data,
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: data,
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: data,
      };
    default:
      return state;
  }
};

export default UserData;
