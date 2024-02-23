import { ACTIONS } from "../actions/ServiceActions";

const initialState = {
  allServices: [],
  selectedService: {},
};

const ServiceData = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.SELECT_SERVICE:
      return {
        ...state,
        selectedService: data,
      };
    case ACTIONS.GET_SERVICES:
      return {
        ...state,
        allServices: data,
      };
    
    default:
      return state;
  }
};

export default ServiceData;
