import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getReportById } from '../../actions/reports';



 const ReportDetails = ({ getReportById, report: { Report },  match }) => {


  useEffect(() => {
   console.log(match.params.id)

  getReportById(match.params.id);


  }, [getReportById, match.params.id]);

     

        return (
          <Fragment>
            {Report === null ? (
              <Spinner />
            ) : (
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
                                   
                                   Report Details</h1>
                   
                                </div>
                              
                             
                              </div>
                          
                                <div className="row">
                                    <div className="col-12">
                                        <div className="basic-detail-card">
                                            <div className="basic-detail-card-head">
                                                <h2> Report Information </h2>
                                            </div>
                                            <div className="basic-details-sec">
                                                   <div className="row">
                                                       <div className="col-lg-6">
                                                            <h3 className="mb-2">User Reported</h3>
                                                               <div className="row mb-2">
                                                                <div className="col-lg-3 align-self-center">
                                                                       <label for="">Reported  Name:</label>
                                                                </div>
                                                                <div className="col-lg-9">
                                                                    <p className="field-desc">{Report.reportOn.firstname}</p>
                                                                </div>
                                                               </div>
                                                               <div className="row mb-2">
                                                              <div className="col-lg-3 align-self-center">
                                                                     <label for="">Reported Email: </label>
                                                              </div>
                                                              <div className="col-lg-9">
                                                                  <p className="field-desc">{Report.reportOn.email}</p>
                                                              </div>
                                                               </div>
                                                             
                                                               <div className="row mb-2">
                                                                  <div className="col-lg-3 align-self-center">
                                                                      <label for="">Report Reason:</label>
                                                                  </div>
                                                                  <div className="col-lg-9">
                                                                      <p className="field-desc">{Report.reportReason}</p>
                                                                  </div>
                                                              </div>
                                                       </div>
                                                       <div className="col-lg-6">
                                                          <h3  className="mb-2">User Reporting</h3>
                                                             <div className="row mb-2">
                                                              <div className="col-lg-3 align-self-center">
                                                                     <label for="">Reporter Name:</label>
                                                              </div>
                                                              <div className="col-lg-9">
                                                                  <p className="field-desc">{Report.reportingUser.firstname}</p>
                                                              </div>
                                                             </div>
                                                             <div className="row mb-2">
                                                                      <div className="col-lg-3 align-self-center">
                                                                              <label for="">Reporter Email: </label>
                                                                      </div>
                                                                      <div className="col-lg-9">
                                                                          <p className="field-desc">{Report.reportingUser.email}</p>
                                                                      </div>
          
                                                             </div>
                                                           
                                                         
                                                     </div>
                                                    
                                                     
          
                                                
                                                    
                                                   </div>
          
                                                   <div className="row mb-2">
                                                        <div className="col-lg-6">
                                                              <div className="row">
                                                                  <div className="col-lg-3 align-self-center">
                                                       
                                                                  </div>
                                                                  <div className="col-lg-9">
                                                                      <p className="field-desc">{}</p>
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
            )}
          </Fragment>
        );
      };
    
ReportDetails.propTypes = {
  getReportById: PropTypes.func.isRequired,
  report: PropTypes.object.isRequired,

};

const mapStateToProps = (state) => ({
  report: state.reports
});

export default connect(mapStateToProps, { getReportById })(ReportDetails);
