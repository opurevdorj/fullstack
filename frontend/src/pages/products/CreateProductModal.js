import React, { useState } from "react";
import { Modal } from "../../components/modal";
import * as yup from "yup";
import axios from "axios";
import { UserContext, useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";
import { Radio } from "antd";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../components/firebase/myfirebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadImage } from "../../utils/utils";

const validateForm = yup.object().shape({
  name: yup.string().min(4, "Must be more than 4 characters").required(),

  description: yup
    .string()
    .required(),
  price: yup.number().required(),
  category: yup.string().max(20, "Must be less than 20 characters").required(),
});

const plainOptions = ["public", "private"];

export const CreateProductModal = (props) => {
  const { CREATE_PRODUCT } = useProductContext();
  const { open, handleClose } = props;
  const [file, setFile] = useState();

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    type: "public",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    required: "",
  });
  console.log(formValues);
  const { currentUser } = useUserContext();

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    yup
      .reach(validateForm, inputName)
      .validate(inputValue)
      .then((res) => {
        setFormValues({ ...formValues, [inputName]: inputValue });
        setFormErrors({ ...formErrors, [inputName]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [inputName]: err.message });
      });

    setFormValues({ ...formValues, [inputName]: inputValue });
  };

  const onChangeType = ({ target: { value } }) => {
    setFormValues({ ...formValues, type: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // console.log(URL.createObjectURL(e.target.files[0]));
  };

  const handleSaveButton = async () => {
    try {
      if (file === undefined) {
        setFormErrors({
          ...formErrors,
          productImage: "Must add file",
        });
      } else if (
        // checks if any inputs are empty
        // formValues.image === "" ||
        formValues.name === "" ||
        formValues.description === "" ||
        formValues.price === "" ||
        formValues.category === ""
      ) {
        setFormErrors({
          ...formErrors,
          required: "All inputs must be required",
        });
      } else if (
        // checks if there is any errors
        // formErrors.image !== "" ||
        formErrors.name !== "" ||
        formErrors.description !== "" ||
        formErrors.price !== "" ||
        formErrors.category !== ""
      ) {
        setFormErrors({ ...formErrors, required: "All error must be cleared" });
      } else {
        const imageUrl = await uploadImage(file);
        const response = await axios.post(
          `http://localhost:8080/products`,
          { ...formValues, productImage: imageUrl },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        console.log(response);
        const data = await response.data;
        CREATE_PRODUCT(data);

        setFormValues({ name: "", description: "", price: "", category: "" });
        handleClose();
        toast("Successfully created product", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      setFormErrors({ ...formErrors, required: error.message });
    }
  };

  const handleCancelButton = () => {
    setFormValues({ name: "", description: "", price: "", category: "" });
    setFormErrors({ name: "", description: "", price: "", category: "" });
    handleClose();
  };

  return (
    <div>
      <Modal open={open} handleClose={handleClose}>
        <div style={{ color: "#097969;", fontSize: "20px", marginBottom: "10px"}}>
          Create product
        </div>
        <div className="createInput">
          <input
            type="file"
            placeholder="Enter your product image"
            name="productImage"
            onChange={handleFileChange}
            // className="createInputs"
          />
          <input
            className="createInputs"
            value={formValues.name}
            name="name"
            onChange={handleChange}
            placeholder="Name"
            type="text"
          />
          <input
            className="createInputs"
            value={formValues.description}
            name="description"
            onChange={handleChange}
            placeholder="Description"
            type="text"
          />
          <input
            className="createInputs"
            value={formValues.price}
            name="price"
            onChange={handleChange}
            placeholder="Price"
            type="text"
          />
          <input
            className="createInputs"
            value={formValues.category}
            name="category"
            onChange={handleChange}
            placeholder="Category"
            type="text"
          />
          <Radio.Group
            options={plainOptions}
            onChange={onChangeType}
            value={formValues.type}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
        <div>{formErrors.required}</div>
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
