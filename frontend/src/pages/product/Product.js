import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import "./Product.css";
import { Header } from "../../components/header";
import axios from "axios";
import { useParams } from "react-router-dom";
import { EditProductModal } from "./EditProductModal";
import { DeleteProductModal } from "./DeleteProductModal";
import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";
import ContactUs from "./ContactUs";

const { Meta } = Card;

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
  console.log(currentUser);
  if (userContextLoading) {
    return <div>Loading...</div>;
  }
  if (!userContextLoading && !product) {
    return <div>Item not found</div>;
  }
  if (currentUser) {
    return (
      <div>
        <Header />
        <div className="Title">Our trusted contractor</div>
        {product && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              style={{
                width: 600,
                padding: "20px",
                margin: "20px",
              }}
              cover={<img alt="example" src={product.productImage} />}
              actions={
                product.userId === currentUser.user.id
                  ? [
                      <DeleteOutlined
                        key="delete"
                        onClick={handleOpenDelete}
                      />,
                      <EditOutlined key="edit" onClick={handleOpen} />,
                    ]
                  : []
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
            <div style={{
              width: "500px",
              height: "500px",
              margin: "20px",
              backgroundColor: "#097969",
              borderRadius: "10px",
            }}>
              <ContactUs />
            </div>
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
  }
};
