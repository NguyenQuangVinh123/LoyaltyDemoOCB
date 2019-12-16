import React from 'react'
import {connect} from 'react-redux'
import configs from "../../../config/config";
import { transaction} from '../../../store/actions/appilcationActions';
import { getCustomerData } from '../../../store/reducers/applicationReducer';
import moment from 'moment'

class DetailItems extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            image : this.props.showDetailsItem.image,
            name_product :  this.props.showDetailsItem.name_product,
            point_needed_product : this.props.showDetailsItem.point_needed_product,
            id_product : this.props.showDetailsItem.id_product,
            id_customer : null,
            dateto: this.props.showDetailsItem.dateto === null ? moment(new Date()).format('DD/MM/YYYY') : moment(new Date(parseInt(this.props.dateto))).format('DD/MM/YYYY'),
            datefrom : this.props.showDetailsItem.datefrom === null ? moment(new Date()).format('DD/MM/YYYY') : moment(new Date(parseInt(this.props.datefrom))).format('DD/MM/YYYY'),
            description  : this.props.showDetailsItem.description,
            
        }
        this.exchangeItem = this.exchangeItem.bind(this)
        this.close = this.close.bind(this)

    }
    exchangeItem(){
        this.setState({
            id_customer : this.props.customerData.id_customer
        }, () => {
            this.props.transaction && this.props.transaction({
                id_product: this.state.id_product,
                id_customer: this.state.id_customer,
                total_point : this.state.point_needed_product,
                onSuccess : (response) =>{
                    if(response.status === 200){
                        alert('Bạn đã đổi điểm thành công')
                        this.props.closeModal()
                    }
                }
            })
        })
        
    }
    close(){
        this.props.closeModal()
    }
    render(){
        const {image,name_product,point_needed_product,dateto,datefrom,description} = this.state
        return(
        <div>
            <div className="details-item-container" style={{width: "90%",margin: "0 auto"}}>
              <div className="details-item-container-header">
                    <div className="row col-lg-12 col-sm-12 mobile-details-item">
                        <div className="col-lg-4 col-sm-12 mobile-details" >
                          <img alt='' src={configs.serverUrl+"/"+image} height="120px" width="200px" />
                        </div>
                        <div className="col-lg-8 col-sm-12">
                          <div className="details-item-info" style={{paddingLeft: "25px"}}>
                              <p className="details-item-info-nameitem">{name_product}</p>
                              <p className="details-item-info-datevalidate">Hiệu lực từ ngày {dateto} đến {datefrom}</p>
                              <p className="details-item-info-point" >{point_needed_product} <span style={{color: "black"}}>điểm để đổi voucher</span></p>
                              {
                                   this.props.customerData && this.props.customerData ?
                                   <button onClick={this.exchangeItem} className="btn btn-details-item-mobile" style={{float: "right",backgroundColor: "#e29717",fontWeight: "bold",color: "white",padding: "5px 35px"}}>ĐỔI QUÀ</button>
                                    : <p className="login-check">Vui lòng <span style={{fontWeight: "bold"}}>đăng nhập</span> để có thể đổi quà.</p>
                              }
                              
                            </div>
                        </div>
                    </div>
                  
              </div>
              <hr  />
              <div className="details-item-container-content" style={{fontFamily: 'Open Sans, sans-serif !important'}}>
                  {description}
              </div>
                 
            </div>
            <div onClick={this.close} className="details-items-modal-close" >
                X
            </div>
        </div>
        )
    }
}

export default connect(
    state  => ({
        customerData : getCustomerData(state),
    }),{
        transaction
    }
)(DetailItems)