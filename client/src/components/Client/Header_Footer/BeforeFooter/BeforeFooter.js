import React from 'react'

const BeforeFooter = () => (
        <div className="info">
            <div className="info-content" style={{color: "white"}}>
                <fieldset className="info-content-fieldset" >
                  <legend className="w-auto" style={{textAlign: "center",paddingLeft: "5px",paddingRight: "5px",fontSize: "21pt",fontWeight: "600"}}>NGÂN HÀNG PHƯƠNG ĐÔNG</legend>
                  <p style={{fontSize: "14pt",fontWeight: "400", textAlign: "center",marginBottom: "5px"}}>Orient Commercial Joint Stock Bank (OCB) <br/> được thành lập từ ngày 10/06/1996, qua 23 năm <br /> hoạt động và phát triển,OCB luôn duy trì <br/> phương châm: khách  hàng là trọng tâm, nghiên <br/> cứu và phát triển những sản phẩm dịch vụ tài <br/>chính phù hợp.</p>
                </fieldset> 
              </div>
            <div className="info-background">
                <img className="w-100" src={require('../../../../assets/img/hand.jpeg')} alt='' />
            </div>
           
            <div className="connect" style={{backgroundColor: "#12c469"}}>
                <div style={{display: "flex",alignItems: "center",width: "95%",margin: "0 auto", padding: "10px" }}>
                  <img  src={require("../../../../assets/img/fa-twiiter.png")} alt='' width="20px" height="20px" style={{marginRight:"10px"}}/>
                  <p style={{fontWeight: "400",fontSize: "13pt",marginBottom: "0",color: "white",paddingLeft: "5px"}}>Kết nối với chúng tôi</p>
                </div>
            </div>
        </div>
)
export default BeforeFooter;