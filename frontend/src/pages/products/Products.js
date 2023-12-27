import React, { useEffect, useState } from "react";
import "./Products.css";
import { Header } from "../../components/header";
import { useNavigate } from "react-router-dom";
import { CreateProductModal } from "./CreateProductModal";
import { useProductContext } from "../../context/ProductContext";

export const Products = () => {
  const navigate = useNavigate();
  const { products } = useProductContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(products);
  return (
    <div className="productPage">
      <Header />
      <div className="Title">Products Page</div>
      <button className="ButtonCreate" onClick={handleOpen}>Create Product</button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products &&
          products.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #097969",
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
        <CreateProductModal open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};
