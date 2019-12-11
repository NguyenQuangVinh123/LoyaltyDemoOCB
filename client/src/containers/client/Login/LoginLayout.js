import React from "react";
import {connect} from 'react-redux'
import ActionTypes from '../../../store/actions/actionTypes'
import { getCustomerData } from '../../../store/reducers/applicationReducer';
import { loginCustomer,clearUserData} from '../../../store/actions/appilcationActions';
import Modal from 'react-modal';
import LoginCustomer from "../../../components/Client/Header_Footer/LoginCustomer/LoginCustomer";
const customStyles = {
  content : {
    top                   : '15%',
    left                  : '30%',
    right                 : '30%',
    bottom                : 'auto',
    border                : '1px solid orange',
    backgroundColor       : 'white',
    overflow              : 'none'
  },
  overlay: {zIndex: 1000}
};

Modal.setAppElement(document.getElementById('root'))

class LoginLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openLoginModal : false
    };
    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeModal = this.closeModal.bind(this)
    this.logOut = this.logOut.bind(this)

    
  }
  logOut (){
    var a = 1;
    clearUserData && clearUserData()
    console.log(this.props.customerData)
    // alert('Bạn đã đăng xuất thành công')
   
  }
  openLoginModal = () =>{
    this.setState({
      openLoginModal : true
    })
  }
  closeModal = () =>{
    this.setState({
      openLoginModal : false
    })
  }

  render() {
    const { openLoginModal } = this.state;

    return (
      <div>
        {
        this.props.customerData ? (
          <div>
            <div style={{display:'flex'}}>
                  <img alt=''
                    src={require("../../../assets/img/login_user.png")}
                    width="20px"
                    height="22px"
                  />
                  <p
                    style={{ padding: "0.5rem !important" }}
                    className="nav-link "
                    onClick = {this.logOut}
                  >
                    Đăng xuất
                  </p>
            </div>
          </div>
        ) : (
          <div style={{display:'flex'}}>
          <img alt=''
              src={require("../../../assets/img/login_user.png")}
              width="20px"
              height="22px"
            />
            <p
              style={{ padding: "0.5rem !important" }}
              className="nav-link"
              onClick={this.openLoginModal}
            >
              Đăng nhập
            </p>
            {
              openLoginModal === true ? 
              <Modal
              isOpen ={true}
              onRequestClose={this.closeModal}
              style = {customStyles}
              contentLabel="Example Modal"
            >
              <LoginCustomer  closeModal = {this.closeModal}/>
              
            </Modal>
            :null
            }
            
          </div>
          
        )}
      </div>
    );
  }
}
export default connect(
  state =>({
    customerData : getCustomerData(state),
  }),{
    loginCustomer,
    clearUserData
  }
)(LoginLayout);

  
