
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { ProductDetails } from "./components/product/ProductDetails";
import { CompareProducts } from "./components/product/CompareProducts";
import  Navbar  from "./components/nav/Navbar";
function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductDetails />}></Route>
        <Route path="/compare=products" element={<CompareProducts />}></Route>
      </Routes>
  </Router>
  )
}

export default App
