import React, { Component } from 'react';
import {  Card, CardHeader, Col, Row } from 'reactstrap';
import axios from 'axios'
import Header from '../Header/Header.component'
import Sidebar from '../SideBar/Sidebar';
import configs from '../../../config/config';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class AddProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            name_product : '',
            point_needed_product : '',
            hot_inweek_product : 1,
            image: null,
            remaining_amount_product : '',
            dateto : new Date(),
            datefrom : new Date(),
            description : ''
        };
        this.changeHandel = this.changeHandel.bind(this);
        this.handleChangeDateTo = this.handleChangeDateTo.bind(this)
        this.handleChangeDateForm = this.handleChangeDateForm.bind(this)
    }
    componentDidMount(){
      
    }
    addProduct(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('name_product',this.state.name_product);
        formData.append('point_needed_product',this.state.point_needed_product);
        formData.append('hot_inweek_product',this.state.hot_inweek_product);
        formData.append('image',this.state.image);
        formData.append('remaining_amount_product',this.state.remaining_amount_product);
        formData.append('dateto', this.state.dateto);
        formData.append('datefrom', this.state.datefrom);
        formData.append('description', this.state.description);
        const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
        };
        axios.post(`${configs.serverUrl}/api/product/add`,formData,config)
        .then(response =>{
          alert('Bạn đã thêm sản phẩm thành công')
          this.props.history && this.props.history.push('/product')
        })
    }
    handleChangeDateTo = date => {
      this.setState({
        dateto: Date.parse(date)
      });
    };
    handleChangeDateForm = date => {
      this.setState({
        datefrom: Date.parse(date)
      });
    };
    changeHandel({name_product = this.state.name_product,point_needed_product = this.state.point_needed_product,
        hot_inweek_product = this.state.hot_inweek_product ,image = this.state.image,remaining_amount_product = this.state.remaining_amount_product,description = this.state.description}){
        this.setState({
            name_product,point_needed_product,hot_inweek_product,image,remaining_amount_product,description
        })
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
                 Thêm sản phẩm
              </CardHeader>
            
                <label style={{marginTop:'20px',fontWeight:'bold',fontSize:'15px'}}>Tên sản phẩm :</label>
                <input type='text' onChange={(e) => this.changeHandel({name_product:e.target.value})} value={this.state.name_product} placeholder='Tên sản phẩm' />
                <label  style={{marginTop:'20px',fontWeight:'bold',fontSize:'15px'}}>Số điểm cần đổi :</label>
                <input type='number' onChange={(e) => this.changeHandel({point_needed_product:e.target.value})} value={this.state.point_needed_product}  placeholder='Số điểm cần đổi' />
                <label  style={{marginTop:'20px',fontWeight:'bold',fontSize:'15px'}}>Số lượng sản phẩm :</label>
                <input type='number' onChange={(e) => this.changeHandel({remaining_amount_product:e.target.value})} value={this.state.remaining_amount_product} placeholder='Số lượng sản phẩm' />
                <label  style={{marginTop:'20px',fontWeight:'bold',fontSize:'15px'}}>Thời gian bắt đầu hiệu lực:</label>
                <DatePicker selected={this.state.dateto} dateFormat="dd/MM/yyyy" onChange={this.handleChangeDateTo} />
                <label  style={{marginTop:'20px',fontWeight:'bold',fontSize:'15px'}}>Thời gian kết thúc hiệu lực:</label>

                <DatePicker selected={this.state.datefrom} dateFormat="dd/MM/yyyy" onChange={this.handleChangeDateForm} />
                <label  style={{marginTop:'20px',fontWeight:'bold',fontSize:'15px'}}>Nội dung sản phẩm:</label>

                <textarea cols="20" rows="30" onChange={(e) => this.changeHandel({description:e.target.value})} >{this.state.description}</textarea>
                <label  style={{marginTop:'20px',fontWeight:'bold',fontSize:'15px'}}>Hình ảnh sản phẩm :</label>
                <input type='file' onChange={(e) => this.changeHandel({image:e.target.files[0]})}  />
                <label  style={{marginTop:'20px',fontWeight:'bold',fontSize:'15px'}}>Sản phẩm hot trong tuần:</label>
                <select style={{width:'15%'}} onChange={(e) => this.changeHandel({hot_inweek_product:e.target.value})}>
                    <option value='1' >Có</option>
                    <option value='0'>Không</option>    
    
                </select>               
                <div style={{display:'flex',justifyContent:'center',marginTop:'15px',marginBottom:'10px'}}>
                  <input className='btn-css3 p-1' style={{width:'50%'}} type='submit' onClick ={this.addProduct.bind(this)} />

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

export default AddProduct;
