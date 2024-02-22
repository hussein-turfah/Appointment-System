import { ACTIONS } from "../actions/ServiceActions";

const initialState = {
  allServices: [],
  selectedService: {},
};

const ServiceData = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.GET_SERVICES:
      return {
        ...state,
        allServices: data,
      };
    case ACTIONS.CREATE_SERVICE:
      return {
        ...state,
        allServices: [...state.allServices, data],
      };
    case ACTIONS.UPDATE_SERVICE:
      return {
        ...state,
        allServices: state.allServices.map((service) =>
          service.id === data.id ? data : service
        ),
      };
    case ACTIONS.DELETE_SERVICE:
      return {
        ...state,
        allServices: state.allServices.filter((service) => service.id !== data),
      };
    default:
      return state;
  }
};

export default ServiceData;
