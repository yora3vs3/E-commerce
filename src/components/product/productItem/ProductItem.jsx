import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
} from "../../../redux/slice/cartSlice";
import Card from "../../card/Card";
import styles from "./ProductItem.module.scss";
import { Zoom } from "react-awesome-reveal";

const ProductItem = ({ product, grid, id, name, price, desc, imageURL }) => {
  const dispatch = useDispatch();
  const [showBtn, setShowBtn] = useState(false);
  const [brightness, setBrightness] = useState("brightness(100%)");
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <div style={{ "filter": brightness }}
      className={styles.container}
      onMouseLeave={() => {
        setShowBtn(false);
        setBrightness("brightness(100%)")
      }}
      onMouseEnter={() => {
        setShowBtn(true);
        setBrightness("brightness(90%)")
      }}>

      <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
        <Link to={`/product-details/${id}`}>
          <div className={styles.img}>
            <img  src={imageURL} alt={name} />
          </div>
        </Link>
        <div className={styles.content}>
          <div className={styles.details}>
            <p>{`$${price}`}</p>
            <h4>{shortenText(name, 18)}</h4>
          </div>
          {!grid && <p className={styles.desc}>{shortenText(desc, 300)}</p>}

          {showBtn &&
            <Zoom><button
              className="--btn --btn-danger"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>
            </Zoom>}
        </div>
      </Card>
    </div>
  );
};

export default ProductItem;