import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getUserById } from '../../actions/profile';



 const UserDetails = ({ getUserById, profile: { profile }, auth, match }) => {
  useEffect(() => {
  //  console.log(match.params.id)

    getUserById(match.params.id);
  }, [getUserById, match.params.id]);

     

        return (
          <Fragment>
            {profile === null ? (
              <Spinner />
            ) : (
              <Fragment>
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
                                    <a href=""> <i className="fa fa-chevron-left"></i>  </a>
                                    User Detail</h1>
                   
                                </div>
                              
                             
                              </div>
                          
                                <div className="row">
                                    <div className="col-12">
                                        <div className="basic-detail-card">
                                            <div className="basic-detail-card-head">
                                                <h2>Basic Details</h2>
                                            </div>
                                            <div className="basic-details-sec">
                                                <div className="row">
                                                    <div className="col-lg-2">
                                                          <div className="user-image-sectext-center">
                                                              <img src={profile.image} height="150" width="150"  style={{borderRadius:12.5}} alt="" className="userimg"/>
            
                                                          </div>
                                                          <div className="rating-stars text-center">
                                                      
                                                                  <i className="fa fa-star rated"></i>
                                                                  <i className="fa fa-star rated"></i>
                                                                  <i className="fa fa-star rated"></i>
                                                                  <i className="fa fa-star"></i>
                                                                  <i className="fa fa-star"></i>
                                                            
                                                          </div>
                                                    </div>
                                                    <div className="col-lg-9">
                                                               <h6>Personal Information</h6>
                                                               <div className="row">
                                                                   <div className="col-lg-6 mb-2">
                                                                       <label for="">First Name*</label>
                                                                       <input type="text" className="form-control disabled-input" value={profile.firstname}  placeholder="James" disabled/>
                                                                   </div>
                                                                   <div className="col-lg-6 mb-2">
                                                                            <label for="">Last Name*</label>
                                                                            <input type="text" className="form-control disabled-input" value={profile.lastname} placeholder="Walker" disabled/>
                                                                   </div>
                                                                   <div className="col-lg-6 mb-2">
                                                                             <label for="">Email*</label>
                                                                             <input type="text" className="form-control disabled-input" value={profile.email} placeholder="abc@xyz.com" disabled/>
                                                                   </div>
                                                                   <div className="col-lg-12">
                                                                       <a href="a-usertraveldetails.html" className="primary-button mr-2">User Travel Details</a>
                                                                       <a href="a-viewluggerbookingdetails.html" className="primary-button">Lugger Booked</a>
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
            
      
              </Fragment>
            )}
          </Fragment>
        );
      };
    
UserDetails.propTypes = {
  getUserById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getUserById })(UserDetails);
