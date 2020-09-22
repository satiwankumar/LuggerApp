import api from '../utils/api';
import { setAlert } from './alert';
import {  toast } from 'react-toastify';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SUCCESS_VERIFY_CODE,
  SUCCESS_FORGOTPASSWORD,
  LOGOUT
} from './types';

// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/auth');
    console.log(res)
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = formData => async dispatch => {
  try {
    const res = await api.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const body = { email, password };
  console.log(email,password)

  try {
    const res = await api.post('/auth/login', body);
console.log(res)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
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
  } catch (err) {
    // console.log(errors)
    const errors = err.response.data.errors;

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

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

  //forgot password

export const forgotPassword=(email,history)=>async dispatch=>{
 
  const body = JSON.stringify({email})

  try {
      const res = await  api.post('/auth/login/forgot',body)
      console.log(res)
      dispatch({
        type: SUCCESS_FORGOTPASSWORD,
        payload: res.data
      });
        const message  = await res.data.message

      toast.success(`🦄  ${message} `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,




        })
        history.push('/forgotCode')
     
    } 
    

    
      
     
      catch (err) {

    const errors = err.response.data.errors;
      errors.forEach(error=>error)


    if (errors) {
      errors.forEach(error => toast.error(`🦄 ${error}`, {
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
      dispatch(
          {
              type:LOGIN_FAIL
          }
      )
  }

}

export const verifyCode=(resetCode,history)=>async dispatch=>{
 
  const body = JSON.stringify({resetCode})

  try {
      const res = await  api.post('/auth/login/verifycode',body)
      console.log(res)
      dispatch({
        type: SUCCESS_VERIFY_CODE,
        payload: resetCode
      });


      toast.success(`🦄  ${res.data.message} `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,




        })
        history.push('/resetpassword')
     
    } 
    

    
      
     
      catch (err) {

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
      dispatch(
          {
              type:LOGIN_FAIL
          }
      )
  }

}





export const resetPassword=(newpassword,confirmpassword,resetCode,history)=>async dispatch=>{
 
    console.log(resetCode)
  const body = JSON.stringify({newpassword,confirmpassword})

  try {
      const res = await  api.post(`/auth/login/reset/${resetCode}`,body)
      console.log(res)
      dispatch({
        type: SUCCESS_VERIFY_CODE,
        payload: res.data
      });


      toast.success(`🦄  ${res.data.message} `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,




        })
        history.push('/')
     
    } 
    

    
      
     
      catch (err) {

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
      dispatch(
          {
              type:LOGIN_FAIL
          }
      )
  }

}


// Logout
export const logout = ()=>async  dispatch=> {

  const res = await  api.get('/auth/logout')
  console.log(res)
  dispatch( { type: LOGOUT })
 
  toast.success(`🦄 ${res.data.message}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    })

 


}
