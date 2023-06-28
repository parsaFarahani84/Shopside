import "./App.css";
import Products from "./components/Products/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import SingleProduct from "./components/Products/SingleProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:id" element={<SingleProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
