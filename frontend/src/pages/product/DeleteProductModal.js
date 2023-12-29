import React from "react";
import { Modal } from "../../components/modal";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";

export const DeleteProductModal = (props) => {
  const { openDelete, handleCloseDelete, product } = props;
  const { id } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useUserContext();
  const {DELETE_PRODUCT} = useProductContext();

  const handleYesButton = async () => {
    try {
      const response = await axios.delete(`https://fullstack-backend-5gvr.onrender.com/products/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      const data = await response.data
      DELETE_PRODUCT(data._id)
      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  const handleNoButton = () => {
    handleCloseDelete();
  };
  return (
    <div>
      <Modal open={openDelete} handleClose={handleCloseDelete}>
        <div style={{display: "flex", justifyContent: "center"}}>Are you sure you want to delete this product?</div>
        <button className="cancelAndSaveButton" onClick={handleNoButton}>No</button>
        <button className="cancelAndSaveButton" onClick={handleYesButton}>Yes</button>
      </Modal>
    </div>
  );
};
