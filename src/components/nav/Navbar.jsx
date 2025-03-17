import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const imageUrl =
    "https://media.licdn.com/dms/image/v2/D4D03AQGSDFovlrjljA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1700464274578?e=1747872000&v=beta&t=XOMDyWqhbC5zWChShH1KiTkxD3BFT4bgatY-IErJv38";
  return (
    <nav className="bg-slate-800 p-2 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex gap-8 items-center">
        <h1 className="text-xl font-bold">KYC Products</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </div>
        </div>

        <div className="flex items-center space-x-4">
          <span>Neeru</span>
          <img
            src={imageUrl}
            alt="Profile photo"
            className="w-10 h-10 rounded-full border-1 border-slate-200 cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
