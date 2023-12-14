import { Home, Products, Note, Product } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/sign-in/SignIn";
import { SignUp } from "./pages/sign-up/SignUp";
import { useUserContext } from "./context/UserContext";
import { ReactLoading } from "react-loading";

export const App = () => {
  const { currentUser, loading } = useUserContext();

  return (
    <BrowserRouter>
      {currentUser ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/note" element={<Note />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};
