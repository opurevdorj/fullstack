
import { Home, Products, Note, Product } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/sign-in/SignIn";
import { SignUp } from "./pages/sign-up/SignUp";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path = "/sign-in" element={<SignIn/>} />
      <Route path = "/sign-up" element={<SignUp/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/note" element={<Note/>} />
        <Route path="/products/:id" element={<Product/>} />
      </Routes>
    </BrowserRouter>
  );
};
