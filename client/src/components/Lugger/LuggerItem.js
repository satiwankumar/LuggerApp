import React from 'react'
import {Link } from 'react-router-dom'

 const LuggerItem = ({lugger,index}) => {
    return (
    
      <tbody>
      <tr>
          {/* <td>{index+1} </td>  */}
          <td>{lugger.user._id}</td>
        <td>{lugger.user.firstname}</td>
        <td>{lugger.user.lastname}</td>
        <td>{lugger.from}</td>
        <td>{lugger.to}</td>
        <td>{lugger.status === 0? "pending":lugger.status == 1? "Approved":lugger.status == 2? "Rejected": lugger.status == 3 ? "Landed":lugger.status == 4? "Delivered":''}</td>
        


     
        <td>
          <div className="btn-group mr-1 mb-1">
            <button type="button" className="btn  btn-drop-table btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fa fa-ellipsis-v"></i></button>
            <div className="dropdown-menu luggerStyle" x-placement="bottom-start">
              <Link className="dropdown-item"   to={`/lugger/${lugger._id}`}  ><i className="fa fa-eye"></i>VIEW </Link>
                 
             
             
            
            </div>
            </div>
          </td>
        </tr>
        </tbody>

       
          
     
    )
}
export default LuggerItem
