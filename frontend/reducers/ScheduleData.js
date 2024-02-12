import { ACTIONS } from "../actions/ScheduleActions";

const initialState = {
  allSchedules: {
    loaded: false,
    data: [],
  },
};

const ScheduleData = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.GET_DOCTOR_SCHEDULES:
      return {
        ...state,
        allSchedules: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.CREATE_DOCTOR_SCHEDULE:
      return {
        ...state,
        allSchedules: {
          loaded: true,
          data: [...state.allSchedules.data, data],
        },
      };
    case ACTIONS.UPDATE_DOCTOR_SCHEDULE:
      return {
        ...state,
        allSchedules: {
          loaded: true,
          data: state.allSchedules.data.map((schedule) =>
            schedule.id === data.id ? data : schedule
          ),
        },
      };
    case ACTIONS.DELETE_DOCTOR_SCHEDULE:
      return {
        ...state,
        allSchedules: {
          loaded: true,
          data: state.allSchedules.data.filter(
            (schedule) => schedule.id !== data
          ),
        },
      };
    default:
      return state;
  }
}

export default ScheduleData;