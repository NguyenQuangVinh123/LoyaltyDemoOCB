import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import { getUserData } from '../../../store/reducers/applicationReducer';
import { connect } from 'react-redux';
import {get} from 'lodash'
class Sidebar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        
        }
        
    }   
    componentDidMount(){
    
    }
   
    render(){
       
        return(
            <div className='sidebar' style={{height : 'calc(100vh - 55px)'}}>
                <div className="scrollbar-container sidebar-nav ps ps-container">
                    <ul className="nav">
                            <li className="nav-item">
                                <a className="nav-link active" href="#/dashboard" aria-current="page">
                                    <i className="nav-icon icon-speedometer"></i>Dashboard</a></li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/product'><i className="nav-icon icon-drop"></i>Quản lý sản phẩm</Link>
                            
                            </li>
                            {
                                get(this.props,'userData.role',null) === '0' ? <li className="nav-item">
                                    <Link className="nav-link" to='/user'><i className="nav-icon icon-drop"></i>Quản lý tài khoản</Link>
                                </li> : <Redirect to= '/login' />
                            }
                            
                    </ul>
                </div>
            </div>
        )
    }
    
} 
    
export default connect(
    state =>({
      userData : getUserData(state),
  
      
    }),{
      
    }
  )(Sidebar);

