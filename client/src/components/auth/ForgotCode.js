import React ,{useState}from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {Link,Redirect} from 'react-router-dom'
import {verifyCode} from '../../actions/auth'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const ForgotCode = ({verifyCode,isAuthenticated,history },) => {

  const [formData,setFormData] = useState({
      
    resetCode:"",
    

});

const {resetCode} = formData
const onchange=(e)=>{
    // console.log(e.target.name)
    // console.log(e.target.value)
    setFormData({...formData,[e.target.name]:e.target.value})

}


const onSubmit= async(e)=>{
    e.preventDefault()
    console.log(resetCode)
    verifyCode(resetCode,history)
 

}





  if(isAuthenticated){
    return <Redirect to="/dashboard"/>

  }
  

    return (
        <div>
        <section className="register forget-pass">
        <div className="container">
          <div className="row">
            <div className="col-md-2 col-xl-3"></div>
            <div className="col-md-8 col-xl-6 col-12">
              <div className="register-main">
                <form onSubmit={e=>onSubmit(e)}>
                  <img src="images/logo.png" className="img-full" alt="logo"/>
                  <div className="form-main">
                  <div className="row">
                    <div className="col-md-12 text-center">
                       <h1>Password Recovery</h1>
                    </div>
                  </div>
               
                  
                  <div className="fields">
                    <div className="row">
                      
                      <div className="col-md-12">  
                        <i className="fa fa-pencil" aria-hidden="true"></i><input spellcheck="true" type="number" name="resetCode" spellcheck="true" className="form-control" onChange={e=>onchange(e)}  placeholder="Enter Verification Code"/>
                      </div> 
                      
                     
                    </div>
                    <button type="submit" className="form-control continue-button">continue</button>
                    <div className="new-user">
                
                      <Link to="/" className="login back"><i className="fa fa-long-arrow-left"></i>back to login</Link>
                      </div>
                  </div>
              
              
               
                
              </div>
              </form>
            </div>
              
          </div>
          <div className="col-md-2 col-xl-3"></div>
        </div>
        </div>

      </section>
      <ToastContainer autoClose={2000} />
      
        </div>
    )
}
ForgotCode.propTypes = {

  verifyCode: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
};
const mapStateToProps = (state) => ({
  passwordRecovery:state.passwordRecovery,
 isAuthenticated : state.auth.isAuthenticated,

 

});

export default connect(mapStateToProps, {verifyCode })(ForgotCode);

