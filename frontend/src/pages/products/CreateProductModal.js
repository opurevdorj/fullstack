import React, { useState } from "react";
import { Modal } from "../../components/modal";
import * as yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";

const validateForm = yup.object().shape({
  name: yup.string().min(4, "Must be more than 4 characters").required(),

  description: yup
    .string()
    .max(20, "Must be less than 20 characters")
    .required(),
  price: yup.number().required(),
  category: yup.string().max(20, "Must be less than 20 characters").required(),
});

export const CreateProductModal = (props) => {
  const { open, handleClose } = props;
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    required: "",
  });

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

  const handleSaveButton = async () => {
    try {
      if (
        // checks if any inputs are empty
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
        formErrors.name !== "" ||
        formErrors.description !== "" ||
        formErrors.price !== "" ||
        formErrors.category !== ""
      ) {
        setFormErrors({ ...formErrors, required: "All error must be cleared" });
      } else {
        const response = await axios.post(
          `http://localhost:8080/products`,
          formValues
        );
        const data = await response.data;
        setFormValues(data);

        setFormValues({ name: "", description: "", price: "", category: "" });
        handleClose();
        window.location.reload();
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
        <div>Create product</div>
        <div className="createInput">
          <input
            value={formValues.name}
            name="name"
            onChange={handleChange}
            placeholder="Name"
            type="text"
          />
          <input
            value={formValues.description}
            name="description"
            onChange={handleChange}
            placeholder="Description"
            type="text"
          />
          <input
            value={formValues.price}
            name="price"
            onChange={handleChange}
            placeholder="Price"
            type="text"
          />
          <input
            value={formValues.category}
            name="category"
            onChange={handleChange}
            placeholder="Category"
            type="text"
          />
        </div>
        <div>{formErrors.required}</div>
        <button onClick={handleCancelButton}>Cancel</button>
        <button onClick={handleSaveButton}>Save</button>
      </Modal>
    </div>
  );
};