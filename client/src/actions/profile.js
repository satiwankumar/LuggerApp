import api from '../utils/api';
import {  toast } from 'react-toastify';
import {loadUser } from './auth'
import {
  GET_PROFILE,
  GET_CURRENT_PROFILE,
  GET_USERS,
  PROFILE_ERROR,
  CLEAR_PROFILE

} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await api.get('/users/me');

    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      // payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all profiles
export const getUsers = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await api.get('/users');

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    
    dispatch({
      type: PROFILE_ERROR,
      // payload: { msg: err.response.statusText, status: err.response.status }
      
    });
  }
};

// Get profile by ID
export const getUserById = userId => async dispatch => {
  
  try {
    const res = await api.get(`/users/${userId}`);
      console.log(res)
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      // payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


export const updateProfile = (firstname,lastname,history)=> async dispatch=>{
  const body = { firstname, lastname };

    try {


        const res = await api.put('/users/edit',body)
      // console.log(res)
        dispatch({
            type:GET_CURRENT_PROFILE,
            payload : res.data
        })

        toast.success(`🦄 ${res.data.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
      
          
    dispatch(loadUser());
      
        if(res){
            history.push('/viewprofile')
         }
    } catch (err) {
   
      const errors = err.response.data.errors;
      console.log(errors)

      if (errors) {
        errors.forEach(error => toast.error(`🦄 ${error.msg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
      )
          
      }
     
    }
}




// Get Github repos
// export const getGithubRepos = username => async dispatch => {
//   try {
//     const res = await api.get(`/profile/github/${username}`);

//     dispatch({
//       type: GET_REPOS,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: NO_REPOS
//     });
//   }
// };

// // Create or update profile
// export const createProfile = (
//   formData,
//   history,
//   edit = false
// ) => async dispatch => {
//   try {
//     const res = await api.post('/profile', formData);

//     dispatch({
//       type: GET_PROFILE,
//       payload: res.data
//     });

//     dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

//     if (!edit) {
//       history.push('/dashboard');
//     }
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//     }

//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// Add Experience
// export const addExperience = (formData, history) => async dispatch => {
//   try {
//     const res = await api.put('/profile/experience', formData);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data
//     });

//     dispatch(setAlert('Experience Added', 'success'));

//     history.push('/dashboard');
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//     }

//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// Add Education
// export const addEducation = (formData, history) => async dispatch => {
//   try {
//     const res = await api.put('/profile/education', formData);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data
//     });

//     dispatch(setAlert('Education Added', 'success'));

//     history.push('/dashboard');
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//     }

//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// Delete experience
// export const deleteExperience = id => async dispatch => {
//   try {
//     const res = await api.delete(`/profile/experience/${id}`);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data
//     });

//     dispatch(setAlert('Experience Removed', 'success'));
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// // Delete education
// export const deleteEducation = id => async dispatch => {
//   try {
//     const res = await api.delete(`/profile/education/${id}`);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data
//     });

//     dispatch(setAlert('Education Removed', 'success'));
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// // Delete account & profile
// export const deleteAccount = () => async dispatch => {
//   if (window.confirm('Are you sure? This can NOT be undone!')) {
//     try {
//       await api.delete('/profile');

//       dispatch({ type: CLEAR_PROFILE });
//       dispatch({ type: ACCOUNT_DELETED });

//       dispatch(setAlert('Your account has been permanently deleted'));
//     } catch (err) {
//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status }
//       });
//     }
//   }
// };
