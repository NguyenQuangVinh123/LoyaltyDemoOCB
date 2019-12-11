import React from "react";

const SlideContain = () => (
  <div className="slide-contain">
    <div className="slide-contain-ocb">
      <p>
        OCB<span style={{ paddingLeft: "15px", color: "#e29717" }}>OMNI</span>
      </p>
    </div>
    <div className="slide-contain-suppiles" style={{ display: "flex" }}>
      <p>Tốc độ</p>
      <ol style={{ paddingLeft: "10px", paddingRight: "10px" }}>
        <li className="slide-contain-suppiles-li"></li>
      </ol>
      <p>An toàn</p>
      <ol style={{ paddingLeft: "10px", paddingRight: "10px" }}>
        <li className="slide-contain-suppiles-li"></li>
      </ol>
      <p>Tiện nghi</p>
    </div>
    <div className="slide-contain-free">
      <p>Giao dịch online, hoàn toàn miễn phí</p>
    </div>
  </div>
);
export default SlideContain;
