import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_CURRENT_PROFILE,
  UPDATE_PROFILE,
  GET_USERS,
  UPDATE_USER_STATUS

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
  case  UPDATE_USER_STATUS:

    // payload.ID

    const s = {...state}


    const idx = s.Users.findIndex(user => user._id === payload.ID );
          s.Users[idx].status = !s.Users[idx].status

    s.Users.filter(u => u._id !== payload.ID)


    return{
        ...s,
      loading:false
    } 
    default:
      return state;
  }
}
