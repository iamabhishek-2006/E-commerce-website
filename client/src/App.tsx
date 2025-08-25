import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import SignIn from "./pages/SignIn";
import { Toaster } from "./components/ui/sonner";
import Products from "./pages/Products";
import Navbar from "./components/shared/Navbar";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetails/>} /> // single product info
        <Route path="/products/:category" element={<Products />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};
export default App;
