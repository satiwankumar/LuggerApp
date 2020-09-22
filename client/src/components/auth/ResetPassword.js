import React ,{useState}from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {Link,Redirect} from 'react-router-dom'
import {resetPassword} from '../../actions/auth'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const ResetPassword = ({resetPassword,isAuthenticated, code,history },) => {
    const [formData,setFormData] = useState({
      
        newPassword:"",
        confirmPassword:""
       
        
        
    
    });
    // useEffect(() => {
    //     setFormData({
          
    //         resetCode:loading || !code ? '' : code

    //     });

    //   }, [loading,code]);
    
 

const {newPassword,confirmPassword} = formData
const onchange=(e)=>{
    // console.log(e.target.name)
    // console.log(e.target.value)
    setFormData({...formData,[e.target.name]:e.target.value})

}


const onSubmit= async(e)=>{
    e.preventDefault()
console.log(newPassword,confirmPassword,code)
    resetPassword(newPassword,confirmPassword,code,history)
 

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
                      
                    <div className="col-md-12 email-input-sec mb-2">
                    <i className="fa fa-lock"></i><input type="password" className="form-control" spellcheck="true" value={newPassword} name="newPassword"  placeholder="Enter new Password" onChange={(e)=>onchange(e)}/>
                  </div>
                  <div className="col-md-12 email-input-sec pass-see-icon">
                  <i className="fa fa-lock"></i><input type="password" spellcheck="true" className="form-control" value={confirmPassword} name="confirmPassword" placeholder="Retype Password" onChange={(e)=>onchange(e)}/>
                 
                </div>
                      
                     
                    </div><br/>
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
ResetPassword.propTypes = {

resetPassword: PropTypes.func.isRequired,
isAuthenticated:PropTypes.bool,
passwordRecovery: PropTypes.bool,
code:PropTypes.string,
};
const mapStateToProps = (state) => ({
  passwordRecovery:state.passwordRecovery,
 isAuthenticated : state.auth.isAuthenticated,
 code:state.auth.code
 

});

export default connect(mapStateToProps, {resetPassword })(ResetPassword);

