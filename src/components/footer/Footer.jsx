import React, { useState } from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import logo from "./wazibiz-low-resolution-logo-white-on-transparent-background.png";
import { FiExternalLink } from 'react-icons/fi';
import { FaTwitter, FaLinkedin,FaFacebook ,FaInstagram,FaGooglePlay} from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/slice/productSlice";



const Footer = () => {
  const [hoverd, setHovered] = useState(-1);
  const products = useSelector(selectProducts);
  const allCategories = [...new Set(products.map((product) => product.category))];

  return (
    <footer className='footer'>
      <div className='top'>
        <div className='company'>
          <Link to="/" ><img src={logo} alt="logo" className="logo"/></Link>
          <p className='slogan'>Shop Smart, shop WaziBiz</p>
          <Link className='source-code' to="/">
            <FaGooglePlay size={20} />&nbsp;
            download the free  App
          </Link>
        </div>

        <div className='developer'>
          <h5>Join Us on</h5>
          <a href="/" rel="noreferrer" target='_blank'>
            <FaFacebook size={20} style={{ paddingRight: "5px" }} /> {" "} Facebook
          </a>
          <a href='/'>
            <FaInstagram  size={20} style={{ paddingRight: "5px" }} /> {" "} Instagram
          </a>
          <a href='https://twitter.com/k_boazo' rel="noreferrer" target='_blank'>
            <FaTwitter size={20} style={{ paddingRight: "5px" }} /> {" "} Twitter
          </a>
          <a href='https://www.linkedin.com/in/kiptanui-boaz-466154217/' rel="noreferrer" target='_blank'>
            <FaLinkedin size={20} style={{ paddingRight: "5px" }} /> {" "} LinkedIn
          </a>
        </div>

        <div className='privacy'>
          <h5>About WaziBiz</h5>
          <a href='/'>Terms and Conditions</a>
          <a href='/'>Cookies Notice  &nbsp;<FiExternalLink /></a>
          <a href='/'>WizBiz Express &nbsp;  <FiExternalLink /></a>
          <Link to="/about">Privacy Noticet</Link>
          <Link to="blog/write">Contact Us</Link>

        </div>

        <div className='categories'>
          <h5>Top Sales</h5>
          {allCategories?.map((cat, i) =>
            <p onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(-1)} key={cat}>
              <Link to={cat} >
                {cat} {hoverd === i && <HiTrendingUp />}
              </Link>
            </p>)}
        </div >

      </div>
      <div className='bottom'>
        <p>Copyright &copy; {new Date().getFullYear()} <b>All Rights Reserved</b>{" "}</p>
      </div>

    </footer>
  )
};

export default Footer;