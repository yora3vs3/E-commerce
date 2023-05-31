import React from 'react';
import styles from "./Header.module.scss";
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa"

const logo = (
  <div className={styles.logo} >
    <Link to="/">
      <h2>e<span>Shop</span></h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart
      <FaShoppingCart size={20} />
      <p>3</p>
    </Link>
  </span>
);

const Header = () => {
  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav>
          <ul><li><Link to="/">Home</Link></li> </ul>
          <ul><li><Link to="/contact">Contact Us</Link></li> </ul>
          
          <div className={styles["header-right"]}>
            <span className={styles.links}>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/history">Order-history</Link>
            </span>

            {cart}
          </div>
        </nav>

      </div>
    </header>
  )
}

export default Header