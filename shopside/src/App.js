import "./App.css";
import Products from "./components/Products/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AiFillShopping } from "react-icons/ai";
import Hero from "./components/Hero/Hero";
import SingleProduct from "./components/Products/SingleProduct";
import { useSelector, useDispatch } from "react-redux";
import "./shop.css";

function App() {
  const count = useSelector((state) => state.counter.value);
  return (
    <BrowserRouter>
      <div className="shopbag">
        <h3>{count}</h3>
        <AiFillShopping className="imoj" />
      </div>
      <Routes>
        <Route path="/" element={<Hero />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:id" element={<SingleProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
