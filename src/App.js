import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Contact from "./pages/contact/Contact";
import Homepage from "./pages/home/Homepage";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
