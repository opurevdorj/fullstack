import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import "./Products.css";
import { Header } from "../../components/header";
import { useNavigate } from "react-router-dom";
import { CreateProductModal } from "./CreateProductModal";
import { useProductContext } from "../../context/ProductContext";
import { useUserContext } from "../../context/UserContext";

const { Meta } = Card;

export const Products = () => {
  const navigate = useNavigate();
  const { products } = useProductContext();
  const { currentUser } = useUserContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(products);
  return (
    <div className="productPage">
      <Header />
      <div className="Title">Products Page</div>
      <button className="ButtonCreate" onClick={handleOpen}>
        Create Product
      </button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products &&
          products.map((product) => (
            <Card
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
              style={{
                width: 300,
                padding: "20px",
                margin: "20px",
              }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
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
        <CreateProductModal open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};
