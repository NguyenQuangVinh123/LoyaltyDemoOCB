import React, { Component} from 'react';

import { withRouter } from 'react-router-dom';
import ActionTypes from '../../../store/actions/actionTypes'
import { getUserData, isAPIRequestLoading } from '../../../store/reducers/applicationReducer';
import {connect} from 'react-redux'
import Header from '../Header/Header.component'
import Sidebar from '../SideBar/Sidebar';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }
  
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  componentDidMount(){
    var login_exist = this.props.userData ? this.props.userData.email : null;
    if(login_exist ===  null){
      this.props.history && this.props.history.push('/login')

    }
  }
  render() {
    
    return (
      
        <div>
        <header className='app-header navbar'>
            <Header />
        </header>
        <div className='app-body'>
            <Sidebar />
        
            <main className="main">
                <div className="">
                    
                </div>
                <div className="container-fluid">
                    <div className="animated fadeIn"></div>
                </div>
        </main> 
        </div>
           
    </div>
    );
  }
}

export default withRouter(connect(
  state =>({
    userData : getUserData(state),

    isLoading : isAPIRequestLoading(state,ActionTypes.LOGIN),
  }),{
    
  }
)(Dashboard));
