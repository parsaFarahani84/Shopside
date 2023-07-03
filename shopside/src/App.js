import "./App.css";
import Products from "./components/Products/Product";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AiFillShopping } from "react-icons/ai";
import Hero from "./components/Hero/Hero";
import SingleProduct from "./components/Products/SingleProduct";
import { useSelector, useDispatch } from "react-redux";
import "./shop.css";
import ShopList from "./components/ShopList/ShopList";

function App() {
  const count = useSelector((state) => state.counter.value);
  return (
    <BrowserRouter>
      <Link to="/shop-list">
        <div className="shopbag">
          <h3>{count}</h3>
          <AiFillShopping className="imoj" />
        </div>
      </Link>
      <Routes>
        <Route path="/" element={<Hero />} />

        <Route path="/products" element={<Products />} />

        <Route path="/shop-list" element={<ShopList />} />

        <Route path="/products/:id" element={<SingleProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
