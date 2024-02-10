import { ACTIONS } from "../actions/MedicalRecordActions";

const initialState = {
  loaded: false,
  medicalRecords: [],
  patientMedicalRecords: [],
  medicalRecord: {},
};

const MedicalRecordData = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.GET_MEDICAL_RECORDS_BY_PATIENT_ID:
      console.log(data);
      return {
        ...state,
        loaded: true,
        patientMedicalRecords: data,
      };
    case ACTIONS.GET_MEDICAL_RECORD_BY_ID:
      return {
        ...state,
        loaded: true,
        medicalRecord: data,
      };
    case ACTIONS.CREATE_MEDICAL_RECORD:
      return {
        ...state,
        loaded: true,
        medicalRecord: data,
      };
    case ACTIONS.UPDATE_MEDICAL_RECORD:
      return {
        ...state,
        loaded: true,
        medicalRecord: data,
      };
    case ACTIONS.DELETE_MEDICAL_RECORD:
      return {
        ...state,
        loaded: true,
        medicalRecord: data,
      };
    default:
      return state;
  }
};

export default MedicalRecordData;
