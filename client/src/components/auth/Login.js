import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from'prop-types'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import {login} from '../../actions/auth'

const Login = ({isAuthenticated,login},props) => {
// const [refresh, setstate] = useState(false)

    const [formData,setFormData] = useState({
      
        email:'',
        password:'',
 
    });

    const {email,password} = formData
    const onchange=(e)=>{
        // console.log(e.target.name)
        // console.log(e.target.value)
        setFormData({...formData,[e.target.name]:e.target.value})

    }

  
    const onSubmit= async(e)=>{
        e.preventDefault()
        console.log("email,password")
        // console.log(email,password)
        login(email,password)
     

    }
  

    //Redirect if logged int
    if(isAuthenticated){
      return <Redirect to="/dashboard"/>

    }
    return (
       <>
                  <section className="register loginn">

                  <div className="container">
                  <div className="card border-0 edit-profile-card ">
                    <div className="main-sec">
                      <div className="card-body p-0">
                        <div className="row m-0">
                          <div className="col-lg-6 p-0 d-flex">
                            <div className="login-wrapper  w-100">
                              <div className="logo-image text-center">
                                <img src="images/login-logo.png" alt="" className="login-img"/>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 p-0 d-flex w-100">
                            <div className="login-main-sec">
                              <div className="login-head text-center">
                                <h1>Login</h1>
                                <h3>Login To Your Account</h3>
                              </div>
                              <div className="form-main">
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="img-div">
                                      <div className="img-div-inner"> </div>
                                    </div>
                                  </div>
                                </div>
                                
                            
                                <form onSubmit={e=>onSubmit(e)}>
                                  <div className="fields">
                                    <div className="row">
                                      <div className="col-md-12 email-input-sec mb-2">
                                        <i className="fa fa-envelope"></i><input type="text" className="form-control" spellCheck="true" value={email} name="email"  placeholder="Enter Email Address" onChange={(e)=>onchange(e)} required/>
                                      </div>
                                      <div className="col-md-12 email-input-sec pass-see-icon">
                                        <i className="fa fa-lock"></i><input type="password" spellCheck="true" className="form-control" value={password} name="password" placeholder="Enter Password" onChange={(e)=>onchange(e)} required />
                                        <div  className="eye-btn"><i className="fa fa-eye-slash"></i></div>
                                      </div>
                                    </div>
                                    <div className="remember-mer-sec-wrapper">
                                      <div className="d-flex d-block justify-content-between text-center">
                                        <div className="left-login-content align-self-center">
                                          <label className="check-box-container mb-0">Remember me
                                          <input type="checkbox" checked="" readOnly/>
                                          <span className="checkbox-checkmark"></span>
                                          </label>
                                        </div>
                                        <div className="right-login-content align-self-center"><Link to="/forgotpassword">Forgot Password?</Link></div>
                                          
                                   
                                      </div>
                                    </div>
                                    <button type="submit" className="form-control"><span>LOGIN</span><i className="fa fa-angle-right pl-2" aria-hidden="true"></i></button>
                                  
                                    <div className="go-back-sec text-center">
                                      <a href="#"><i className="fa fa-arrow-left w-5" aria-hidden="true"></i>Back To Website</a>
                                      </div>
                            
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
            </section>
            <ToastContainer autoClose={2000} />

            </>



   


    )
}


Login.propTypes={
 login:PropTypes.func.isRequired,
 isAuthenticated:PropTypes.bool 
}
const mapStateToProps = state =>({
isAuthenticated : state.auth.isAuthenticated
})


export default connect(mapStateToProps,{login})(Login)
