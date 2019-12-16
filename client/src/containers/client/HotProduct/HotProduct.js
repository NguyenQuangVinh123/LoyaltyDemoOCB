import React from 'react';
import 'swiper/css/swiper.css';
import Modal from "react-modal";
import DetailHotItems from "../../../components/Client/DetailHotItems/DetailHotItems";
import Swiper from 'react-id-swiper';
import HotProducts from '../../../components/Client/HotProducts/HotProducts';
const itemsPerView = 4.5
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
        slidesPerView: itemsPerView,
        spaceBetween: 20,
        slidesPerGroup : 4,
      }
      
    }
   
}

class HotProduct extends React.Component{
  
    constructor(props){
        super(props)
        this.state = {
            swiper : null,
            updateSwiper : null,
            count : 1,
            test : 0 ,
            showDetailsItem : null,
            totalpage: null,
        }
        this.goNext = this.goNext.bind(this)
        this.goPrev = this.goPrev.bind(this)
        this.refresh = this.refresh.bind(this)
        this.showDetail = this.showDetail.bind(this)
        this.closeModal = this.closeModal.bind(this)
        
        
    }
        // const [isBeginning,setisBeginning] = useState(false)
        goNext(e){
           
            if (this.state.swiper !== null) {

              this.state.swiper.slideNext();
              
                document.getElementsByClassName("swiper-slide-active")[0].style.opacity = '1'
             
              if(this.state.count < Math.round(this.props.listArray.length / 4) && window.innerWidth >1000 ){
                this.setState({
                  count : this.state.count + 1
                })
              } else if(this.state.count < Math.round(this.props.listArray.length / 2)){
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
        // var test = $("#swiper-wrapper1 > .swiper-slide-visible").last();
        // test.addClass('highlight')
        this.refresh()
       
       }
       refresh(){
       
        setTimeout(() => {
            this.state.swiper.update();
        },1000);
       }
        goPrev() {

            if (this.state.swiper !== null) {

                if(this.state.count > 1){
                  document.getElementsByClassName("swiper-slide-active")[0].style.opacity = '0.5'

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
            const {count,showDetailsItem} = this.state
            let totalPage  = Math.round(this.props.listArray.length / 4) 
            if(window.innerWidth < 400){
              totalPage = Math.round(this.props.listArray.length / 2) 
            }
            if(this.props.listArray.length > 5 && this.props.listArray.length< 10){
              totalPage = totalPage + 1
            }


            console.log(totalPage)
            return (
                
                <div className="content-hot-items">
                    <div className="content-hot-items-header">
                    
                        <img alt='' height="40px" width="80px" src={require("../../../assets/img/hot.png")} />
                        <p className="content-hot-items-header-title" >QUÀ HOT TRONG TUẦN</p>
        
                    <hr className="content-hot-items-hr" />
                    </div>
                <div className="content-hot-items-item">
              
                        <div className="number-pagination" style={{textAlign: "right"}}>
                        <span className="number-pagination-right"  >{count}/{totalPage}</span>
                        </div>
                      
                        <div className="number-pagination-spacing">
                            <div  className='swiper-button-prev' tabIndex="0"  onClick={this.goPrev}></div>
                            <div  className='swiper-button-next' tabIndex="0"  onClick={this.goNext}></div>
                        </div>
                      
                        
                        <div className="swiper-container swiper1">
                            <div className="swiper-wrapper" id="swiper-wrapper1">
                            <Swiper  {...params}  getSwiper={swiper => this.setState ({swiper}) }>
                                <HotProducts  itemsPerView ={itemsPerView} showDetail= {this.showDetail} listArray = {this.props.listArray} />
                           </Swiper>
                           {
                               
                                showDetailsItem ?   
                                    <Modal
                                    isOpen ={true}
                                    onRequestClose={this.closeModal}
                                    style = {customStyles}
                                    contentLabel="Example Modal"
                                  >
                                    <DetailHotItems showDetailsItem={showDetailsItem}  closeModal = {this.closeModal}/>
                                    
                                  </Modal>
                                  : null
                                
                           }
                           </div>
                        </div>
                    
                </div>
               
              </div>
            );
        }
        
    }

export default HotProduct;