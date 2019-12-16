import React from 'react'
import { connect } from 'react-redux';
import {  getCustomerData,isAPIRequestLoading } from '../../../../store/reducers/applicationReducer';
import ActionTypes from '../../../../store/actions/actionTypes';
import {loginCustomer} from '../../../../store/actions/appilcationActions';
import axios from 'axios';
import configs from '../../../../config/config';
class LoginCustomer extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            email_customer : '',
            password_customer : '',
        }
        this.changeHandel = this.changeHandel.bind(this)
        this.loginABCXYZ = this.loginABCXYZ.bind(this)

    }
    changeHandel({email_customer = this.state.email_customer,password_customer = this.state.password_customer}){
        this.setState({
            email_customer,password_customer
        })
    }
    loginABCXYZ(e){
        console.log(e)
        const {email_customer,password_customer} = this.state;
        // axios.post(`${configs.serverUrl}/api/customers/loginCustomer`,{
        //     email_customer : email_customer,
        //     password_customer :password_customer
        // }).then(
        //     response =>{
        //         console.log(response)
        //     }
        // ).catch(
        //     err => console.log(err)
        // )
        
        // const {loginCustomer} = this.props;
        this.props.loginCustomer && this.props.loginCustomer({
            email_customer,
            password_customer,
            onSuccess : (response) =>{
            if(response.status === 200){
                alert('Bạn đã đăng nhập thành công')
                this.props.closeModal()
            }
          }
        })
    }
    render(){
        return(
            <div className='login-modal'>
                <div className= 'row col-lg-12 col-md-12 col-xs-12 loin-modal-container'>
                    <div className="col-lg-5 col-md-5 col-xs-4 login-modal-info" >
                        <div className="login-modal-header">
                            <p className="login-modal-header-title">ĐĂNG NHẬP</p>
                            <p className="login-modal-header-content">Đăng nhập để xem danh sách quà yêu thích đổi quà và xem thông tin ưu đãi hấp dẫn</p>
                            <img alt='' src={require('../../../../assets/img/login_picture.png')} className='login-modal-header-img' width='200px' height='300px' />
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-7 col-xs-8">
                        <div className="row col-lg-12 col-md-12 scroll-login">
                            <div className="col-lg-6 col-md-5 cool-link active">
                                <a   id="login-form-link">Đăng nhập</a>
                            </div>
                            <div className="col-lg-6 col-md-7 cool-link">
                                <a  id="register-form-link">Quên mật khẩu</a>
                            </div>
                        </div>
                        <div className="error">
                            <p style={{textAlign: "center",color: "red",fontSize: "13pt",fontWeight: "400"}}>
                                Thông báo lỗi xuất hiện ở vị trí này. Canh giữa
                            </p>
                        </div>
                        <div>
                       
                            <div className="form-group row">
                                <label htmlFor="staticEmail" style={{paddingRight: "0",fontSize: "12pt",fontWeight: "500"}} className="col-sm-3 col-form-label">Tên đăng nhập</label>
                                <div className="col-sm-9" style={{padding :"0"}}>
                                    <input type='text' onChange={(e) => this.changeHandel({email_customer:e.target.value})} style={{backgroundColor : "#f5f5f5"}} className='form-control' id="staticEmail"  placeholder="Nhập tên đăng nhập của bạn" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputPassword" style={{paddingRight: "0",fontSize: "12pt",fontWeight: "500"}} className="col-sm-3 col-form-label">Mật khẩu</label>
                                <div className="col-sm-9"  style={{padding: "0"}}>
                                    <input type='password' onChange={(f) => this.changeHandel({password_customer:f.target.value})} style={{backgroundColor : "#f5f5f5"}} className='form-control' id="inputPassword"  placeholder="Mật khẩu từ 6 đến 32 ký tự" />
                                </div>
                            </div>
                            <div className="" style={{display: "flex",marginTop: "40px",justifyContent: "center",alignItems: "center"}}>
                                <button  onClick={this.loginABCXYZ} className="btn btn-login">ĐĂNG NHẬP</button>
                            </div>
                            <div className="forgot-pass-mobile" ><a href="#">Quên mật khẩu?</a></div>
                       
                    </div>
                    </div>
                  
                </div>
                <div onClick={this.props.closeModal} className='login-modal-close'>
                    X
                </div>
            </div>
        )
    }
}
export default connect(
    state =>({
        userData : getCustomerData(state),

      isLoading : isAPIRequestLoading(state,ActionTypes.LOGIN_CUSTOMER),
    }),{
        loginCustomer,
    }
)(LoginCustomer);