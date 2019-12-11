import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {  Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios'
import Header from '../Header/Header.component'
import Sidebar from '../SideBar/Sidebar';
import EditUser from '../EditUser/EditUser'
class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            userDetails : [],
            openModal  : false,
            selectedValue : null
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.closeModals = this.closeModals.bind(this);
        this.refreshPage = this.refreshPage.bind(this);

    }
    componentDidMount(){
      this.refreshPage()
    }
    refreshPage() {
      axios.get('/api/users')
      .then(response =>{
           this.setState({userDetails : response.data.data})
      })
    }
    deleteUser(id){
      window.confirm('Bạn có thực sự muốn xoá tài khoản này ?')
      axios.post('/api/users/delete',{
        "id_user" : id
      }).then(
        this.refreshPage()
      )
    }
    editUser(selectedValue){
        this.setState({
          openModal : true,
          selectedValue
        })

    }
    closeModals(){
      this.setState({
        openModal : false
      })
    }
  render() {
    const {userDetails} = this.state;
    const users = userDetails.map((value, key) => {
        return(
            <tr key={key}>

            <td><strong>{value.id_user}</strong></td>
            <td><strong>{value.name}</strong></td>

            <td><strong>{value.email}</strong></td>
            <td><strong>{value.sdt}</strong></td>
            <td><strong>{value.role === '0' ? 'Super Admin' : 'Admin'}</strong></td>
            <td><strong>{value.status === "1" ? 'Kích hoạt' : 'Không kích hoạt'}</strong></td>
            <td><button onClick={() => this.editUser(value)}>Sửa</button></td>
            <td><button onClick={() => this.deleteUser(value.id_user)}>Xoá</button></td>

          </tr>
        )
          
        
        
    })
   
    return (
    <div>
        {
            this.state.openModal  ? <EditUser closeModal = {this.closeModals} refreshPage ={this.refreshPage}  {...this.state.selectedValue} /> : null
        }
        <header className='app-header navbar'>
            <Header />
        </header>
          <div className='app-body'>
            <Sidebar />
            <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                 Thông tin tài khoản
              </CardHeader>
              <div><Link to='/user/adduser'>Thêm mới tài khoản</Link></div>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Tên tài khoản</th>
                      <th scope="col">Email</th>
                      <th scope="col">Số điện thoại</th>
                      <th scope="col">Loại tài khoản</th>
                      <th scope="col">Tình trạng</th>
                      <th scope="col">Công cụ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
          </div>
      
        </div>
        
    )
  }
}

export default User;
