import { Home, Products, Note, Product } from "./pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from "./pages/sign-in/SignIn";
import { SignUp } from "./pages/sign-up/SignUp";
import { useUserContext } from "./context/UserContext";
import { Profile } from "./pages/profile";


export const App = () => {
  const { currentUser, userContextLoading } = useUserContext();

  if (userContextLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={currentUser ? <Products /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/note"
          element={currentUser ? <Note /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/profile"
          element={currentUser ? <Profile /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/products/:id"
          element={currentUser ? <Product /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/sign-in"
          element={!currentUser ? <SignIn /> : <Navigate to="/" />}
        />
        <Route
          path="/sign-up"
          element={!currentUser ? <SignUp /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};
