import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {connect} from 'react-redux'
import ActionTypes from '../../../store/actions/actionTypes'
import {  Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { getUserData, isAPIRequestLoading } from '../../../store/reducers/applicationReducer';
import { login} from '../../../store/actions/appilcationActions';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email : '',
            password : ''
        }
        this.loginAccount = this.loginAccount.bind(this)
        this.changeHandel = this.changeHandel.bind(this)

    }
    loginAccount(){
        const {email,password} = this.state;
        const {login} = this.props;
        login && login({
          email,
          password,
          onSuccess : (response) =>{
            console.log(response)
            // console.log(this.props)
            this.props.history.push('/dashboard')
          }
        })
        // axios.post('/api/users/login',{
        //     email  : this.state.email,
	      //     password : this.state.password
        // }).then(response => {
        //     if(response.data.data.status === '0'){
        //       alert('Tài khoản bạn chưa được kích hoạt')
        //     }else{
        //       localStorage.setItem('name',response.data.data.name)
        //       localStorage.setItem('role',response.data.data.role)
  
        //       this.props.history && this.props.history.push('/dashboard')
        //     }
           
        // })
        // .catch(function (error) {
        //     alert('Vui lòng kiểm tra username/password')
        // });
    }
    changeHandel({email = this.state.email,password = this.state.password}){
        this.setState({
            email,password
        })
    }
  render() {
      
      console.log(this.state.email)
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input onChange={(e) => this.changeHandel({email:e.target.value})} value={this.state.email} type="text" placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input onChange={(f) => this.changeHandel({password:f.target.value})} type="password" value={this.state.password} placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                     <button onClick={this.loginAccount}>Login</button>
                    </Form>
                  </CardBody>
                </Card>
                
              </CardGroup> 
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(connect(
  state =>({
    userData : getUserData(state),

    isLoading : isAPIRequestLoading(state,ActionTypes.LOGIN),
  }),{
    login,
  }
)(Login));
