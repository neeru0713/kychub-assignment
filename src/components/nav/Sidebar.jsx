import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaExchangeAlt
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="fixed top-15 left-5 z-50 p-2 bg-slate-800 text-white rounded-full md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
      </button>

      <div
        className={`fixed top-[56px] left-0 h-[calc(100vh-56px)] w-64 bg-white text-slate-800 shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64`}
      >
        <nav className="flex flex-col p-4 gap-2 pt-8 ">
          <Link
            to="/"
            className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded"
          >
            <FaShoppingCart /> Product Details
          </Link>
          <Link
            to="/compare-products"
            className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded"
          >
            <FaExchangeAlt /> Compare Products
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
