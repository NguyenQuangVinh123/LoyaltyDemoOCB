import React from "react";
import LoginLayout from "../../../../containers/client/Login/LoginLayout";
import  {Link} from 'react-router-dom';
const HeaderNav = () => (
  <div className="header-nav ">
    <nav className="navbar navbar-expand-lg navbar-light ">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-shortname">
            <p>Xin chào Dương</p>
          </li>


          <li className="nav-item">
           
            <Link className="nav-link" to='/'>
              Trang chủ
            </Link>

          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/about'>
              Liên hệ
            </Link>

          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/term'>
              Điều khoản
            </Link>
         
          </li>
          <li
            className="nav-item"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "20px"
            }}
          >
            <LoginLayout />
          </li>
        </ul>
      </div>
    </nav>
  </div>
);
export default HeaderNav;
