import React from "react";
import {connect} from 'react-redux'
import { getCustomerName } from "../../../../store/reducers/applicationReducer";
const HeaderWelcome = (props) => (
  <div className="header-welcome">
    <p className="header-welcome-text">
      Xin chào, <span style={{ fontWeight: "bold" }}>{props.customerData}</span>
    </p>
  </div>
);
export default connect(
  state =>({
    customerData : getCustomerName(state),
  }),{
   
  }
)(HeaderWelcome);