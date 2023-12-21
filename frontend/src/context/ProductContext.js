import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import axios from "axios";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const { currentUser, userContextLoading } = useUserContext();
  const [products, setProducts] = useState([]);
  const [productContextLoading, setProductContextLoading] = useState([]);

  useEffect(() => {
    if (!userContextLoading) {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/products`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        const data = await response.data;
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser) {
        fetchProducts();
    }
   
    return () => fetchProducts();
} else {
setProducts();
}
  }, [currentUser, userContextLoading]);




  return (
    <ProductContext.Provider value={{ products, productContextLoading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  return context;
};
