import React, { useState } from "react";
import { Modal } from "../../components/modal";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";

export const ProfileEditModal = (props) => {
  const { open, handleClose} = props;
  const { currentUser } = useUserContext();
  const [inputValue, setInputValue] = useState({
    fullname: currentUser.user.fullname,
    email: currentUser.user.email,
    password: "",
    newFullname: "",
    newEmail: "",
    newPassword: "",
  });

  const { UPDATE_USER } = useUserContext();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  console.log(inputValue);

  const handleCancelButton = () => {
    setInputValue({
      fullname: currentUser.user.fullname,
      email: currentUser.user.email,
    });
    handleClose();
  };

  const handleSaveButton = async () => {
    const updatedProfile = {
      fullname: inputValue.fullname,
      email: inputValue.email,
    };
    try {
      const response = await axios.put(
        `http://localhost:8080/users/profile`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      const data = await response.data;
      UPDATE_USER(data);

      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal open={open} handleClose={handleClose}>
        <div style={{ color: "#097969;", fontSize: "20px" }}>Edit Profile</div>
        <div className="createInput">
          <input
            className="editAndDeleteInput"
            onChange={handleInput}
            name="fullname"
            type="text"
            value={inputValue.fullname}
          />
          <input
            className="editAndDeleteInput"
            onChange={handleInput}
            name="email"
            type="text"
            value={inputValue.email}
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
