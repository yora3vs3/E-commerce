import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Pages
import { Home, Contact, Login, Register, Reset, Admin } from "./pages";
// Components
import { Header, Footer } from "./components";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
// import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
// import OrderHistory from "./pages/orderHistory/OrderHistory";
// import OrderDetails from "./pages/orderDetails/OrderDetails";
// import ReviewProducts from "./components/reviewProducts/ReviewProducts";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />

          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* <Route path="/checkout-success" element={<CheckoutSuccess />} /> */}
          {/* <Route path="/order-history" element={<OrderHistory />} /> */}
          {/* <Route path="/order-details/:id" element={<OrderDetails />} /> */}
          {/* <Route path="/review-product/:id" element={<ReviewProducts />} /> */}
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;


// pk = pk_test_51NGke0L5e95ib4hZ3E9l9TV3NgxheqAgEf0lHzQzHgIr8JEqnhjLbCcuVX36DMczlY8xmHY7TuL2uNXXHdTirVtj00KclJQ58K
// sk = sk_test_51NGke0L5e95ib4hZumrToF7SwuPHGLmpWnYoYPNKwxURhRnwJ6uloeOqBHeyOoiwbWiGsPGChHt9xrOQimIt8Ef400kFyeKdte