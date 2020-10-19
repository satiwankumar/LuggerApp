
import React, { Fragment, useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ReactPaginate from 'react-paginate';
import { getUsers, UpdateUserStatus,SortAction } from '../../actions/profile';
import UserItem from './userItem';
import Pagination from '../paginate/paginate';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Users = ({ getUsers,SortAction, UpdateUserStatus, profile: { Users, loading }, history }) => {


  const [currentID, setCurrentID] = useState('')
  const [Selection, setSelection] = useState(1)
  const [blockStatus, setBlockStatus] = useState(1)
  const [OrderState,setOrderState] = useState(1)

  const [page, setPage] = useState(1)
  const [limit,setlimit] = useState(5)
     

   const blockToggleUser = (id,status) => {
     setCurrentID(id)
    
     setBlockStatus(status)

     window.jQuery('#blockuser').modal('show');
   }

  useEffect(() => {
// alert(page,limit,Selection)
    getUsers(page,limit,Selection);
  }, [getUsers,page,limit,Selection]);


  
  const toggleOrder=()=>{
    const currentState = OrderState ===1?-1:1
      setOrderState(currentState)
      return OrderState
  }
  const handleChange=(e)=> {
    alert(e.target.value)
    let value = e.target.value;
    
   setlimit(value)
}
const handlePageClick = (data) => {
  
    let selected = data.selected +1;
    // console.log(selected)
    setPage(selected);
   
};
  // const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
      
          <div className="app-content content view home">
            <div className="content-wrapper">
              <div className="content-body">
                <section
                  id="configuration"
                  className="search view-cause go_go_geezers_general"
                >
                  <div className="row">
                    <div className="col-12">
                      <div className="card rounded pad-20">
                        <div className="card-content collapse show">
                          <div className="card-body  card-dashboard">
                            <div className="row">
                              <div className="col-md-12 col-12">
                                <h1 className="u-m clr-blue ">Users </h1>
                              </div>
                              <div className="col-md-12 pull-right">
                                <Link
                                  to={`/${Selection}===1?"active":"blocked"`}
                                  className="primary-button pull-right"
                                  
                                  onClick={(e)=>{
                                    
                                    setSelection(Selection==0?1:0)
                                    // setPage('')
                                    // setlimit('')
                                  }}
                                >
                                 {Selection==1? "Blocked Users":"Active Users"}
                                </Link>
                              </div>
                            </div>



<div className="maain-tabble mt-3 table-responsive">
<div
  id="DataTables_Table_0_wrapper"
  className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer"
>
  <div className="row">
    <div className="col-sm-12 col-md-6">
      <div
        className="dataTables_length"
        id="DataTables_Table_0_length"
      >
        <label>
          Show{' '}
          <select
            name="DataTables_Table_0_length"
            aria-controls="DataTables_Table_0"
            className="form-control form-control-sm"
            onChange={(e) => handleChange(e)}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>{' '}
          entries
        </label>
      </div>
    </div>
    <div className="col-sm-12 col-md-6">
      <div
        id="DataTables_Table_0_filter"
        className="dataTables_filter"
      >
        <label>
          Search:
          <input
            spellCheck="true"
            type="search"
            className="form-control form-control-sm"
            placeholder="Search"
            aria-controls="DataTables_Table_0"
          />
        </label>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-sm-12">
      <table
        className="table table-striped table-bordered zero-configuration dataTable no-footer"
        id="DataTables_Table_0"
        role="grid"
        aria-describedby="DataTables_Table_0_info"
      >
        <thead>
          <tr role="row">
            {/* <th
              className="sorting_asc"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              rowSpan={1}
              colSpan={1}
              aria-sort="ascending"
              aria-label="S.no: activate to sort column descending"
              style={{ width: '54px' }}
            >
              S.no
            </th> */}
            <th
              className="sorting"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              rowSpan={1}
              colSpan={1}
              aria-label="User ID: activate to sort column ascending"
              style={{ width: '78px' }}
              
            >
              User ID
            </th>
            <th
              className="sorting"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              rowSpan={1}
              colSpan={1}
              aria-label="Full Name: activate to sort column ascending"
              style={{ width: '107.6px' }}
              onClick={()=>SortAction("firstname",toggleOrder())}
            >
              First Name
            </th>
            <th
              className="sorting"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              rowSpan={1}
              colSpan={1}
              aria-label="Last Name: activate to sort column ascending"
              style={{ width: '110px' }}
              onClick={()=>SortAction("lastname",toggleOrder())}
            >
              Last Name
            </th>
            <th
              className="sorting"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              rowSpan={1}
              colSpan={1}
              aria-label="Email: activate to sort column ascending"
              style={{ width: '154.8px' }}
              onClick={()=>SortAction("email",toggleOrder())}
            >
              Email
            </th>
            <th
              className="sorting"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              rowSpan={1}
              colSpan={1}
              aria-label="Status: activate to sort column ascending"
              style={{ width: '78px' }}
              onClick={()=>SortAction("status",toggleOrder())}
            >
              Status
            </th>
            <th
              className="sorting"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              rowSpan={1}
              colSpan={1}
              aria-label="Action: activate to sort column ascending"
              style={{ width: '78px' }}
            >
              Action
            </th>
          </tr>
        </thead>
        {
           Object.keys(Users).length > 0 ? (
            Users.data.map((user,index) => (
           <UserItem key={user._id} blockToggle={blockToggleUser} user={user} index={index} selection={Selection}/>
         ))
       ) : (
         <h4>No User found...</h4>
       )
     }
                           {/* <Pagination
     ItemsPerPage={UsersPerPage}
     TotalItems={Users.length}
     paginate={paginate}
   /> */}
      </table>
    </div>
  </div>
  <div class="col-12">
                      <ul class="noti-pagination pagination pull-right">
                                                        <ReactPaginate
                                                            containerClassName="pagination"
                                                            pageClassName="paginate_button page-item"
                                                            pageLinkClassName="page-link"
                                                            activeClassName="active"
                                                            previousClassName="page-item previous"
                                                            previousLinkClassName="page-link"
                                                            nextClassName=" page-item next"
                                                            nextLinkClassName="page-link"
                                                            activeLinkClassName="active"
                                                            previousLabel={'previous'}
                                                            nextLabel={'next'}
                                                            breakLabel={'...'}
                                                            breakClassName={'break-me'}
                                                            pageCount={Users.total}
                                                            marginPagesDisplayed={2}
                                                            pageRangeDisplayed={Users.perPage}
                                                            onPageChange={handlePageClick}
                                                            containerClassName={'pagination'}
                                                            subContainerClassName={'pages pagination'}
                                                            activeClassName={'active'}
                                                        />
                                                        </ul>
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

          <div
            className="modal fade go-live"
            id="blockuser"
            tabindex="-1"
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="fa fa-times-circle"></i>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="blocked-modal-main-wrapper text-center">
                    <div className="img-wrapper text-center">
                      <img src="images/blockeduser.png" alt="" />
                      <h2>System Message </h2>
                      <p>Are you sure you want to block this user?</p>
                    </div>
                
                    <a
                      data-toggle="modal"
                      href="#confirmmodal"
                      className="cancel-button go-live-btn"
                    
                      onClick={()=>{UpdateUserStatus(currentID,blockStatus,history)}}
                    >
                      {' '}
                      Yes
                    </a>
                    <button
                      data-dismiss="modal"
                      className="blocked-button "
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </Fragment>
        
      )}
    </Fragment>
  );
};

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  // UpdateluggerStatus:PropTypes.func.isRequired,
  UpdateUserStatus:PropTypes.func.isRequired


};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getUsers, UpdateUserStatus,SortAction })(Users);
