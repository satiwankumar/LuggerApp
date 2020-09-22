import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getLuggerById,UpdateluggerStatus } from '../../actions/lugger';




const LuggerRequestDetails = ({ getLuggerById,UpdateluggerStatus,lugger:{lugger} , match,history }) => {
  useEffect(() => {
    console.log(match.params.id)
 
    getLuggerById(match.params.id);
   }, [getLuggerById,match.params.id]);


   
    return (
      <Fragment>
            {lugger === null ? (
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
                                   
                                   Lugger Request</h1>
                   
                                </div>
                              
                             
                              </div>
                          
                                <div className="row">
                                    <div className="col-12">
                                        <div className="basic-detail-card">
                                            <div className="basic-detail-card-head">
                                                <h2> Details</h2>
                                            </div>
                                            <div className="basic-details-sec">
                                                <div className="row">
                                                   
                                                    <div className="col-lg-6">
                                                               <div className="row mb-2">
                                                                    <div className="col-lg-3 align-self-center">
                                                                          <label for="">Lug_ID:</label>
                                                                    </div>
                                                                    <div className="col-lg-9">
                                                                    
                                                                      <p className="field-desc">{lugger._id} </p>
                                                                    </div>
                                                               </div>
                                                               <div className="row mb-2">
                                                                 <div className="col-lg-3 align-self-center">
                                                                        <label for="">First Name*</label>
                                                                 </div>
                                                                 <div className="col-lg-3">
                                                                      
                                                                       <p  className="field-desc"> {lugger.user.firstname}   </p>
                                                               </div>
                                                                 <div className="col-lg-3 align-self-center">
                                                                           <label for="">Last Name*</label>
                                                                 </div>
                                                                 <div className="col-lg-3">
                                                                    <p  className="field-desc">{lugger.user.lastname}</p>
                                                              
          
                                                                 </div>
                                                               </div>
                                                               <div className="row mb-2">
                                                                <div className="col-lg-3 align-self-center">
                                                                       <label for="">From</label>
                                                                </div>
                                                                <div className="col-lg-3 align-self-center">
                                                                     
                                                                     <p className="field-desc">{lugger.from}</p>
                                                                     <p className="field-desc">London</p>
                                                                </div>
                                                                <div className="col-lg-3 align-self-center">
                                                                          <label for="">To</label>
                                                                </div>
                                                                <div className="col-lg-3 align-self-center">
                                                               
                                                                      <p className="field-desc">{lugger.to},</p>
                                                                      <p className="field-desc">New York</p>
                                                                </div>
                                                              </div>
                                                              <div className="row mb-2">
                                                                <div className="col-lg-3 align-self-center">
                                                                       <label for="">Total <br/> Weight: </label>
                                                                </div>
                                                                <div className="col-lg-3 ">
                                                                     
                                                                     <p className="field-desc">{lugger.totalWeight}</p>
                                                                  
                                                                </div>
                                                                <div className="col-lg-3 align-self-center">
                                                                          <label for="">Remaining  <br/>
                                                                            Weight:</label>
                                                                </div>
                                                                <div className="col-lg-3">
                                                               
                                                                      <p className="field-desc">{lugger.remainingWeight}</p>
                                                                    
                                                                </div>
                                                              </div>
                                                              <div className="row mb-2">
                                                                <div className="col-lg-3">
                                                                  <label for="">Cost Per Kg</label>
                                                                </div>
                                                                <div className="col-lg-9">
                                                                  <p className="field-desc">${lugger.costPerKg}</p>
                                                                </div>
                                                              </div>
                                                              <div className="row  mb-2">
                                                                <div className="col-lg-3">
                                                                  <label for="">Description</label>
                                                                </div>
                                                                    <div className="col-lg-9">
                                                                      <p className="field-desc">{lugger.description}</p>
                                                                    </div>
                                                              </div>
                                                              <div className="row mb-2">
                                                                <div className="col-lg-3 align-self-center">
                                                                       <label for="">Airline</label>
                                                                </div>
                                                                <div className="col-lg-3 align-self-center">
                                                                     
                                                                     <p className="field-desc">{lugger.airline}</p>
                                                                   
                                                                </div>
                                                                <div className="col-lg-3 align-self-center">
                                                                          <label for="">Flight Number</label>
                                                                </div>
                                                                <div className="col-lg-3 align-self-center">
                                                               
                                                                      <p className="field-desc">{lugger.flightNumber}</p>
                                                                     
                                                                </div>
                                                              </div>
                                                              <div className="row mb-2">
                                                                <div className="col-lg-3 align-self-center">
                                                                       <label for="">Travel Date:</label>
                                                                </div>
                                                                <div className="col-lg-3 align-self-center">
                                                                     
                                                                     <p className="field-desc">{lugger.travelDate}</p>
                                                                   
                                                                </div>
                                                                <div className="col-lg-3 align-self-center">
                                                                          <label for="">Arival Date:</label>
                                                                </div>
                                                                <div className="col-lg-3 align-self-center">
                                                               
                                                                      <p className="field-desc">{lugger.arrivalDate}</p>
                                                                     
                                                                </div>
                                                              </div>
                                                              <div className="row mb-2">
                                                                <div className="col-lg-12">
                                                                  <div className="form-check checkbox-noted">
                                                                    <input type="checkbox" className="form-check-input"  checked={lugger.delivery ? 'checked' : ''}  id="exampleCheck1"/>
                                                                    <label className="form-check-label" for="exampleCheck1">Delivery </label><br/>
                                                                    <label>The Lugger will deliver the parcel after {lugger.turnAroundTime} days of arrival</label>
                                                      
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div className="row mb-2">
                                                                <div className="col-lg-12">
                                                                     <p className="field-desc">Note:</p>
                                                                     <ul className="list-unstyled point-noted">
                                                   
                                                                       <li>Timer will start after the flight has been landed</li>
                                                                     </ul>
                                                                </div>
                                                              </div>
                                                              <div className="row mb-2">
                                                                         <div className="col-lg-12">
                                                                          <button className="cancel-button mr-3" data-toggle="modal" data-target="#approvalmodal" >Approve</button>
                                                                          <button className="blocked-button"  data-toggle="modal" data-target="#rejectmodal">Reject</button>
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
          
       
          <div className="modal fade go-live" id="approvalmodal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                          <div className="modal-header">
                                  
                                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                         <i className="fa fa-times-circle"></i>
                                      </button>
                              </div>
                      <div className="modal-body">
                       <div className="blocked-modal-main-wrapper text-center">
                           <div className="img-wrapper text-center">
                               <img src="images/blockeduser.png" alt=""/>
                               <p className="mb-0">Are you sure you want to Approve?</p>
                           </div>
                           <a  className="cancel-button go-live-btn" onClick={()=>UpdateluggerStatus(lugger._id,1,history)} > Yes</a>
                           <Link to={`/lugger/${lugger._id}`} data-dismiss="modal" className="blocked-button"  >No</Link>  
                       </div>
                      </div>
                     
                  </div>
              </div>
          </div>
          
          
          
          {
          
          // <div className="modal fade go-live-2" id="confirmmodal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
          //     <div className="modal-dialog" role="document">
          //         <div className="modal-content">
          //                 <div className="modal-header">
                                  
          //                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          //                                <i className="fa fa-times-circle"></i>
          //                             </button>
          //                     </div>
          //             <div className="modal-body">
          //              <div className="blocked-modal-main-wrapper text-center">
          //                  <div className="img-wrapper text-center">
          //                   <img src="images/approvalreq.png" alt=""/>
          //                   <h2>Lugger Request Has been Approved</h2>
                         
                            
          //                  </div>
            
                         
          //              </div>
          //             </div>
                     
          //         </div>
          //     </div>
          // </div>
          
          
          
          
          <div className="modal fade go-liivee" id="rejectmodal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                          <div className="modal-header">
                                  
                                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                         <i className="fa fa-times-circle"></i>
                                      </button>
                              </div>
                      <div className="modal-body">
                       <div className="blocked-modal-main-wrapper text-center">
                           <div className="img-wrapper text-center">
                               <img src="images/blockeduser.png" alt=""/>
                               <p className="mb-0">Are you sure you want to Reject?</p>
                           </div>
                           <a  className="cancel-button go-live-btn" onClick={()=>UpdateluggerStatus(lugger._id,2,history)} > Yes</a>
                           <Link to={`/lugger/${lugger._id}`} data-dismiss="modal" className="blocked-button"  >No</Link>  
                       </div>
                      </div>
                     
                  </div>
              </div>
          // </div>
          // <div className="modal fade go-liive-3" id="rejectreasonmodal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
          //     <div className="modal-dialog" role="document">
          //         <div className="modal-content">
          //                 <div className="modal-header">
                                  
          //                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          //                                <i className="fa fa-times-circle"></i>
          //                             </button>
          //                     </div>
          //             <div className="modal-body">
          //              <div className="blocked-modal-main-wrapper text-left">
          //                  <div className="img-wrapper text-left">
          //                      <h3>Please Provide Reason:</h3>
          //                      <textarea className="w-100 form-control" placeholder="Enter Reason here" ></textarea>
                               
          //                  </div>
                           
          //                  <button data-dismiss="modal" className="blocked-button pull-right golive-4">Send</button>  
          //              </div>
          //             </div>
                     
          //         </div>
          //     </div>
          // </div>
          
          
          
          // <div className="modal fade go-live-5" id="confirmmodal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
          //     <div className="modal-dialog" role="document">
          //         <div className="modal-content">
          //                 <div className="modal-header">
                                  
          //                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          //                                <i className="fa fa-times-circle"></i>
          //                             </button>
          //                     </div>
          //             <div className="modal-body">
          //              <div className="blocked-modal-main-wrapper text-center">
          //                  <div className="img-wrapper text-center">
          //                   <img src="images/approvalreq.png" alt=""/>
          //                   <h2>Lugger Request Has been Rejected</h2>
                         
                            
          //                  </div>
            
                         
          //              </div>
          //             </div>
                     
          //         </div>
          //     </div>
          // </div>
        }
    
      
              </Fragment>
            )}
          </Fragment>
       
    )}



LuggerRequestDetails.propTypes = {
  getLuggerById: PropTypes.func.isRequired,
  UpdateluggerStatus: PropTypes.func.isRequired,

  lugger: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  lugger: state.lugger
});

export default connect(mapStateToProps, { getLuggerById ,UpdateluggerStatus})(LuggerRequestDetails);

