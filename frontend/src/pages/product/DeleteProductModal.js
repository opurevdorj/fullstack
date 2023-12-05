import React from "react";
import { Modal } from "../../components/modal";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


export const DeleteProductModal = (props) => {
    const { openDelete, handleCloseDelete, product } = props;
    const {id} = useParams()
    const navigate = useNavigate()

    const handleYesButton = async () => {
   try { await axios.delete(`http://localhost:8080/products/${id}`)
      console.log("successfully deleted");
      navigate("/products"); 
   } catch(err) {
    console.log(err);
  }
    }
  
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
