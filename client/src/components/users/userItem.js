import React, { Fragment, useState } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UpdateUserStatus } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 const UserItem = ({user,index, blockToggle,selection}) => {
    return (
    <Fragment>
      {user === null ? (
        <Spinner />
      ) : (
        <Fragment>
        <tbody>
        <tr>
          <td>{index+1} </td> 
          <td>{user._id}</td>
          <td>{user.firstname}</td>
          <td>{user.lastname}</td>
          <td>{user.email}</td>
          <td>{user.status == 0?"blocked":"active"}</td>
       

          <td>
            <div className="btn-group mr-1 mb-1">
              <button
                type="button"
                className="btn  btn-drop-table btn-sm"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {' '}
                <i className="fa fa-ellipsis-v"></i>
              </button>
              <div
                className="dropdown-menu userStyle"
                x-placement="bottom-start"
              >
            
                <Link
                  className="dropdown-item"
                  to={`/users/${user._id}`}                >
                  <i className="fa fa-eye"></i>VIEW{' '}
                </Link>
               { selection===1?(<a
                  className="dropdown-item"
                  onClick={e => blockToggle(user._id,0)}
                >
                  <i className="fa fa-ban"  ></i>Block{' '}
                </a>):
              (
                <a
                className="dropdown-item"
                onClick={e => blockToggle(user._id,1)}
              >
                <i className="fa fa-ban"  ></i>unBlock{' '}
              </a>)}
            
              </div>
            </div>
            </td>

      </tr>
        
     
    
     {
       //</tbody><div
      //   className="modal fade go-live-2"
      //   id="confirmmodal"
      //   tabindex="-1"
      //   role="dialog"
      //   aria-labelledby="modelTitleId"
      //   aria-hidden="true"
      // >
      //   <div className="modal-dialog" role="document">
      //     <div className="modal-content">
      //       <div className="modal-header">
      //         <button
      //           type="button"
      //           className="close"
      //           data-dismiss="modal"
      //           aria-label="Close"
      //         >
      //           <i className="fa fa-times-circle"></i>
      //         </button>
      //       </div>
      //       <div className="modal-body">
      //         <div className="blocked-modal-main-wrapper text-center">
      //           <div className="img-wrapper text-center">
      //             <img src="images/blockeduser.png" alt="" />
      //             <h2>System Message </h2>

      //             <p>User abc has been blocked</p>
      //           </div>
      //           <button
      //             data-dismiss="modal"
      //             className="cancel-button"
      //           >
      //             Got It
      //           </button>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
     }
      </tbody>


      
      </Fragment>
    )
      }
    </Fragment>
    )
}

UserItem.propTypes = {
 
  UpdateUserStatus:PropTypes.func.isRequired
  


};


export default connect(null, {})(UserItem);

