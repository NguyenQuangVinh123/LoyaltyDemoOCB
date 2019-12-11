import React from "react";
import { connect } from "react-redux";
import { getHotProduct } from "../../../store/actions/appilcationActions";
import "swiper/css/swiper.css";
import configs from "../../../config/config";

class HotProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listArray: this.props.listArray,
    };
  
  }
 

  render() {
    var arr = [];
    var indexd = null
    this.props.listArray && this.props.listArray.map(value => {
      if (value.hot_inweek_product === "1") {
        arr.push(value);
      }
    });
    return (
      
        arr && arr.map((e,i) =>{
          var test = true;
        
          if(indexd === null &&  i === 4){
            indexd = 5;
            test = false
          }else if(indexd !== null && i === indexd + 3){
            indexd = indexd + 4;
            test = false
          }

          return <div
          style={{opacity: test ? 1 : 0.5}}
          
          key={e.id_product}
          onClick = {()=>this.props.showDetail(e)}
          className="swiper-slide"
        >
          <div className="swiper-slide-container">
            <div className="swiper-slide-container-item">
              <img alt=''
                id="show-details-items"
                className="swiper-slide-container-image"
                src={configs.serverUrl + "/" + e.image}
                width="200px"
                height="100px"
              />
              <div className="swiper-slide-container-item-name">
                <p>{e.name_product}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <img alt=''
                    style={{ marginRight: "5px" }}
                    src={require("../../../assets/img/icon.png")}
                    width="20px"
                    height="20px"
                  />
                  <p>{e.point_needed_product}</p>
                </div>
              </div>
            </div>
          </div>
        </div>;
      
          
          
        }

          
         
    
        )
    )}
}

export default connect(state => ({}), {
  getHotProduct
})(HotProducts);
