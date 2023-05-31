import "./App.scss";
import { Route, Routes } from "react-router-dom";
import {Footer,Header} from "./components";
import {Contact,Home} from "./pages";


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
