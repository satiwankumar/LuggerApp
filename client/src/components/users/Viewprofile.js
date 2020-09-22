import React,{useEffect,Fragment} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';


import { getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';

 const ViewProfile = ({getCurrentProfile,    auth ,profile:{currentProfile}}) => {
    useEffect(() => {
        getCurrentProfile();
      }, [getCurrentProfile]);
    
    return (
    
        <Fragment>
        {currentProfile === null ? (
          <Spinner />
        ) : (
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
                                                                  <div className="d-flex justify-content-between">
                                                                           <div className="left-part">
                                                                             <div className="d-flex">
                                                                                 <div className="user-left">
                                                                                     <img src={currentProfile.user.image} height="100" width="100" style={{borderRadius:50}}   alt="" className="profileimg"/>
                                                                                 </div>
                                                                                 <div className="right-sec-user align-self-center">
                                                                                        <h6></h6>
                                                                                 </div>
                                                                             </div>
                                                                           </div>
                                                                           <div className="right-part align-self-center">
                                                                               <Link className="edit-pro-button" to="/editprofile">Edit Profile</Link>
                                                                           </div>
                                                                  </div>    
                                                             </div>
                                                             </div>
                                                         </div>
                                                       <div className="row">
                                                          
                                                          
                                                        
                                                           <div className="col-lg-6">
                                                                <h3 className="mb-2 p-i">Personal Information</h3>
                                                                   <div className="row mb-2">
                                                                          <div className="col-lg-3 align-self-center">
                                                                                  <label htmlFor="">Firstname</label>
                                                                          </div>
                                                                          <div className="col-lg-9">
                                                                              <p className="field-desc">{currentProfile.user.firstname}</p>
                                                                          </div>
                                                                   </div>
                                                                   <div className="row mb-2">
                                                                          <div className="col-lg-3 align-self-center">
                                                                              <label htmlFor="">Last Name: </label>
                                                                          </div>
                                                                          <div className="col-lg-9">
                                                                              <p className="field-desc">{currentProfile.user.lastname}</p>
                                                                          </div>
                                                                   </div>
                                                                   <div className="row mb-2">
                                                                      <div className="col-lg-3 align-self-center">
                                                                          <label htmlFor="">Email: </label>
                                                                      </div>
                                                                      <div className="col-lg-9">
                                                                          <p className="field-desc">{currentProfile.user.email}</p>
                                                                      </div>
                                                                   </div>
                                                               
                                                           </div>
                                                       
                                                        
                                                         
              
                                                    
                                                        
                                                       </div>
              
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
            )
        }
           
          </Fragment>
        

    )
}

ViewProfile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };


const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
  });
  
  export default connect(mapStateToProps, { getCurrentProfile })(ViewProfile );
  