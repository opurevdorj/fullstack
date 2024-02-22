import React, { useState } from "react";
import { Modal } from "../../components/modal";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";
import { uploadImage } from "../../utils/utils";
import { Image } from "antd";

export const EditProductModal = (props) => {
  const { id } = useParams();
  const { open, handleClose, product } = props;
  const [inputValue, setInputValue] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    productImage: product.productImage
  });
const [newImageUrl, setNewImageUrl] = useState("")
  const { currentUser } = useUserContext();
  const { UPDATE_PRODUCT } = useProductContext();

  const handleInput = (e) => {
    const { name, value, } = e.target;
    setInputValue({ ...inputValue, [name]: value, });
  };
  console.log(inputValue);

  const handleFileChange = async (e) => {
    const imageUrl = await uploadImage(e.target.files[0]);
    setNewImageUrl(imageUrl);
    
  };

  const handleCancelButton = () => {
    setInputValue({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
     productImage: product.productImage
    });
    handleClose();
  };

  const handleSaveButton = async () => {
    const updatedProduct = {
      name: inputValue.name,
      description: inputValue.description,
      price: parseInt(inputValue.price),
      category: inputValue.category,
      productImage: newImageUrl
     
    };
    try {
      const response = await axios.put(
        // `http://localhost:8080/products/${id}`,
        `https://fullstack-backend-5gvr.onrender.com/products/${id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      const data = await response.data;
      UPDATE_PRODUCT(data);

      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal open={open} handleClose={handleClose}>
        <div style={{ color: "#097969;", fontSize: "20px" }}>Edit product</div>
        <div className="createInput">
          <input
            type="file"
            name="productImage"
            onChange={handleFileChange}
          />
          <Image
          height="60px"
          width="60px"
          src={newImageUrl ? newImageUrl : product.productImage}
          />
          <input
            className="editAndDeleteInput"
            onChange={handleInput}
            name="name"
            placeholder="Name"
            type="text"
            value={inputValue.name}
          />
          <input
            className="editAndDeleteInput"
            onChange={handleInput}
            name="description"
            placeholder="Description"
            type="text"
            value={inputValue.description}
          />
          <input
            className="editAndDeleteInput"
            onChange={handleInput}
            name="price"
            placeholder="Price"
            type="text"
            value={inputValue.price}
          />
          <input
            className="editAndDeleteInput"
            onChange={handleInput}
            name="category"
            placeholder="Category"
            type="text"
            value={inputValue.category}
          />
        </div>
        <button className="cancelAndSaveButton" onClick={handleCancelButton}>
          Cancel
        </button>
        <button className="cancelAndSaveButton" onClick={handleSaveButton}>
          Save
        </button>
      </Modal>
    </div>
  );
};
