import React,{useEffect, Fragment, useState} from 'react'
import {Link,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Bar } from "react-chartjs-2";
const data = {
  labels: ['Jan', 'Feb', 'Mar', 'April', 'May' ,'june' ,'july','august','september','october','november','december'],
  datasets: [
    {
      label: 'No of Requests',
      data: [3, 2, 2, 6, 4,5,4,5,4,8,4,6,4],
      borderColor: [
        'rgba(0, 0, 0, 0.7)',
        'rgba(0, 0, 0, 0.7)'
        
],
      backgroundColor: [
        'rgba(51, 51, 51)',
       ' rgb(75,0,130)',
       'rgba(51, 51, 51)',
       ' rgb(75,0,130)',
       'rgba(51, 51, 51)',
       ' rgb(75,0,130)',
       'rgba(51, 51, 51)',
       ' rgb(75,0,130)',
       'rgba(51, 51, 51)',
       ' rgb(75,0,130)',
       'rgba(51, 51, 51)',
       ' rgb(75,0,130)'
        
      ]
    }
    // {
    //   label: '',
    //   data: [4, 3, 2, 2, 3],
    //   borderColor: [
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)'
    //   ],
    //   backgroundColor: [
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(54, 162, 235, 0.2)'
    //   ]
    // }
  ]
}

const options = {
  title: {
    display: true,
    text: 'Bar Chart'
  },
  scales: {
    yAxes: [
      {
        ticks: {
          min: 0,
          max: 6,
          stepSize: 1
        }
      }
    ]
  }
}

const Dashboard = () => {

    return(
        <div className="app-content content view home">
        <div className="content-wrapper">
          <div className="content-body"> 
          <section id="configuration" className="search view-cause">
              <div className="row">
                <div className="col-12">
                  <div className="card rounded pad-20">
                    <div className="card-content collapse show">
                      <div className="card-body  card-dashboard">
                        <div className="row">
                          <div className="col-md-12 col-12">
                            <h1 className="pull-left clr-blue">Admin Dashboard</h1>
                          </div>
                        </div>
                               <div className="quicks-wrapper">
                                      <div className="row">
                                            <div className="col-lg-12">
                                                  <div className="quick-stats-wrapper">
                                                            <h3 className="text-center">Quick Stats</h3>
                                                            <div className="row">
                                                                  <div className="col-lg-6">
                                                                    <div className="c100 p25 green">
                                                                      <span>$80</span>
                                                                      <div className="slice">
                                                                          <div className="bar"></div>
                                                                          <div className="fill"></div>
                                                                      </div>
                                                                    </div>
                                                                          <p className="text-center">Average Monthly Jobs</p>
                                                                  </div>
                                                                  <div className="col-lg-6">
                                                                    <div className="c100 p25 orange ">
                                                                      <span>$80</span>
                                                                      <div className="slice">
                                                                          <div className="bar"></div>
                                                                          <div className="fill"></div>
                                                                      </div>
                                                                  </div>
                                                                  <p className="text-center">Average Monthly Lugger Requests</p>
                                                            </div>
                                                
                                                  </div>
                                            </div>
                                            
                                      </div>
                                </div>
              
                                </div>
                               </div>
                               
                              
                              
                            
                        <div className="row m-0">
                      
                         
                            <div className="col-xl-12 col-12">
                              <div className="select-year">
                              <label className="d-block">Select Year</label>
                                <select name="" id="">
                                  <option value="">2020</option>
                                </select>
                              </div>
                            <div className="card mt-md-3 box-shad-unset w-100">
                            
                              <div className="row d-flex align-items-center">
                                <div className="col-12 col-xl-1  text-center">
                                  <div className="card-header">
                                    <h4 className="card-title text-center mb-md-0 mb-2">No.of Request</h4>
                                  </div>


                              

                                </div>
                                
                                <div className="col-xl-10 col-12 p-0">
                                <Bar data={data} options={options}/>
                                  
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
      
    )


        

}

Dashboard.propTypes = {
   
}

const mapStateToProps =(state)=>({
    
    auth : state.auth,
   
})

export default connect(mapStateToProps,{})(withRouter(Dashboard))
