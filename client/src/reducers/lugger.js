import {
   
    GET_LUGGERS,
    Get_LUGGER_DETAIL,
    UPDATE_LUGGER,
    Lugger_ERROR
  
  } from '../actions/types';
  
  const initialState = {
   Luggers: [],
   loading :false,   
   lugger:null,
   error: {}
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
     
      case GET_LUGGERS:
        return {
          ...state,
          Luggers: payload,
          loading: false
        };
        case Get_LUGGER_DETAIL:
            return {
              ...state,
              lugger: payload,
              loading: false
            };
      case  UPDATE_LUGGER:
        return {
          ...state,
          // lugger: payload,
          loading: false
        
      }

    case Lugger_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        lugger: null
      };
   

      default:
        return state;
    }
  }
  