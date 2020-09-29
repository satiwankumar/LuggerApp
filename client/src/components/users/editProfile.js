import React,{useEffect,Fragment,useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

import {Link,withRouter} from 'react-router-dom'

import { getCurrentProfile,updateProfile } from '../../actions/profile';



 const ViewProfile = ({getCurrentProfile,updateProfile   ,auth:{loading} ,profile:{currentProfile},history}) => {



    const [formData,setFormData] = useState({
      
        firstname:'',
        lastname:'',
 
    });
    const {firstname,lastname,email} = formData




    useEffect(() => {
        getCurrentProfile();
        setFormData({
            firstname: loading || !currentProfile.user.firstname? '' : currentProfile.user.firstname,
            lastname: loading || !currentProfile.user.lastname ? '' : currentProfile.user.lastname,
            email:loading || !currentProfile.user.lastname ? '' : currentProfile.user.email

        });

      }, [loading,getCurrentProfile]);

    

    const onchange=(e)=>{
        console.log(e.target.name)
        console.log(e.target.value)
        setFormData({...formData,[e.target.name]:e.target.value})

    }

  
    const onSubmit= async(e)=>{
        e.preventDefault()
        console.log("firstname,lastname")
        
        updateProfile(firstname,lastname,history)
     

    }


    
    return (
    

        
            <Fragment>
            
            {currentProfile !== null ? (
              <Fragment>
                  
                  <div>
          
              
              
              
                  <div className="app-content content view home">
                  <div className="content-wrapper">
                    <div className="content-body"> 

                      <section id="configuration" className="search view-cause go_go_geezers_general">
                        <div className="row">
                          <div className="col-12">
                            <div className="card rounded pad-20">
                              <div className="card-content collapse show">
                                <div className="card-body  card-dashboard">
                                  <div className="row">
                                    <div className="col-md-12 col-12">
                                       
                                      <h1 className="u-m clr-blue ">
                                       
                                       View Profile</h1>
                       
                                    </div>
                                  
                                 
                                  </div>
                              
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="basic-detail-card">
                                                <div className="basic-detail-card-head">
                                                    <h2> View Profile </h2>
                                                </div>
                                                <div className="basic-details-sec pl-5">

                                                         <div className="row">
                                                             <div className="col-12">
                                                              <div className="wrapper-img">
                                                                 
                                                                           <div className="left-part">
                                                                             <div className="d-flex">
                                                                                 <div className="user-left">
                                                                                 <img src={currentProfile.user.image} height="100" width="100" style={{borderRadius:50}}   alt="" className="profileimg"/>
                                                                                 </div>
                                                                                 <div className="right-sec-user align-self-center">
                                                                                        <h6>{firstname +" "+lastname}</h6>
                                                                                 </div>
                                                                             </div>
                                                                           </div>
                                                                        
                                                        
                                                             </div>
                                                             </div>
                                                         </div>
                                                <form onSubmit={e=>onSubmit(e)}>

                                                         <div className="row">
                                                              
                                                              
                                                              <div className="col-lg-6">
                                                                  <h3 className="v-p-i">Personal Information</h3>
                                                                      <div className="row mb-2">
                                                                              <div className="col-lg-3 align-self-center">
                                                                                      <label htmlFor="">First Name:</label>
                                                                              </div>
                                                                              <div className="col-lg-5">
                                                                                  <input type="text" className="form-control basic-input" value={firstname} name="firstname" onChange={(e)=>onchange(e)}  placeholder="John"/>
                                                                              </div>
                                                                      </div>
                                                                      <div className="row mb-2">
                                                                              <div className="col-lg-3 align-self-center">
                                                                                  <label htmlFor="">Last Name: </label>
                                                                              </div>
                                                                              <div className="col-lg-5">
                                                                                  <input type="text" className="form-control basic-input" name="lastname" value={lastname} onChange={(e)=>onchange(e)} placeholder="Smith"/>
                                                                          </div>
                                                                      </div>
                                                                      <div className="row mb-2">
                                                                          <div className="col-lg-3 align-self-center">
                                                                              <label htmlFor="">Email: </label>
                                                                          </div>
                                                                          <div className="col-lg-5">
                                                                              <input type="email" className="form-control basic-input"  name="email" value={email} onChange={(e)=>onchange(e)} placeholder="abc@zyz.com" disabled/>
                                                                      </div>
                                                                      </div>
                                                                  
                                                              </div>
                                                          
                                                          
                                                          
              
                                                      
                                                          
                                                         </div>
                                                         <div className="row">
                                                             <div className="col-12">
                                                                      <button type="submit" className="blocked-button" >Update</button>
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
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              
              
              
              
              
                  </div>
               
              </Fragment>
            
        
    
        

    ):'<h1>user Details doesonot found</h1>'

}
</Fragment>

)
}

ViewProfile.propTypes = {
    updateProfile:PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };


const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
  });
  
  export default connect(mapStateToProps, {updateProfile, getCurrentProfile })(withRouter(ViewProfile));


  