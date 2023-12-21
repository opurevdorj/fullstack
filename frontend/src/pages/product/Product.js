import React, { useEffect, useState } from "react";
import "./Product.css";
import { Header } from "../../components/header";
import axios from "axios";
import { useParams } from "react-router-dom";
import { EditProductModal } from "./EditProductModal";
import { DeleteProductModal } from "./DeleteProductModal";
import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";

export const Product = () => {
  const { id } = useParams();
  const { currentUser, userContextLoading } = useUserContext();

  //edit product modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  //delete product modal
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  //ProductContext
  const { products, productContextLoading } = useProductContext();
  const product = products.find((product) => product._id === id);

  console.log(product);
  
  if (userContextLoading) {
    return <div>Loading...</div>;
  }
  if (!userContextLoading && !product) {
    return <div>Item not found</div>;
  }
  return (
    <div>
      <Header />
      <div className="Title">Product Page</div>
      <button onClick={handleOpen}>Edit product</button>
      <button onClick={handleOpenDelete}>Delete</button>
      {product && (
        <div
          style={{
            backgroundColor: "whitesmoke",
            width: 200,
            borderRadius: "10px",
            padding: "20px",
            margin: "20px",
          }}
        >
          <h3>Name: {product.name}</h3>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
          <p>Category: {product.category}</p>
        </div>
      )}
      <EditProductModal
        open={open}
        handleClose={handleClose}
        product={product}
      />
      <DeleteProductModal
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        product={product}
      />
    </div>
  );
};
