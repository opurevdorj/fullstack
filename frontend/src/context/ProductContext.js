import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import axios from "axios";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const { currentUser, userContextLoading } = useUserContext();
  const [products, setProducts] = useState([]);
  const [productContextLoading, setProductContextLoading] = useState(true);

  useEffect(() => {
    if (!userContextLoading) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`https://fullstack-backend-5gvr.onrender.com/products`, {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          });
          const data = await response.data;
          setProducts(data);
          setProductContextLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      if (currentUser) {
        fetchProducts();
      }

      return () => fetchProducts();
    } else {
      setProducts([]);
    }
  }, [currentUser, userContextLoading]);

  const CREATE_PRODUCT = async (product) => {
    setProducts([...products, product]);
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
