import React from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import configs from '../../../config/config';
import moment from 'moment';
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width : '50%',
    height : '70%'
  }
};
Modal.setAppElement('#root')
var subtitle
class EditProduct extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showChangeImage : false,
            name_product : this.props.name_product,
            point_needed_product : this.props.point_needed_product,
            hot_inweek_product : this.props.hot_inweek_product ,
            image: this.props.image,
            remaining_amount_product : this.props.remaining_amount_product,
            status : this.props.status,
            images : null,
            dateto : this.props.dateto === null ? new Date() : new Date(parseInt(this.props.dateto)),
            datefrom :  this.props.datefrom === null ? new Date() : new Date(parseInt(this.props.datefrom)),
            description : this.props.description

        }
        this.afterOpenModal = this.afterOpenModal.bind(this)
        this.changeHandelImage = this.changeHandelImage.bind(this)
        this.editProduct = this.editProduct.bind(this)
        this.onChangeHandle = this.onChangeHandle.bind(this)
        this.handleChangeDateTo = this.handleChangeDateTo.bind(this)
        this.handleChangeDateForm = this.handleChangeDateForm.bind(this)

        
    }
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }
    // Thay hinh anh
    changeHandelImage = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          this.setState({images : event.target.files[0]})
          reader.onload = (e) => {
            this.setState({image: e.target.result});
            
          };
          this.setState({
            showChangeImage : true,
            image : event.target.files[0]
          })

          reader.readAsDataURL(event.target.files[0]);
        }
       
     
      
    }

      editProduct(e){
        e.preventDefault();
         
        const formData = new FormData();
        formData.append('name_product', this.state.name_product );
        formData.append('id_product',this.props.id_product);
        formData.append('point_needed_product',   this.state.point_needed_product);
        formData.append('hot_inweek_product', this.state.hot_inweek_product);
        formData.append('dateto', this.state.dateto);
        formData.append('datefrom', this.state.datefrom);
        formData.append('description', this.state.description);
        if(this.state.images === null){
            formData.append('changeImage', false )
        }else{
            formData.append('changeImage', true )
            formData.append('image', this.state.images )
        }
        formData.append('status',  this.state.status);

        formData.append('remaining_amount_product',   this.state.remaining_amount_product);
        const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
        };
        axios.post(`${configs.serverUrl}/api/product/update`,formData,config)
        .then(response =>{
            
          alert('Ban da sua san pham thanh cong')
          this.props.refreshPage()
          this.props.closeModal();
          
        })
      }
    onChangeHandle({name_product = this.state.name_product,point_needed_product = this.state.point_needed_product,status = this.state.status,
        hot_inweek_product = this.state.hot_inweek_product ,remaining_amount_product = this.state.remaining_amount_product,description = this.state.description,
        image = this.state.image}){
        this.setState({
            name_product,point_needed_product,hot_inweek_product,remaining_amount_product,status,image,description
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
    render(){
        // var a = this.state.dateTo&&this.state.dateTo
        // var b = a&&a.toString().slice(-30,12)
        // console.log(a)
        // console.log(b)
        console.log(this.state.dateto)
        return(
            <div>
            <Modal
              isOpen={true}
              onAfterOpen={this.state.afterOpenModal}
              onRequestClose={this.props.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
                <div className='col-lg-12 row'>
                    <div className='col-lg-4'>
                        <span style={{fontWeight:'bold',fontSize:'15px'}}>Tên sản phẩm:</span>
                    </div>
                    <div className='col-lg-8'>
                        <input value={this.state.name_product} onChange={(e) => this.onChangeHandle({name_product:e.target.value})} />
                        
                    </div>
                </div>
                <div className='col-lg-12 row' style={{marginTop:'20px'}}>
                    <div className='col-lg-4'>
                        <span style={{fontWeight:'bold',fontSize:'15px'}}>Điểm cần để đổi 1 sản phẩm:</span>
                    </div>
                    <div className='col-lg-8'>
                    <input type='number' value={this.state.point_needed_product} onChange={(e) => this.onChangeHandle({point_needed_product:e.target.value})} />
                    </div>
                </div>
                <div className='col-lg-12 row' style={{marginTop:'20px'}}>
                    <div className='col-lg-4'>
                        <span style={{fontWeight:'bold',fontSize:'15px'}}>Ngày bắt đầu có hiệu lực:</span>
                    </div>
                    <div className='col-lg-8'>
                        <DatePicker selected={this.state.dateto} dateFormat="dd/MM/yyyy" onChange={this.handleChangeDateTo} />
                    </div>
                </div>

                <div className='col-lg-12 row' style={{marginTop:'20px'}}>
                    <div className='col-lg-4'>
                        <span style={{fontWeight:'bold',fontSize:'15px'}}>Ngày kết thúc hiệu lực:</span>
                    </div>
                    <div className='col-lg-8'>
                        <DatePicker selected={this.state.datefrom} dateFormat="dd/MM/yyyy" onChange={this.handleChangeDateForm} />
                    </div>
                </div>
                <div className='col-lg-12 row' style={{marginTop:'20px'}}>
                    <div className='col-lg-4'>
                        <span style={{fontWeight:'bold',fontSize:'15px'}}>Mô tả : </span>
                    </div>
                    <div className='col-lg-8'>
                        <textarea cols='7' rows="6" onChange={(e) => this.onChangeHandle({description:e.target.value})} >{this.state.description}</textarea>
                    </div>
                </div>


                <div className='col-lg-12 row' style={{marginTop:'20px'}}>
                    <div className='col-lg-4'>
                        <span style={{fontWeight:'bold',fontSize:'15px'}}>Sản phẩm còn lại</span>
                    </div>
                    <div className='col-lg-8'>
                        <input type='number' value={this.state.remaining_amount_product} onChange={(e) => this.onChangeHandle({remaining_amount_product:e.target.value})}  />
                    </div>
                </div>
                <div className='col-lg-12 row' style={{marginTop:'20px'}}>
                    <div className='col-lg-4'>
                        <span style={{fontWeight:'bold',fontSize:'15px'}}>Sản phẩm hot trong tuần</span>
                    </div>
                    <div className='col-lg-8'>
                        <select defaultValue={this.state.hot_inweek_product} onChange={(e) => this.onChangeHandle({hot_inweek_product:e.target.value})}>
                            <option key='1' value='1'>Yes</option>
                            <option key='0' value='0'>No</option>    
                        </select>
                    </div>
                </div>
                <div className='col-lg-12 row' style={{marginTop:'20px'}}>
                    <div className='col-lg-4'>
                        <span style={{fontWeight:'bold',fontSize:'15px'}}>Hiện sản phẩm</span>
                    </div>
                    <div className='col-lg-8'>
                        <select defaultValue={this.state.status} onChange={(e) => this.onChangeHandle({status:e.target.value})}>
                            <option key='1' value='1'>Có</option>
                            <option key='0' value='0'>Không</option>    
                        </select>
                    </div>
                </div>
                <div className='col-lg-12 row' style={{marginTop:'20px'}}>
                    <div className='col-lg-4'>
                        <span style={{fontWeight:'bold',fontSize:'15px'}}>Hình ảnh sản phẩm</span>
                    </div>
                    <div className='col-lg-8' >
                        <label htmlFor="file-input" style={{cursor : 'pointer'}}>
                        
                            <img alt='' width='70px' height='70px' src={this.state.image}  style={{pointerEvents:'none'}} />
                           
                        </label>
                        <input type='file' onChange={this.changeHandelImage} id ='file-input' style={{visibility: 'none',width:'0',height:'0'}}/>
                    </div>
                </div>
                
                <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
                    <button style={{marginRight:'20px'}} onClick={this.editProduct}>Update</button>

                    <button style={{marginRight:'20px'}} onClick={this.props.closeModal}>Close</button>
                </div>
               

            </Modal>
          </div>
        )
    }
}

export default EditProduct