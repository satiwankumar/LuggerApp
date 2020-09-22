import React from 'react'
import {Link} from 'react-router-dom'

 const UserItem = ({user,index}) => {
    return (
    
        <tbody>
        <tr>
          <td>{index+1} </td> 
          <td>{user._id}</td>
          <td>{user.firstname}</td>
          <td>{user.lastname}</td>
          <td>{user.email}</td>
          <td>{user.status == true?"active":"blocked"}</td>
       

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
                <a
                  className="dropdown-item"
                  data-toggle="modal"
                  href="#blockuser"
                >
                  <i className="fa fa-ban"></i>Block{' '}
                </a>
              </div>
            </div>
          </td>
        </tr>
       
     
      </tbody>
     
    )
}
export default UserItem
