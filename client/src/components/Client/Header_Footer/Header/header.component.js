import React, { Component } from 'react';
import SildeBackground from '../SlideBackground/SlideBackground.component';
import HeaderLogo from '../HeaderLogo/HeaderLogo.component';
import SlideContain from '../SlideContain/SlideContain.component';
import HeaderNav from '../HeaderNav/HeaderNav.component';
import HeaderWelcome from "../HeaderWelcome/HeaderWelcome.component";
import { connect } from 'react-redux';
import { getCustomerData } from '../../../../store/reducers/applicationReducer';

class Header extends Component {
    render() {
        return (
        <header style={{position : 'relative'}}>  
           <HeaderLogo />
           <div className="header-contain">
               <HeaderNav />
               {this.props.customerData ?  <HeaderWelcome  /> : null}
              
           </div>
           <div className="header-background">
                <SildeBackground />
                <SlideContain />
            </div>
           
           </header>
        );
    }
}
export default connect(
    state =>({
      customerData : getCustomerData(state),
    }),{
     
    }
  )(Header);
// export default Header;