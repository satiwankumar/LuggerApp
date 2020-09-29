import React from 'react'
import {Link} from 'react-router-dom'

 const ReportItem = ({report,index}) => {
    return (
    
        <tbody>
        <tr>
          {/* <td>{index+1} </td>  */}
          <td>{report._id}</td>

          <td>{report.reportingUser.firstname +" " +report.reportingUser.lastname  }</td>
  
          <td>{report.reportOn.firstname+" "+report.reportOn.lastname}</td>
          
       
  

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
                  to={`/report/${report._id}`}                >
                  <i className="fa fa-eye"></i>VIEW{' '}
                </Link>
               
              </div>
            </div>
          </td>
        </tr>
       
     
      </tbody>
     
    )
}
export default ReportItem
