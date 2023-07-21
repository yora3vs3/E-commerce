import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalAmount, } from "../../redux/slice/cartSlice";
import { selectEmail } from "../../redux/slice/authSlice";
import { selectPaymentMethod } from "../../redux/slice/paymentSlice";
import { selectBillingAddress, selectShippingAddress, } from "../../redux/slice/checkoutSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import MpesaForm from "./MpesaForm";



const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
  const [message, setMessage] = useState("Initializing checkout...");
  const [clientSecret, setClientSecret] = useState("");

  const paymentMethod = useSelector(selectPaymentMethod);
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectEmail);

  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  const description = `eShop payment: email: ${customerEmail}, Amount: ${totalAmount}`;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    paymentMethod === "card" && fetch("https://wazibiz-server.onrender.com/stripe-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        billing: billingAddress,
        description,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        }
        const json = await res.json();
        return await Promise.reject(json);
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setMessage("Failed to initialize checkout");
        toast.error("Something went wrong!!!");
      });
  }, [paymentMethod]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  console.log(message);

  //mpesa payment


  return (
    <section>

      {paymentMethod === "card" &&
        <div className="container">{!clientSecret && <h3>
          {message}
        </h3>}</div>
      }

      {paymentMethod === "card" && clientSecret && (<Elements options={options} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      )}

      {paymentMethod === "mpesa" && <MpesaForm />}

    </section>
  );
};

export default Checkout;