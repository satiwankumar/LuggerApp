import React, { useState,useEffect } from 'react';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {forgotPassword } from '../../actions/auth';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForgotPassword = ({forgotPassword,isAuthenticated, passwordRecovery,history },) => {
  const [formData, setFormData] = useState({
    email: ''
  });

  const { email } = formData;
  const onchange = (e) => {

    // console.log(e.target.name)
    // console.log(e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email)
    forgotPassword(email,history);
  };

  //Redirect if logged int

   
  if(isAuthenticated){
    return <Redirect to="/dashboard"/>

  }
  return (
    <section className="register forget-pass">
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-xl-3"></div>
          <div className="col-md-8 col-xl-6 col-12">
            <div className="register-main">
            <form onSubmit={e=>onSubmit(e)}>
                <img src="images/logo.png" className="img-full" alt="logo" />
                <div className="form-main">
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <h1>Password Recovery</h1>
                    </div>
                  </div>

                  <div className="fields">
                    <div className="row">
                      <div className="col-md-12">
                        <i className="fa fa-envelope"></i>
                        <input
                          spellcheck="true"
                          type="email"
                          spellcheck="true"
                          value={email}
                          onChange={e=>onchange(e)}
                          name="email"
                          className="form-control"
                          placeholder="Enter Email Address"
                          required="required"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="form-control continue-button">
                      continue
                    </button>
                    <div className="new-user">
                      <a href="/login" className="login back">
                        <i className="fa fa-long-arrow-left"></i>back to login
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-2 col-xl-3"></div>
        </div>
      </div>
      <ToastContainer autoClose={2000} />

    </section>
  );
};


 
 

forgotPassword.propTypes = {

  forgotPassword: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool ,
  passwordRecovery: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  passwordRecovery:state.passwordRecovery,
 isAuthenticated : state.auth.isAuthenticated

});

export default connect(mapStateToProps, {forgotPassword })(ForgotPassword);
