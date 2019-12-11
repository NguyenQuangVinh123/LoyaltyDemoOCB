import React from 'react'
import Modal from 'react-modal'
import axios from 'axios'
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
class EditUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showChangeImage : false,
            name : this.props.name,
            email : this.props.email,
            sdt : this.props.sdt ,
            role: this.props.role,
            password : this.props.password,
            status : this.props.status,
        }
        this.afterOpenModal = this.afterOpenModal.bind(this)
        this.editUser = this.editUser.bind(this)
        this.onChangeHandle = this.onChangeHandle.bind(this)
    }
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }
   
      editUser(e){
        e.preventDefault();
        axios.post('/api/users/update',{
            'name': this.state.name,
            'id_user': this.props.id_user,
            'email' :    this.state.email,
            'sdt' :    this.state.sdt,
            'role' :    this.state.role,
            'status' :    this.state.status,
        })
        .then(response =>{
            
          alert('Bạn đã sửa tài khoản thành công')
          this.props.refreshPage()
          this.props.closeModal()
        })
      }
    onChangeHandle({name = this.state.name,email = this.state.email,status = this.state.status,
        sdt = this.state.sdt ,role = this.state.role}){
        this.setState({
            name,email,sdt,role,status
        })
        
    }
   
    render(){
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
                        <span style={{fontWeight:'bold',fontSize:'15px'}}>Tên tài khoản:</span>
                    </div>
                    <div className='col-lg-8'>
                        <input value={this.state.name} onChange={(e) => this.onChangeHandle({name:e.target.value})} />
                        
                    </div>
                </div>
                <div className='col-lg-12 row' style={{marginTop:'20px'}}>
                    <div className='col-lg-4'>
                        <span style={{fontWeight:'bold',fontSize:'15px'}}>Email tài khoản:</span>
                    </div>
                    <div className='col-lg-8'>
                    <input type='email' value={this.state.email} onChange={(e) => this.onChangeHandle({email:e.target.value})} />
                    </div>
                </div>
                <div className='col-lg-12 row' style={{marginTop:'20px'}}> 
                    <div className='col-lg-4'>
                        <span style={{fontWeight:'bold',fontSize:'15px'}}>Số điện thoại:</span>
                    </div>
                    <div className='col-lg-8'>
                        <input type='number' value={this.state.sdt} onChange={(e) => this.onChangeHandle({sdt:e.target.value})}  />
                    </div>
                </div>
                <div className='col-lg-12 row' style={{marginTop:'20px'}}>
                    <div className='col-lg-4'>
                        <span style={{fontWeight:'bold',fontSize:'15px'}}>Hiện user</span>
                    </div>
                    <div className='col-lg-8'>
                        <select defaultValue={this.state.status} onChange={(e) => this.onChangeHandle({status:e.target.value})}>
                            <option key='1' value='1'>Yes</option>
                            <option key='0' value='0'>No</option>    
                        </select>
                    </div>
                </div>
                <div className='col-lg-12 row' style={{marginTop:'20px'}}>
                    <div className='col-lg-4'>
                        <span style={{fontWeight:'bold',fontSize:'15px'}}>Loại tài khoản</span>
                    </div>
                    <div className='col-lg-8'>
                        <select defaultValue={this.state.role} onChange={(e) => this.onChangeHandle({role:e.target.value})}>
                            <option key='0' value='0'>Super Admin</option>
                            <option key='1' value='1'>Admin</option>    
                        </select>
                    </div>
                </div>
                

                <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
                    <button style={{marginRight:'20px'}} onClick={this.editUser}>Update</button>

                    <button style={{marginLeft:'20px'}} onClick={this.props.closeModal}>Close</button>
                </div>
               

            </Modal>
          </div>
        )
    }
}

export default EditUser