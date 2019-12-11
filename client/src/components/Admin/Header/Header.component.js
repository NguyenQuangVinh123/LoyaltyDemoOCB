import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import ActionTypes from '../../../store/actions/actionTypes'
import { getUserData, isAPIRequestLoading } from '../../../store/reducers/applicationReducer';
import {connect} from 'react-redux'
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../../assets/img/brand/logo.svg'
import sygnet from '../../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: ''
    }
    this.exit = this.exit.bind(this)
  }
  
  exit(){
    
    localStorage.removeItem('name');
    localStorage.removeItem('role');

    this.props.history && this.props.history.push('/login')
  }
  render() {
    const { userData } = this.props;
    // eslint-disable-next-line
    // const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          
        </Nav>
        <Nav className="ml-auto" navbar style={{marginRight : '15px'}} >
            
            <DropdownToggle nav>
              <img src={''} className="img-avatar"/>
              <span style={{marginRight : '15px'}}>Xin chào {userData ? userData.email : '' }</span>
            </DropdownToggle>
           <button onClick={this.exit}>Thoát</button>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default withRouter(connect(
  state =>({
    userData : getUserData(state),

    isLoading : isAPIRequestLoading(state,ActionTypes.LOGIN),
  }),{
    
  }
)(Header));
