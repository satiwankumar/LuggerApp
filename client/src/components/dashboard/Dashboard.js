import React,{useEffect, Fragment, useState} from 'react'
import {Link,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const Dashboard = () => {

    return(
        <div class="app-content content view home">
        <div class="content-wrapper">
          <div class="content-body"> 
          <section id="configuration" class="search view-cause">
              <div class="row">
                <div class="col-12">
                  <div class="card rounded pad-20">
                    <div class="card-content collapse show">
                      <div class="card-body  card-dashboard">
                        <div class="row">
                          <div class="col-md-12 col-12">
                            <h1 class="pull-left clr-blue">Admin Dashboard</h1>
                          </div>
                        </div>
                               <div class="quicks-wrapper">
                                      <div class="row">
                                            <div class="col-lg-12">
                                                  <div class="quick-stats-wrapper">
                                                            <h3 class="text-center">Quick Stats</h3>
                                                            <div class="row">
                                                                  <div class="col-lg-6">
                                                                    <div class="c100 p25 green">
                                                                      <span>$80</span>
                                                                      <div class="slice">
                                                                          <div class="bar"></div>
                                                                          <div class="fill"></div>
                                                                      </div>
                                                                    </div>
                                                                          <p class="text-center">Average Monthly Jobs</p>
                                                                  </div>
                                                                  <div class="col-lg-6">
                                                                    <div class="c100 p25 orange ">
                                                                      <span>$80</span>
                                                                      <div class="slice">
                                                                          <div class="bar"></div>
                                                                          <div class="fill"></div>
                                                                      </div>
                                                                  </div>
                                                                  <p class="text-center">Average Monthly Lugger Requests</p>
                                                            </div>
                                                
                                                  </div>
                                            </div>
                                            
                                      </div>
                                </div>
              
                                </div>
                               </div>
                        <div class="row m-0">
                      
                         
                            <div class="col-xl-12 col-12">
                              <div class="select-year">
                              <label class="d-block">Select Year</label>
                                <select name="" id="">
                                  <option value="">2020</option>
                                </select>
                              </div>
                            <div class="card mt-md-3 box-shad-unset w-100">
                            
                              <div class="row d-flex align-items-center">
                                <div class="col-12 col-xl-1  text-center">
                                  <div class="card-header">
                                    <h4 class="card-title text-center mb-md-0 mb-2">No.of Request</h4>
                                  </div>
                                </div>
                                <div class="col-xl-10 col-12 p-0">
                                  <div class="card-content collapse show">
                                    <div id="basic-column" class="height-400 echart-container"></div>
                                    <h5 class="text-center">Months</h5>
                                  </div>
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
