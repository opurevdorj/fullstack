import React, { useEffect, useState } from "react";
import "./Product.css";
import { Header } from "../../components/header";
import axios from "axios";
import { useParams } from "react-router-dom";
import { EditProductModal } from "./EditProductModal";
import { DeleteProductModal } from "./DeleteProductModal";

export const Product = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();

  //edit product modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  //delete product modal
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/products/${id}`
        );
        const data = await response.data;
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();

    return () => fetchProduct();
  }, [id]);
  console.log(product);

  if (!product) {
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
