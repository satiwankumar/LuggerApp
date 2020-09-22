import {
   GET_REPORTS,
   REPORT_ERROR,
   GET_REPORT
  
  } from '../actions/types';
  
  const initialState = {
    
  
    Reports: [],
    Report:null,
    loading: true,
    error: {}
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      
        case GET_REPORT:
        return {
          ...state,
          
          Report: payload,
          loading: false
        };
      case GET_REPORTS:
        return {
          ...state,
          Reports: payload,
          loading: false
        };
     case REPORT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        Reports: null,
        Report:null
      };
      
    //
      
      default:
        return state;
    }
  }
  