import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import Products from "./components/Products/Product";
import SingleProduct from "./components/Products/SingleProduct";
import ShopList from "./components/ShopList/ShopList";
import Profile from "./components/Profile/Profile";
import { AiFillShopping } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { increment, addProduct } from "./components/counter/CounterSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [nameCategory, setNameCategory] = useState("");
  const dispatch = useDispatch();

  const category = ["men's clothing", "jewelery", "electronics"];
  const count = useSelector((state) => state.counter.value);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/`).then((response) => {
      setData(response.data);
    });
  }, []);

  useEffect(() => {
    const filteredData = data.filter((item) => item.title.includes(search));
    setResult(filteredData);
  }, [search, data]);

  useEffect(() => {
    const filteredByCategory = data.filter(
      (item) => item.category === nameCategory
    );
    setResult(filteredByCategory);
  }, [nameCategory, data]);

  const searchFun = (e) => {
    e.preventDefault();
    const filteredData = data.filter((item) => item.title.includes(search));
    setResult(filteredData);
  };
  // -------------------------------

  // Add product to the cart
  const increase = useCallback(
    (product) => {
      dispatch(addProduct(product)); // Dispatch addProduct action with the selected product
      toast.success("Product added to the cart");
    },
    [dispatch]
  );

  return (
    <BrowserRouter>
      {/* Main Header */}
      <header className="flex justify-between items-center px-4 md:px-20 py-4 bg-white shadow-md">
        <ToastContainer
          theme="dark"
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="flex items-center gap-4">
          {/* Profile Button */}
          <Link to="/profile">
            <button className="flex items-center gap-1 bg-green-600 text-pink-50 border-2 border-green-600 py-2 px-4 text-sm rounded-md hover:bg-transparent hover:text-green-600">
              <CgProfile className="text-lg" /> Sara Doe
            </button>
          </Link>
        </div>
        {/* Center Logo */}
        <div className="flex-1 text-center">
          <div className="text-2xl font-bold">
            <Link to="/products">Shopside</Link>
          </div>
        </div>
        {/* Shopping List Button */}
        <Link to="/shop-list" onClick={() => setNameCategory("")}>
          <button className="flex items-center gap-1 bg-green-600 text-pink-50 border-2 border-green-600 py-2 px-4 text-sm rounded-md hover:bg-transparent hover:text-green-600">
            <AiFillShopping className="text-lg" /> Card: {count}
          </button>
        </Link>
      </header>

      {/* Subheader */}
      <div className="flex items-center justify-between px-4 md:px-20 py-2 bg-gray-100 shadow-sm">
        {/* Search Bar */}
        <form
          className="flex items-center w-full max-w-md"
          onSubmit={searchFun}
        >
          <BiSearchAlt className="absolute ml-2 text-xl" />
          <input
            className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-gray-300 focus:outline-none"
            placeholder="Search here"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>

        {/* Filter Selector */}
        <div className="relative ml-4">
          <select
            className="bg-green-600 text-pink-50 border-2 border-green-600 py-2 px-4 text-sm rounded-md cursor-pointer hover:bg-transparent hover:text-green-600"
            onChange={(e) => setNameCategory(e.target.value)}
            value={nameCategory}
          >
            <option value="">Filter</option>
            {category.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Routes and Product Display */}
      {search || nameCategory ? (
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 w-full mt-[5rem] px-[2rem]">
          {result &&
            result.map((product) => (
              <div
                key={product.id}
                className="max-w-sm overflow-hidden bg-white h-[25rem] flex flex-col justify-between transition-all duration-300 ease-in-out rounded-[1.5rem] hover:translate-y-[-8px]"
              >
                <div>
                  <img
                    className="w-full h-48 object-cover duration-300 p-[1.5rem] transition-all ease-in-out hover:p-[0.5rem]"
                    src={product.image}
                    alt="Product Image"
                  />
                  <div className="font-bold text-xl mb-2 text-gray-800 p-6">
                    {product.title.length > 30
                      ? product.title.slice(0, 30)
                      : product.title}
                  </div>
                </div>
                <div className="flex justify-between items-center px-[2rem] pb-[1rem]">
                  <p className="text-gray-600 text-base flex items-center">
                    Price: ${product.price}
                  </p>
                  <button
                    className="flex items-center bg-green-600 text-pink-50 border-2 border-green-600 py-2 px-4 text-sm rounded-md hover:bg-transparent hover:text-green-600"
                    onClick={() => {
                      dispatch(increment());
                      increase(product); // Pass the product to increase function
                    }}
                  >
                    click to buy
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Products />} />
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
