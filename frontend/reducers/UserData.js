import { ACTIONS } from "../actions/UserActions";

const initialState = {
  loaded: false,
  data: null,
};

const UserData = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        loaded: true,
        data,
      };
    default:
      return state;
  }
};

export default UserData;
