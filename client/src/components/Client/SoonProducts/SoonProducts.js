import React from 'react'
import {connect} from 'react-redux';
import { getHotProduct} from '../../../store/actions/appilcationActions';
import 'swiper/css/swiper.css'
import { getCustomerData } from '../../../store/reducers/applicationReducer';

import configs from '../../../config/config'

class SoonProducts extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            arr : []
           
        }
    }
    componentDidMount(){
            var arr = []
            var point_soon_product = parseInt(this.props.customerData.point_customer) * 80/100; 
            this.props.listArray.map(value =>{
                if(this.props.customerData){


                    if((parseInt(value.point_needed_product) > parseInt(this.props.customerData.point_customer))&&(point_soon_product <= parseInt(this.props.customerData.point_customer) )){
                        arr.push(value)
                     }else{
                         console.log('aaa')
                     }
                }else{
                    console.log('Khong them')
                }
             })
             this.setState({
                arr : arr
             })
             console.log(arr.length)
             if(arr.length === 0 || ''){
                 console.log('vo')
                 this.props.onCheckFail && this.props.onCheckFail()
             }else{
                this.props.refreshPage && this.props.refreshPage()
    
             }
    }
    render(){
        const {arr} = this.state;
        return(
                
                    arr && arr.map((e) => (
                        <div key={e.id_product} className="swiper-slide">
                            <div className="swiper-slide-container">
                                <div className="swiper-slide-container-item">
                                    <img alt='' id="show-details-items" className="swiper-slide-container-image" src={configs.serverUrl+ "/" +e.image} width="200px"  height="100px"/>
                                    <div className="swiper-slide-container-item-name" >
                                        <p>{e.name_product}</p>
                                        <div style={{display: "flex",justifyContent: "space-between"}}>
                                            <img  alt='' style={{marginRight: "5px"}} src={require('../../../assets/img/icon.png')} width="20px" height="20px" />
                                            <p>{e.point_needed_product}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    )
            
        )
    }
}

export default connect(
    state =>({
        customerData : getCustomerData(state),

    }),{
        getHotProduct
    }
)(SoonProducts);
