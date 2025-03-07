// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Business_Panel_Sidebar";
import Dashboard from "./pages/Dashboard";
import NewProduct from "./pages/NewProduct";
import Products from "./pages/Product";
import Orders from "./pages/Order";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar panelType="businessPanel" />

        {/* Main Content */}
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-product" element={<NewProduct />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;