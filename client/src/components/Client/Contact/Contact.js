import React from "react";
function Contact() {
  return (
    <div>
      <div className="filter">
        <div className="contain-filter">
          <div className="contact-header">
            <p style={{fontSize: "18pt",fontWeight: "600",color:"#008c44",marginBottom: "0"}}>
              LIÊN HỆ
            </p>
          </div>
        </div>
      </div>
      <div className="contact-modal">
        <div className="contact-modal-container">
          <div className="contact-modal-header">
            <p>Liên hệ với chúng tôi qua email</p>
          </div>
          <div className="contact-modal-header-text">
            <p>
              Hãy cho chúng tôi biết bạn đang mong muốn thực hiện dự án nào.
              Chúng tôi sẽ liên hệ với bạn sớm nhất có thể
            </p>
            <form style={{ width: "80%", margin: "0 auto" }}>
              <div className="form-group row">
                <div className="col-lg-6 col-sm-12" style={{ padding: "0" }}>
                  <div
                    className="col-lg-12 input-name-mobile"
                    style={{ paddingLeft: "0" }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tên của bạn"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12" style={{ padding: "0" }}>
                  <div
                    className="col-lg-12 input-email-mobile"
                    style={{ paddingRight: "0" }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email của bạn"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-lg-12" style={{ padding: "0" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Chức danh của bạn"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-12" style={{ padding: "0" }}>
                  <textarea
                    placeholder="Ghi chú của bạn"
                    className="form-control"
                    rows="5"
                  ></textarea>
                </div>
              </div>
              <div className="btn-send-mess">
                <button type="submit" className="btn btn-login">
                  GỬI TIN NHẮN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
