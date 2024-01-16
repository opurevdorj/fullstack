import React, { useEffect, useState } from "react";
import { Avatar, Card } from "antd";
import "./Products.css";
import { Header } from "../../components/header";
import { useNavigate } from "react-router-dom";
import { CreateProductModal } from "./CreateProductModal";
import { useProductContext } from "../../context/ProductContext";
import { useUserContext } from "../../context/UserContext";
import { ToastContainer } from "react-toastify";
import ReactLoading from "react-loading";

const { Meta } = Card;

export const Products = () => {
  const navigate = useNavigate();
  const { products, productContextLoading } = useProductContext();
  const { currentUser } = useUserContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(products);
  return (
    <div className="productPage">
      <Header />
      <div className="Title">Share your work with us</div>
      <button className="ButtonCreate" onClick={handleOpen}>
        Create Product
      </button>
      {productContextLoading && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactLoading
            type="spinningBubbles"
            color="#097969"
            height={100}
            width={50}
          />
        </div>
      )}
      {!productContextLoading && products.length === 0 && <div>There is no product</div>}
      {!productContextLoading && products.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {products &&
            products.map((product) => (
              <Card
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                style={{
                  width: 440,
                  padding: "20px",
                  margin: "20px",
                }}
                cover={<img alt="example" src={product.productImage} />}
              >
                <p>{product.type}</p>
                <Meta
                  avatar={
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                  }
                  title={product.name}
                  description={product.description}
                />
                <p>Price: {product.price}</p>
                <p>Category: {product.category}</p>
                <p>Created by: {product.userEmail}</p>
              </Card>
            ))}
        </div>
      )}

      <ToastContainer />
      <CreateProductModal open={open} handleClose={handleClose} />
    </div>
  );
};
