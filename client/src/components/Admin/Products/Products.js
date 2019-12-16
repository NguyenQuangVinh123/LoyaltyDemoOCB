import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {  Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios'
import Header from '../Header/Header.component'
import Sidebar from '../SideBar/Sidebar';
import EditProduct from '../EditProduct/EditProduct'
import configs from '../../../config/config';
import moment from 'moment'
class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            productDetails : [],
            openModal  : false,
            selectedValue : null
        }
        this.deleteProduct = this.deleteProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.closeModals = this.closeModals.bind(this);
        this.refreshPage = this.refreshPage.bind(this);

    }
    componentDidMount(){
        this.refreshPage()
    }
    refreshPage(){
      axios.get(`${configs.serverUrl}/api/products`)
      .then(response =>{
           this.setState({productDetails : response.data.data})
      })
    }
    deleteProduct(id){
      axios.post(`${configs.serverUrl}/api/product/delete`,{
        "id_product" : id
      }).then(
        this.refreshPage()
      )
    }
    editProduct(selectedValue){
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
    // const userList = usersData.filter((user) => user.id < 10)
    const {productDetails} = this.state;
  

    const products = productDetails.map((value, key) => {
      var dateto;
      var formatdateTo;
      var datefrom;
      var formatdateFrom;
      if(value.dateto === null){
        var aTo = new Date();
        formatdateTo = moment(aTo).format('DD/MM/YYYY')
        
      }else{
        dateto = new Date(parseInt(value.dateto));
        formatdateTo = moment(dateto).format('DD/MM/YYYY')
      }
      if(value.datefrom === null){
        var bTo = new Date();
        formatdateFrom = moment(bTo).format('DD/MM/YYYY')

      }else{
        datefrom = new Date(parseInt(value.datefrom));
        formatdateFrom = moment(datefrom).format('DD/MM/YYYY')
      }
      
      
        
        return(
            <tr key={key}>

            <td><strong>{value.id_product}</strong></td>
            <td><strong>{value.name_product}</strong></td>
            <td><strong>{value.point_needed_product}</strong></td>
            <td><strong>{value.hot_inweek_product}</strong></td>
            <td><strong>{value.remaining_amount_product}</strong></td>
            <td><strong>{formatdateTo }</strong></td>
            <td><strong>{ formatdateFrom}</strong></td>
            <td><strong>{value.description}</strong></td>
            <td><img alt='' src={value.image} height='50px' width='50px'/></td>
            <td><button onClick={() => this.editProduct(value)}>Sửa</button></td>
            <td><button onClick={() => this.deleteProduct(value.id_product)}>Xoá</button></td>

          </tr>
        )
          
        
        
    })
   
    return (
    <div>
        {
            this.state.openModal  ? <EditProduct refreshPage={this.refreshPage}  closeModal = {this.closeModals}  {...this.state.selectedValue} /> : null
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
                 Thông tin sản phẩm
              </CardHeader>
              <div><Link to='/product/addproduct'>Thêm mới sản phẩm</Link></div>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col">Điểm cần đổi</th>
                      <th scope="col">Sản phẩm hot trong tuần</th>
                      <th scope="col">Số lượng sản phẩm còn lại</th>
                      <th scope="col">Từ ngày</th>
                      <th scope="col">Đến ngày</th>
                      <th scope="col">Nội dung</th>
                      <th scope="col">Hình ảnh sản phẩm</th>
                      <th scope="col">Công cụ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products}
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

export default Product;
