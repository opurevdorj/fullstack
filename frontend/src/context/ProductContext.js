import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import axios from "axios";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const { currentUser, userContextLoading } = useUserContext();
  const [products, setProducts] = useState([]);
  const [productContextLoading, setProductContextLoading] = useState(true);

  const token = currentUser?.token;

console.log(currentUser)

  useEffect(() => {
    if (!userContextLoading && token) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            // "http://localhost:8080/products", 
            "https://fullstack-backend-5gvr.onrender.com/products",
            {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.data;
          setProducts(data);
          setProductContextLoading(false);
        } catch (error) {
          console.log(error);
          setProductContextLoading(false);
        }
      };
      if (currentUser) {
        fetchProducts();
      }

      return () => fetchProducts();
    } else {
      setProducts([]);
    }
  }, [currentUser, userContextLoading, token]);

  const CREATE_PRODUCT = async (product) => {
    setProducts([product, ...products]);
  };
  const UPDATE_PRODUCT = async (updatedProduct) => {
    const updatedProducts = products.map((product) => {
      if (product._id === updatedProduct._id) {
        return updatedProduct;
      } else {
        return product;
      }
    });
    setProducts(updatedProducts);
  };
  const DELETE_PRODUCT = async (id) => {
    const updatedProducts = products.filter((product) => product._id !== id);
    setProducts(updatedProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        productContextLoading,
        setProducts,
        CREATE_PRODUCT,
        UPDATE_PRODUCT,
        DELETE_PRODUCT,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  return context;
};
