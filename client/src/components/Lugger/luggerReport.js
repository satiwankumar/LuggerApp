import React, { Fragment, useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getLuggers } from '../../actions/lugger';
import Pagination from '../paginate/paginate';

import LuggerItem from './LuggerItem';


 const LuggerReport = ({ getLuggers, lugger: { Luggers, loading } }) => {





  const [currentPage, setCurrentPage] = useState(1);
  const [LuggerPerPage] = useState(5);
      


  useEffect(() => {
    getLuggers();
  }, [getLuggers]);


  const indexOfLastPost = currentPage * LuggerPerPage;
  const indexOfFirstPost = indexOfLastPost - LuggerPerPage;
  const currentLuggers = Luggers.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
     
        <Fragment>

        {
          loading ? (
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
                            <h1 className="u-m clr-blue ">Lugger Report</h1>
             
                          </div>
                   
                       
                        </div>

      
                        <div className="maain-tabble mt-3 table-responsive">
                          <table className="table table-striped table-bordered zero-configuration">
                            <thead>
                              <tr>
                                <th>S.no</th>
                                <th>User ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Status</th>
                                <th>Action</th>
                               
                              </tr>
                            </thead>
                       
                    
                            {
                              Luggers.length > 0 ? (
                               currentLuggers.map((lugg,index) => (
                               <LuggerItem key={lugg._id} lugger={lugg} index={index} />
                             ))
                           ) : (
                             <h4>No Lugger found...</h4>
                           )
                         }
                                               <Pagination
                         ItemsPerPage={LuggerPerPage}
                         TotalItems={Luggers.length}
                         paginate={paginate}
                       />
                            </table>
                                   
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
      
      
      
      <div className="modal fade go-live" id="unblockuser" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
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
                           <h2>System Message </h2>
                            <p>Are you sure you want to Un-block this user?</p>
                       </div>
                       <a data-toggle="modal" href="#confirmmodal" className="cancel-button go-live-btn"> Yes</a>
                       <button data-dismiss="modal" className="blocked-button ">No</button>  
                   </div>
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
LuggerReport.propTypes = {
  getLuggers: PropTypes.func.isRequired,
 
};

const mapStateToProps = (state) => ({
  lugger: state.lugger
});

export default connect(mapStateToProps, { getLuggers })(LuggerReport);

