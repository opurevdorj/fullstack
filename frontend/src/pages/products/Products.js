import React, { useEffect, useState } from "react";
import "./Products.css";
import { Header } from "../../components/header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CreateProductModal } from "./CreateProductModal";



export const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:8080/products");

      const data = await response.data;
      setProducts(data);
    };
    getProducts();
  }, []);

  console.log(products);
  return (
    <div>
      <Header />
      <div className="Title">Products Page</div>
      <button onClick={handleOpen}>Create Product</button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products &&
          products.map((product) => (
            <div
              key={product._id}
              style={{
                backgroundColor: "whitesmoke",
                width: 200,
                borderRadius: "10px",
                padding: "20px",
                margin: "20px",
              }}
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <h3>Name: {product.name}</h3>
              <p>Description: {product.description}</p>
              <p>Price: {product.price}</p>
              <p>Category: {product.category}</p>
            </div>
          ))}
          <CreateProductModal open={open} handleClose={handleClose}/>
      </div>
    

    </div>
  );
};
