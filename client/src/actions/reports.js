import api from '../utils/api';
import {  toast } from 'react-toastify';

import {
    GET_REPORTS,REPORT_ERROR,GET_REPORT

} from './types';



// Get all reports
export const getReports = () => async dispatch => {
//   dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await api.get('/report');

    dispatch({
      type: GET_REPORTS,
      payload: res.data
    });
  } catch (err) {
    
    dispatch({
      type: REPORT_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
      
    });
  }
};

// Get profile by ID
export const getReportById = reportId => async dispatch => {
  
  try {
    const res = await api.get(`/report/${reportId}`);
      // console.log(res)
    dispatch({
      type: GET_REPORT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REPORT_ERROR,
      // payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


