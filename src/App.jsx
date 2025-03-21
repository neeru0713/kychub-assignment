
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import ProductDetails from "./components/product/ProductDetails";
import CompareProducts from "./components/product/CompareProducts";
import  Navbar  from "./components/nav/Navbar";
import  Sidebar from "./components/nav/Sidebar";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
function App() {

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-5">
            <Routes>
              <Route path="/" element={<ProductDetails />} />
              <Route path="/compare-products" element={<CompareProducts />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
      </div>
  </Router>
  )
}

export default App
