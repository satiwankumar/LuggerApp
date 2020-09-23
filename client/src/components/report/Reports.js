
import React, { Fragment, useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
// import ProfileItem from './ProfileItem';
import { getReports } from '../../actions/reports';
import ReportItem from './ReportItem';
import Pagination from '../paginate/paginate';




const Reports = ({ getReports, reports: { Reports, loading } }) => {


  const [currentPage, setCurrentPage] = useState(1);
  const [ReportsPerPage] = useState(5);
      

  const indexOfLastPost = currentPage * ReportsPerPage;
  const indexOfFirstPost = indexOfLastPost - ReportsPerPage;
  const currentReports = Reports.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    getReports();
  }, [getReports]);


  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
          
        <Fragment>
          
        <div class="app-content content view home">
        <div class="content-wrapper">
          <div class="content-body"> 
        
            <section id="configuration" class="search view-cause go_go_geezers_general">
              <div class="row">
                <div class="col-12">
                  <div class="card rounded pad-20">
                    <div class="card-content collapse show">
                      <div class="card-body  card-dashboard">
                        <div class="row">
                          <div class="col-md-12 col-12">
                            <h1 class="u-m clr-blue ">report</h1>
             
                          </div>
                         
                        </div>
                       
                   
      
                        <div class="maain-tabble mt-3 table-responsive">
                          <table class="table table-striped table-bordered zero-configuration">
                            <thead>
                              <tr>
                                <th>S.no</th>
                                <th>Report ID</th>
                                <th>Reporting User</th>
                                <th>Reported User</th>
                                <th>Action</th>
                               
                              </tr>
                            </thead>
                           
                              
                            {
                                Reports.length > 0 ? (
                                    currentReports.map((report,index) => (
                                 <ReportItem key={report._id} report={report} index={index}/>
                               ))
                             ) : (
                               <h4>No User found...</h4>
                             )
                           }
                             <Pagination
                           ItemsPerPage={ReportsPerPage}
                           TotalItems={currentReports.length}
                           paginate={paginate}/>
                        
                              
      
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
         </Fragment>
          
    
    )}
          
    </Fragment>
      
  );
};

Reports.propTypes = {
  getReports: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  reports: state.reports,
});

export default connect(mapStateToProps, { getReports })(Reports);
