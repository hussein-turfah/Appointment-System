import { ACTIONS } from "../actions/DoctorActions";

const initialState = {
  allDoctors: {
    loaded: false,
    data: [],
  },
};

const DoctorData = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.GET_ALL_DOCTORS:
      return {
        ...state,
        allDoctors: {
          loaded: true,
          data,
        },
      };
    default:
      return state;
  }
};

export default DoctorData;
