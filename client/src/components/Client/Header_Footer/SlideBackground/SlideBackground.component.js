import React from 'react'


const SildeBackground = () =>(
    <div id="slide-background" className="carousel slide" data-ride="carousel">                         
        <ol className="carousel-indicators">
            <li data-target="#slide-background" data-slide-to="0" className="active"></li>
            <li data-target="#slide-background" data-slide-to="1"></li>
            <li data-target="#slide-background" data-slide-to="2"></li>
            <li data-target="#slide-background" data-slide-to="3"></li>
        </ol>
        <div className="carousel-inner">
        <div className="carousel-item active">
            <img src={require("../../../../assets/img/background/bg1.jpeg")} className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
            <img src={require("../../../../assets/img/background/bg2.jpeg")} className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
            <img src={require("../../../../assets/img/background/bg3.jpeg")} className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
                <img src={require("../../../../assets/img/background/bg4.jpeg")} className="d-block w-100" alt="..." />
        </div>
    </div>
</div>
)

export default SildeBackground;