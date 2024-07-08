import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
// ----------COMPONENTS----------
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Product";
import SingleProduct from "./components/Products/SingleProduct";
import ShopList from "./components/ShopList/ShopList";
import Profile from "./components/Profile/Profile";
// ------------------------LOGOS----------------------------
import { AiFillShopping } from "react-icons/ai";
import {
  MdOutlineProductionQuantityLimits,
  MdSentimentSatisfiedAlt,
} from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import { useCallback } from "react";
// ----------------------------------------------------

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [nameCategory, setNameCategory] = useState("");
  const [filter, setFilter] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const category = ["men's clothing", "jewelery", "electronics"];

  const count = useSelector((state) => state.counter.value);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/`).then((i) => {
      setData(i.data);
    });
  }, []);

  useEffect(() => {
    const now = data.filter((e) => e.title.includes(search));
    setResult(now);
  }, [search]);

  const searchFun = (e) => {
    e.preventDefault();
    const now = data.filter((e) => e.title.includes(search));
    setResult(now);
  };

  useEffect(() => {
    const cat = data.filter((e) => nameCategory == e.category);
    setResult(cat);
  }, [nameCategory]);

  return (
    <BrowserRouter>
      <nav className="flex flex-wrap items-center justify-between px-4 md:px-20 py-4 bg-white shadow-md">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="text-2xl font-bold">Shopside</div>
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        <div
          className={`w-full md:flex md:items-center md:w-auto ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col md:flex-row md:gap-4 mt-4 md:mt-0">
            {filter ? (
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex flex-wrap items-center w-full">
                  {category.map((e) => (
                    <button
                      className="py-2 px-4 m-0 flex items-center justify-center mr-4 text-sm"
                      key={Math.random()}
                      onClick={() => setNameCategory(e)}
                    >
                      {e}
                    </button>
                  ))}
                  <Link to="/products">
                    <button
                      className="py-2 m-0 flex items-center justify-center mr-4 text-sm"
                      onClick={() => {
                        setNameCategory("");
                        setSearch("");
                      }}
                    >
                      Clear
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <form
                className="flex items-center justify-center"
                onSubmit={searchFun}
              >
                <BiSearchAlt className="z-50 mr-[-2rem] text-xl md:text-2xl" />
                <input
                  className="px-4 py-2 w-full pl-10 rounded-full border-2 border-black border-solid z-40"
                  placeholder="Search here"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </form>
            )}
            <button
              className="bg-green-600 text-pink-50 border-2 border-green-600 py-2 px-4 text-center text-sm rounded-md inline-flex justify-center items-center cursor-pointer transition-all duration-200 ease-in-out hover:bg-transparent hover:text-green-600 mt-4 md:mt-0"
              onClick={() => {
                setFilter((prev) => !prev);
                setNameCategory("");
                setSearch("");
              }}
            >
              <CiFilter className="text-lg md:text-xl" /> Filter
            </button>
          </div>

          <div className="flex md:ml-[1rem] justify-center md:flex-row items-center gap-4 mt-4 md:mt-0 ">
            <Link to="/shop-list">
              <button
                className="bg-green-600 text-pink-50 border-2 border-green-600 py-2 px-4 text-center text-sm rounded-md inline-flex justify-center items-center cursor-pointer transition-all duration-200 ease-in-out hover:bg-transparent hover:text-green-600"
                onClick={() => {
                  setNameCategory("");
                  setSearch("");
                }}
              >
                <AiFillShopping className="text-lg md:text-xl" /> List: {count}
              </button>
            </Link>

            <Link to="/products">
              <button
                className="bg-green-600 text-pink-50 border-2 border-green-600 py-2 px-4 text-center text-sm rounded-md inline-flex justify-center items-center cursor-pointer transition-all duration-200 ease-in-out hover:bg-transparent hover:text-green-600"
                onClick={() => {
                  setNameCategory("");
                  setSearch("");
                }}
              >
                <MdOutlineProductionQuantityLimits className="text-lg md:text-xl" />{" "}
                Products
              </button>
            </Link>

            <Link to="/profile">
              <button
                className="bg-green-600 text-pink-50 border-2 border-green-600 py-2 px-4 text-center text-sm rounded-md inline-flex justify-center items-center cursor-pointer transition-all duration-200 ease-in-out hover:bg-transparent hover:text-green-600"
                onClick={() => {
                  setNameCategory("");
                  setSearch("");
                }}
              >
                <MdSentimentSatisfiedAlt className="text-lg md:text-xl" />{" "}
                Profile
              </button>
            </Link>
          </div>
        </div>
      </nav>
      {search || nameCategory ? (
        <div className="grid grid-cols-4 gap-4 w-full mt-[5rem] px-[2rem]">
          {result &&
            result.map((i) => (
              <Link
                to={`/products/${i.id}`}
                key={i.id}
                onClick={() => {
                  setNameCategory("");
                  setSearch("");
                }}
              >
                <div className="max-w-sm overflow-hidden bg-white h-[25rem] flex flex-col justify-between transition-all duration-300 ease-in-out rounded-[1.5rem] hover:translate-y-[-8px]">
                  <div className="mt-[1rem]">
                    <img
                      className="w-full h-48 object-cover duration-300 p-[1.5rem] transition-all ease-in-out hover:p-[0.5rem]"
                      src={i.image}
                      alt="Product Image"
                    />
                    <div className="font-bold text-xl mb-2 text-gray-800 p-6">
                      {i.title.length > 30 ? i.title.slice(0, 30) : i.title}
                    </div>
                  </div>

                  <div className="flex justify-between items-center px-[2rem] pb-[1rem]">
                    <p className="text-gray-600 text-base  flex items-center">
                      Price: ${i.price}
                    </p>
                    <span className="flex items-center">click to buy</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Hero />} />

          <Route path="/products" element={<Products />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/shop-list" element={<ShopList />} />

          <Route path="/products/:id" element={<SingleProduct />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
