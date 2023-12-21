import React from "react";
import { Modal } from "../../components/modal";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";

export const DeleteProductModal = (props) => {
  const { openDelete, handleCloseDelete, product } = props;
  const { id } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useUserContext();

  const handleYesButton = async () => {
    try {
      await axios.delete(`http://localhost:8080/products/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      console.log("successfully deleted");
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
        <div>Are you sure you want to delete this ${id} product?</div>
        <button onClick={handleNoButton}>No</button>
        <button onClick={handleYesButton}>Yes</button>
      </Modal>
    </div>
  );
};
