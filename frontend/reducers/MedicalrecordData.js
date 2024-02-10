import { ACTIONS } from "../actions/MedicalRecordActions";

const initialState = {
  loaded: false,
  medicalRecords: [],
  medicalRecord: {},
};

export default function MedicalRecordData(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CREATE_MEDICAL_RECORD:
      return {
        ...state,
        loaded: true,
        medicalRecords: [...state.medicalRecords, action.data],
      };
    case ACTIONS.UPDATE_MEDICAL_RECORD:
      return {
        ...state,
        loaded: true,
        medicalRecords: state.medicalRecords.map((record) =>
          record.id === action.data.id ? action.data : record
        ),
      };
    case ACTIONS.DELETE_MEDICAL_RECORD:
      return {
        ...state,
        loaded: true,
        medicalRecords: state.medicalRecords.filter(
          (record) => record.id !== action.id
        ),
      };
    case ACTIONS.GET_MEDICAL_RECORD_BY_ID:
      return {
        ...state,
        loaded: true,
        medicalRecord: action.data,
      };
    case ACTIONS.GET_MEDICAL_RECORDS_BY_PATIENT_ID:
      return {
        ...state,
        loaded: true,
        medicalRecords: action.data,
      };
    default:
      return state;
  }
}
