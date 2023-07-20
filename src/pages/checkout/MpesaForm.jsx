import React, { useState } from 'react';
import mpesalogo from "../../assets/mpesa.png";
import "./checkout.scss";
import Card from "../../components/card/Card";
import Axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from '../../redux/slice/cartSlice';
import { selectEmail, selectUserID } from '../../redux/slice/authSlice';
import { selectShippingAddress } from '../../redux/slice/checkoutSlice';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MpesaForm = () => {
    const [phone, setPhone] = useState();
    const [error, setError] = useState();
    const [data, setData] = useState();
    const [buttonText, setButtonText] = useState("Pay");
    const userID = useSelector(selectUserID);
    const userEmail = useSelector(selectEmail);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const shippingAddress = useSelector(selectShippingAddress);
    const cartItems = useSelector(selectCartItems);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const payHandler = (event) => {
        event.preventDefault();
        setButtonText("Sending..");
        Axios.post("https://wazibiz-server.onrender.com/mpesa-payment", {
            items: cartItems,
            phone,
        })
            .then((res) => {
                setData(res.data.CustomerMessage);
                if (res.status === 200) saveOrder();
                setPhone("");
                setButtonText("Pay");

            })

            .catch((error) => {
                console.log(error);
                setError(error.message);
                setButtonText("Pay");
            });
    };


    // Save order to Order History
    const saveOrder = () => {
        const today = new Date();
        const date = today.toDateString();
        const time = today.toLocaleTimeString();
        const orderConfig = {
            userID,
            userEmail,
            orderDate: date,
            orderTime: time,
            orderAmount: cartTotalAmount,
            orderStatus: "Order Placed...",
            cartItems,
            shippingAddress,
            createdAt: Timestamp.now().toDate(),
        };

        try {
            addDoc(collection(db, "orders"), orderConfig);
            dispatch(CLEAR_CART());
            toast.success("Order saved");
            navigate("/checkout-success");
        } catch (error) {
            toast.error(error.message);
        }
    };


    return (
        <div>
            <div className="mpesa-checkout-container">
                <img src={mpesalogo} alt="mpesa logo" className="mpesa-logo" />
                {data ? <h4>Request accepted for processing</h4> : <h2>Pay with <span className="text">Mpesa</span></h2>}

                <Card>
                    <form className="mpesa-form">
                        <input
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone"
                            className="phone-input"
                            value={phone}
                        />
                        <button
                            onClick={payHandler}
                            className="pay-button"
                        >
                            {buttonText}
                        </button>
                        {error}
                    </form>

                </Card>

            </div>
        </div>
    )
}

export default MpesaForm