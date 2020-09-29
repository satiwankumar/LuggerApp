import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import { NavLink,Link, Redirect } from 'react-router-dom';
import {logout} from '../../actions/auth'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DasboardActions = ({auth:{isAuthenticated,loading,user},logout}) => {
  
  const toggleMenu = () => {
    document.querySelector('body').classList.toggle('menu-collapsed')
  }

  const authLinks = (
    <div>

    <nav className="header-navbar navbar-expand-md navbar navbar-with-menu fixed-top navbar-light navbar-border">
      <div className="navbar-wrapper">
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item mobile-menu d-md-none mr-auto">
              <Link
                className="nav-link nav-menu-main menu-toggle hidden-xs"
                to="#"
              >
                <i className="ft-menu font-large-1"></i>
              </Link>
            </li>
            <li className="nav-item">
              {' '}
              <Link to="/dashboard" className="navbar-brand" >
                {' '}
                <img
                  className="brand-logo"
                  alt="stack admin logo"
                  src={`${process.env.PUBLIC_URL}/images/logo.png`}
                />{' '}
              </Link>{' '}
            </li>
            <li className="nav-item d-md-none">
              {' '}
              <a
                className="nav-link open-navbar-container"
                data-toggle="collapse"
                data-target="#navbar-mobile"
              >
                <i className="fa fa-ellipsis-v"></i>
              </a>{' '}
            </li>
          </ul>
        </div>
        <div className="navbar-container content">
          <div className="collapse navbar-collapse" id="navbar-mobile">
            <ul className="nav navbar-nav mr-auto float-left"></ul>
            <ul className="nav navbar-nav float-right">
              <li className="dropdown dropdown-notification nav-item">
                {' '}
                <a
                  className="dropdown-toggle nav-link nav-link-label"
                  href="#"
                  data-toggle="dropdown"
                >
                  <i className="fa fa-bell mr-0"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-media dropdown-menu-right">
                  <li className="dropdown-menu-header">
                    <h6 className="dropdown-header m-0">
                      {' '}
                      <span className="grey darken-2">
                        Notifications
                      </span>{' '}
                      <span className="notification-tag badge badge-default bg-dark float-right m-0">
                        <a href="#"> 5 New</a>
                      </span>{' '}
                    </h6>
                  </li>
                  <li
                    className="scrollable-container media-list ps-container ps-theme-dark ps-active-y"
                    data-ps-id="cbae8718-1b84-97ac-6bfa-47d792d8ad89"
                  >
                    {' '}
                    <a href="#/">
                      <div className="media">
                        <div className="media-left align-self-center">
                          <i className="fa fa-envelope icon-bg-circle bg-dark"></i>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">
                            You have new order!
                          </h6>
                          <p className="notification-text font-small-3 text-muted">
                            Lorem ipsum{' '}
                          </p>
                          <small>
                            <time
                              className="media-meta text-muted"
                              dateTime="2015-06-11T18:29:20+08:00"
                            >
                              30 minutes ago
                            </time>
                          </small>{' '}
                        </div>
                      </div>
                    </a>{' '}
                    <a href="#/">
                      <div className="media">
                        <div className="media-left align-self-center">
                          <i className="fa fa-envelope icon-bg-circle bg-dark"></i>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">
                            You have new order!
                          </h6>
                          <p className="notification-text font-small-3 text-muted">
                            Lorem ipsum{' '}
                          </p>
                          <small>
                            <time
                              className="media-meta text-muted"
                              dateTime="2015-06-11T18:29:20+08:00"
                            >
                              30 minutes ago
                            </time>
                          </small>{' '}
                        </div>
                      </div>
                    </a>{' '}
                  </li>
                  <li className="dropdown-menu-footer">
                    <a
                      className="dropdown-item text-muted text-center"
                      href="a-notifications.html"
                    >
                      View all
                    </a>
                  </li>
                </ul>
              </li>

              <li className="dropdown dropdown-user nav-item">
                {' '}
                <a
                  className="dropdown-toggle nav-link dropdown-user-link"
                  href="#"
                  data-toggle="dropdown"
                >
                  {' '}
                  <span className="avatar avatar-online">
                    {' '}
                    <img
                      src={user && user.image}
                      height="50"
                      width="50"
                      style={{borderRadius:12.5}}
                      alt="avatar"
                    />{' '}
                  </span>{' '}
                  <span className="user-name">{user&& user.firstname}</span>{' '}
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <Link
                    className="dropdown-item"
                    to="/viewprofile"
                  >
                    <i className="fa fa-user"></i>View Profile
                  </Link>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item"
                    data-toggle="modal"
                    href="#logoutmodal"
                   
                  >
                    <i className="fa fa-power-off"></i>Logout
                  </a>{' '}
                </div>
              </li>
              <li className="nav-item d-none d-md-block">
                <a
                  className="nav-link nav-menu-main menu-toggle hidden-xs"
                  href="#"
                  onClick={toggleMenu}
                >
                  <i className="fa fa-bars"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <div
      className="main-menu menu-fixed menu-light menu-accordion"
      data-scroll-to-active="true"
    >
      <div className="main-menu-content">
        <ul
          className="navigation navigation-main"
          id="main-menu-navigation"
          data-menu="menu-navigation"
        >
          <li className="nav-item ">
            <Link  to="/dashboard">
              <i className="fa fa-area-chart" aria-hidden="true"></i>
              <span className="menu-title" data-i18n="">
                Dashboard
              </span>
           </Link>
          </li>
          <li className="nav-item ">
            <Link to="/users">
              <i className="fa fa-user-circle"></i>
              <span className="menu-title" data-i18n="">
                User
              </span>
           </Link>
          </li>
          <li className="nav-item">
            <Link to="/lugger">
              <i className="fa fa-briefcase" aria-hidden="true"></i>
              <span className="menu-title" data-i18n="">
                Lugger Report
              </span>
           </Link>
          </li>

          <li className="nav-item ">
            <Link to="/report">
              <i className="fa fa-calendar-check-o" aria-hidden="true"></i>
              <span className="menu-title" data-i18n="">
                Report Log
              </span>
           </Link>
          </li>
        </ul>
      </div>
    </div>


  


<div className="modal fade" id="logoutmodal" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
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
               <p className="mb-0">Are you sure you want to Logout?</p>
           </div>

           <Link to="/" onClick={()=>  logout()} className="cancel-button">yes</Link>
            <Link to="/dashboard" className="blocked-button">No</Link>
       </div>
      </div>
     
  </div>
</div>
</div>
<ToastContainer autoClose={2000} />

</div>
  )

  return (
    <div>
   
{!loading && (<Fragment>{isAuthenticated?authLinks:<Redirect to="/" />}</Fragment>)}

   
    </div>
    
  );
};

DasboardActions.propTypes = {
  logout:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
};


const mapStateToProps=state=>({
  auth:state.auth
})

export default connect(mapStateToProps,{logout})(DasboardActions)

