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
import Axios from "axios";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
  const [message, setMessage] = useState("Initializing checkout...");
  const [clientSecret, setClientSecret] = useState("");
  const [phone, setPhone] = useState();
  const [error, setError] = useState();
  const [data, setData] = useState();
  const [buttonText, setButtonText] = useState("Pay")

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
    paymentMethod === "card" && fetch("http://localhost:4242/create-payment-intent", {
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
  const payHandler = (event) => {
    event.preventDefault();
    setButtonText("Processing")
    Axios.post("http://localhost:4242/mpesa-payment", {
      items: cartItems,
      phone,
    })
      .then((res) => {
        setData(res.data.CustomerMessage);
        console.log(res)
        setButtonText("Pay")

      })
      .catch((error) => {
        console.log(error);
        setButtonText("Pay")

      });
  };

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

      {paymentMethod === "mpesa" && <div>
        <div className="  mt-10 justify-center items-center  flex flex-col">
          <h1 className="text-2xl">
            Pay with <span className="text-green-600  font-bold">Mpesa</span>
          </h1>
          <form className="flex flex-col space-y-5">
            <input
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className=" bg-slate-100 py-1 px-2 outline-none text-center rounded-xl"
            />
            <button
              onClick={payHandler}
              className="bg-green-600 text-white px-2 py-1 rounded-2xl"
            >
              {buttonText}
            </button>
          </form>




        </div>
      </div>}

    </section>
  );
};

export default Checkout;