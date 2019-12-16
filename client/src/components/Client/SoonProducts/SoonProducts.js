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
            
           
        }
    }
   
    render(){
        const {listArray} = this.props;
        var indexd = null

        return(
                
            listArray && listArray.map((e,i) => {
                        var opatity = true;

                        if(indexd === null &&  i === 4){
                            indexd = 5;
                            opatity = false
                          }else if(indexd !== null && i === indexd + 3){
                            indexd = indexd + 4;
                            opatity = false
                          }
                        return <div style={{opacity: opatity ? 1 : 0.5}} key={e.id_product} onClick = {()=>this.props.showDetail(e)} className="swiper-slide">
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
                    }
                        
                        
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
