import { ACTIONS } from "../actions/DoctorActions";

const initialState = {
  allAppointments: {
    loaded: false,
    data: [],
  },
};

const DoctorData = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.GET_ALL_APPOINTMENTS:
      return {
        ...state,
        allAppointments: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.CREATE_APPOINTMENT:
      return {
        ...state,
        allAppointments: {
          loaded: true,
          data: [...state.allAppointments.data, data],
        },
      };
    case ACTIONS.UPDATE_APPOINTMENT:
      return {
        ...state,
        allAppointments: {
          loaded: true,
          data: state.allAppointments.data.map((appointment) =>
            appointment.id === data.id ? data : appointment
          ),
        },
      };
    case ACTIONS.DELETE_APPOINTMENT:
      return {
        ...state,
        allAppointments: {
          loaded: true,
          data: state.allAppointments.data.filter(
            (appointment) => appointment.id !== data
          ),
        },
      };
    case ACTIONS.GET_APPOINTMENT_BY_ID:
      return {
        ...state,
        allAppointments: {
          loaded: true,
          data: [data],
        },
      };
    case ACTIONS.GET_APPOINTMENT_BY_DOCTOR_ID:
      return {
        ...state,
        allAppointments: {
          loaded: true,
          data,
        },
      };
    default:
      return state;
  }
};

export default DoctorData;
