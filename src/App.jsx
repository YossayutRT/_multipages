import { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layouts/Layout/Layout";
import Home from "./pages/Home/Home";
import Animation from "./pages/Animation/Animation";
import Todo from "./pages/Todo/Todo";
import Calculator from "./pages/Calculator/Calculator";
import Components from "./pages/Components/components";
import Products from "./pages/Products/Products";
import Carts from "./pages/Carts/Carts";
import Login from "./pages/Login/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";
import { fetchProducts } from "./data/products";

function App() {
  const [token, setToken] = useState(''); 
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [tab, setTab] = useState("");

  useEffect(() => {
    const productsData = fetchProducts();
    setProducts(productsData);
  }, []);

  // ถ้า token ไม่มีค่า (เช่นเป็น '') ให้แสดงหน้า Login
  if (token === '') {
    return <Login setToken={setToken} />; 
  } else {
    // ถ้ามี token แล้ว ให้แสดงเนื้อหาแอปตามปกติ
    return (
      <div className="app-container">
        <HashRouter>
          <Routes>
            <Route element={<Layout tab={tab} setTab={setTab} products={products} carts={carts} setToken={setToken} />}>
              <Route path="/Home" element={<Home />} />
              <Route path="/Animation" element={<Animation />} />
              <Route path="/calculator" element={<Calculator />} />
              
              <Route path="/components" element={<Components />} />
              <Route path="/todo" element={<Todo />} />
              <Route
                path="/products"
                element={
                  <Products products={products} carts={carts} setCarts={setCarts} />
                }
              />
              <Route path="/carts" element={<Carts carts={carts} setCarts={setCarts} />} />
              <Route path="/" element={<Navigate to="/home" />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
  }
}

export default App;
