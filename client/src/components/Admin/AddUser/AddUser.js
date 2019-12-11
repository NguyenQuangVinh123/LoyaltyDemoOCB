import React, { Component } from 'react';
import {  Card, CardHeader, Col, Row } from 'reactstrap';
import axios from 'axios'
import Header from '../Header/Header.component'
import Sidebar from '../SideBar/Sidebar';


class AddUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : '',
            email : '',
            sdt : '',
            role: 0,
            status : 1,
            password: ''
        };
        this.changeHandel = this.changeHandel.bind(this);
        this.addUser = this.addUser.bind(this);

    }
  
    addUser(e){
        e.preventDefault();
        
        axios.post('/api/users/register',{
            "name": this.state.name,
            "email": this.state.email,
            "sdt": this.state.sdt,
            "role": this.state.role,
            "status": this.state.status,
            "password":  this.state.password
        })
        .then(response =>{
          alert('Bạn đã thêm tài khoản thành công')
          this.props.history && this.props.history.push('/user')
        })
    }
    changeHandel({name = this.state.name,email = this.state.email,
        sdt = this.state.sdt ,role = this.state.role,status = this.state.status,password = this.state.password}){
        this.setState({
            name,email,sdt,role,status,password
        })
        // console.log({this.state.name,})
    }
  render() {    

    return (
     
    <div>
        <header className='app-header navbar'>
            <Header />
        </header>
          <div className='app-body'>
            <Sidebar />
            <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card style={{width:'1000px'}}>
              <CardHeader>
                 Thêm tài khoản
              </CardHeader>
            
                <label style={{marginTop:'20px',fontWeight:'bold',fontSize:'15px'}}>Tên tài khoản :</label>
                <input type='text' onChange={(e) => this.changeHandel({name:e.target.value})} value={this.state.name} placeholder='Tên tài khoản' />
                <label style={{marginTop:'20px',fontWeight:'bold',fontSize:'15px'}}>Mật khẩu tài khoản :</label>
                <input type='password' onChange={(e) => this.changeHandel({password:e.target.value})} value={this.state.password} placeholder='Mật khẩu tài khoản' />
                <label style={{marginTop:'20px',fontWeight:'bold',fontSize:'15px'}}>Email tài khoản:</label>
                <input type='email' onChange={(e) => this.changeHandel({email:e.target.value})} value={this.state.email}  placeholder='Email tài khoản' />
                <label style={{marginTop:'20px',fontWeight:'bold',fontSize:'15px'}}>Số điện thoại :</label>
                <input type='tel' onChange={(e) => this.changeHandel({sdt:e.target.value})} value={this.state.sdt} placeholder='Số điện thoại' />
                <label style={{marginTop:'20px',fontWeight:'bold',fontSize:'15px'}}>Loại tài khoản :</label>
                <select style={{width:'15%'}} onChange={(e) => this.changeHandel({role:e.target.value})}>
                    <option value='0'>Super Admin</option>
                    <option value='1'>Admin</option>    
    
                </select>                     
                <label style={{marginTop:'20px',width:'15%',fontWeight:'bold',fontSize:'15px'}}>Kích hoạt tài khoản</label>
                <select style={{width:'15%'}} onChange={(e) => this.changeHandel({status:e.target.value})}>
                    <option value='1'>Có</option>
                    <option value='0'>Không</option>    
    
                </select>               
                <div style={{display:'flex',justifyContent:'center',marginTop:'15px',marginBottom:'10px'}}>
                  <input className='btn-css3 p-1' style={{width:'50%'}} type='submit' onClick ={this.addUser} />

                </div>
             
            </Card>
          </Col>
        </Row>
      </div>
          </div>
      
        </div>
        
    )
  }
}

export default AddUser;
