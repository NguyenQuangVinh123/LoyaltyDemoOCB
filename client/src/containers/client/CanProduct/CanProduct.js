import React from 'react';
import 'swiper/css/swiper.css';
import {connect} from 'react-redux'
import Swiper from 'react-id-swiper';
import Modal from "react-modal";

import CanProducts from '../../../components/Client/CanProducts/CanProducts';
import { getCustomerData } from '../../../store/reducers/applicationReducer';
import NotEnoughCondition from '../../../components/Client/NotEnoughCondition/NotEnoughCondition';
import DetailItems from '../../../components/Client/DetailItems/DetailItems';

const customStyles = {
    content : {
      top                   : '15%',
      left                  : '30%',
      right                 : '30%',
      bottom                : 'auto',
      border                : '1px solid orange',
      backgroundColor       : 'white',
      overflow              : 'none'
    },
    overlay: {zIndex: 1000}
  };
const params = {
    speed: 400,
    watchSlidesVisibility: true,
    simulateTouch: false,

  
    breakpoints: {
      350:{
        slidesPerView: 2.5,
        slidesPerGroup : 2,
        spaceBetween: 10,
        simulateTouch: true,
        
      },
      768:{
        slidesPerView: 3.5,
        spaceBetween: 20,
        slidesPerGroup : 3,
      },
      1024:{
        slidesPerView: 4.5,
        spaceBetween: 20,
        slidesPerGroup : 4,
      }
      
    },
   
}
class CanProduct extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            swiper : null,
            updateSwiper : null,
            count : 1,
            checkCondition : true,
            showDetailsItem : null

        }
        this.goNext = this.goNext.bind(this)
        this.goPrev = this.goPrev.bind(this)
        this.onCheckFail = this.onCheckFail.bind(this)
        this.refreshPage = this.refreshPage.bind(this)
        this.showDetail = this.showDetail.bind(this)
        this.closeModal = this.closeModal.bind(this)

    }
        // const [isBeginning,setisBeginning] = useState(false)
        goNext(){
            if (this.state.swiper !== null) {
                this.state.swiper.slideNext();
                document.getElementsByClassName("swiper-slide-active")[1].style.opacity = '1'
                if(this.state.count < Math.round(this.props.listArray.length / 4) ){
                    this.setState({
                      count : this.state.count + 1
                    })
                  }  
              
            }
      

        }

        showDetail(showDetailsItem) {
            this.setState({
                showDetailsItem 
            })
          }
          closeModal = () =>{
            this.setState({
                showDetailsItem : null
            })
          }

       componentDidMount(){
           console.log('Can Product')
            this.refreshPage()
       }
       refreshPage(){
        if(this.props.customerData){
            setTimeout(() => {
                this.state.swiper.update();
            },1000);
           }
       }
       onCheckFail(){
           this.setState({
               checkCondition : false
           })
           console.log('11111')
           this.refreshPage()
       }
        
        goPrev() {
            if (this.state.swiper !== null) {
                if(this.state.count > 1){
                    document.getElementsByClassName("swiper-slide-active")[1].style.opacity = '0.5'
                    this.state.swiper.slidePrev();

                    this.setState({
                      count : this.state.count -1
                    })
                  }
               
              }
            
          }
        //   function changeisBegin(){
        //     setisBeginning(...isBeginning,isBeginning : true)
        //   }
        //   const progress = () => {
        //     if (!swiper) return;
        //     if (swiper.isEnd) {
                
        //     } else if (swiper.isBeginning) {
        //         changeisBegin()

                
        //     } else {
        //         isBeginning(false)
        //     }
        // }
        render(){
            // const {updateSwiper} = this.state;
            const {count,checkCondition,showDetailsItem} = this.state
            let totalPage = Math.round(this.props.listArray.length / 4)
            if(this.props.listArray.length > 5 && this.props.listArray.length< 10){
                totalPage = totalPage + 1
              }
            return (
                
                <div className="content-hot-items">
                   <div className="content-can-items-header">
                        <hr className="content-can-items-header-hr" />
                        <p className='content-can-items-header-title' >QUÀ CÓ THỂ ĐỔI</p>
                    </div>
                   
                <div className="content-hot-items-item">
                    {
                        this.props.customerData && checkCondition  === true ?  
                        <div>
                                                <div className="number-pagination">
                                                    <span className="number-pagination-left"  >{count}/{totalPage}</span>
                                                </div>
                                            
                                                <div className="number-pagination-spacing-left">
                                                    <div  className='swiper-button-prev' tabIndex="0"  onClick={this.goPrev}></div>
                                                    <div  className='swiper-button-next' tabIndex="0"  onClick={this.goNext}></div>
                                                </div>
                                            
                                                
                                                <div className="swiper-container swiper2">
                                                    <div className="swiper-wrapper" id="swiper-wrapper2">
                                                        <Swiper  {...params}  getSwiper={swiper => this.setState ({swiper}) }>

                                                            <CanProducts showDetail= {this.showDetail}  onCheckFail = {this.onCheckFail} refreshPage = {this.refreshPage} checkCondition = {checkCondition} listArray = {this.props.listArray} />
                                                    
                                                
                                                        </Swiper>
                                                        {
                                                            showDetailsItem ?   
                                                                <Modal
                                                                isOpen ={true}
                                                                onRequestClose={this.closeModal}
                                                                style = {customStyles}
                                                                contentLabel="Example Modal"
                                                                >
                                                                <DetailItems showDetailsItem={showDetailsItem}  closeModal = {this.closeModal}/>
                                                                
                                                                </Modal>
                                                                : null
                                                            
                                                        }
                                                    </div>  
                                                </div>
                        </div>
                    : <NotEnoughCondition />
                    }
                    
                </div>
               
              </div>
            );
        }
        
    }

    export default connect(
        state =>({
            customerData : getCustomerData(state),
        }),{
            
        }
    )(CanProduct);
