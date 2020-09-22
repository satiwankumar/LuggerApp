import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_CURRENT_PROFILE,
  UPDATE_PROFILE,
  GET_USERS

} from '../actions/types';

const initialState = {
  currentProfile:null,
  profile: null,
  Users: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_CURRENT_PROFILE:
    case UPDATE_PROFILE:
        return {
          ...state,
          currentProfile: payload,
          loading: false
    };
    case GET_USERS:
      return {
        ...state,
        Users: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
        currentProfile:null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        currentProfile:null
        
      };
    
    default:
      return state;
  }
}
