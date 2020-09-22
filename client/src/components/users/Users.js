
import React, { Fragment, useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
// import ProfileItem from './ProfileItem';
import { getUsers } from '../../actions/profile';
import UserItem from './userItem';
import Pagination from '../paginate/paginate';




const Users = ({ getUsers, profile: { Users, loading } }) => {


  const [currentPage, setCurrentPage] = useState(1);
  const [UsersPerPage] = useState(5);
      


  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const indexOfLastPost = currentPage * UsersPerPage;
  const indexOfFirstPost = indexOfLastPost - UsersPerPage;
  const currentUsers = Users.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);
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
                                <h1 className="u-m clr-blue ">Users</h1>
                              </div>
                              <div className="col-md-12 pull-right">
                                <a
                                  href="a-blocked-users.html"
                                  className="primary-button pull-right"
                                >
                                  Blocked Users
                                </a>
                              </div>
                            </div>

                            <div className="maain-tabble mt-3 table-responsive">
                              <table className="table table-striped table-bordered zero-configuration">
                                <thead>
                                  <tr>
                                    <th>S.no</th>
                                    <th>User ID</th>
                                    <th>first Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                
                                 {
                                   Users.length > 0 ? (
                                    currentUsers.map((user,index) => (
                                    <UserItem key={user._id} user={user} index={index}/>
                                  ))
                                ) : (
                                  <h4>No User found...</h4>
                                )
                              }
                                                    <Pagination
                              ItemsPerPage={UsersPerPage}
                              TotalItems={Users.length}
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

                <div
                  className="modal fade go-live-2"
                  id="confirmmodal"
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

                            <p>User abc has been blocked</p>
                          </div>
                          <button
                            data-dismiss="modal"
                            className="cancel-button"
                          >
                            Got It
                          </button>
                        </div>
                      </div>
                    </div>
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
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getUsers })(Users);
