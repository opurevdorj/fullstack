import React, { useEffect, useState } from "react";
import { Modal } from "../../components/modal";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";

export const EditProductModal = (props) => {
  const { id } = useParams();
  const { open, handleClose, product } = props;
  const [inputValue, setInputValue] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
  });

  const { currentUser } = useUserContext();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  console.log(handleInput);

  const handleCancelButton = () => {
    setInputValue({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
    });
    handleClose();
  };

  const handleSaveButton = async () => {
    const updatedProduct = {
      name: inputValue.name,
      description: inputValue.description,
      price: parseInt(inputValue.price),
      category: inputValue.category,
    };
    try {
      await axios.put(`http://localhost:8080/products/${id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      console.log("Successfully edited");
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal open={open} handleClose={handleClose}>
        <div>Edit product</div>
        <div className="createInput">
          <input
            onChange={handleInput}
            name="name"
            placeholder="Name"
            type="text"
            value={inputValue.name}
          />
          <input
            onChange={handleInput}
            name="description"
            placeholder="Description"
            type="text"
            value={inputValue.description}
          />
          <input
            onChange={handleInput}
            name="price"
            placeholder="Price"
            type="text"
            value={inputValue.price}
          />
          <input
            onChange={handleInput}
            name="category"
            placeholder="Category"
            type="text"
            value={inputValue.category}
          />
        </div>
        <button onClick={handleCancelButton}>Cancel</button>
        <button onClick={handleSaveButton}>Save</button>
      </Modal>
    </div>
  );
};
