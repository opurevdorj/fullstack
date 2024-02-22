import React, { useState } from "react";
import { Modal } from "../../components/modal";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";
import { uploadImage } from "../../utils/utils";
import { Image } from "antd";

export const ProfileEditModal = (props) => {
  const { open, handleClose } = props;
  const { currentUser } = useUserContext();
  const [inputValue, setInputValue] = useState({
    fullname: currentUser.user.fullname,
    email: currentUser.user.email,
    password: "",
    newFullname: currentUser.user.fullname,
    newEmail: currentUser.user.email,
    newPassword: "",
    userImage: currentUser.user.userImage,
    newUserImage: currentUser.user.userImage,
  });
  const [newImageUrl, setNewImageUrl] = useState("");
  const { UPDATE_USER } = useUserContext();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  console.log(inputValue);

  const handleFileChange = async (e) => {
    const imageUrl = await uploadImage(e.target.files[0]);
    setNewImageUrl(imageUrl);
  };

  const handleCancelButton = () => {
    setInputValue({
      fullname: currentUser.user.fullname,
      email: currentUser.user.email,
      newFullname: currentUser.user.fullname,
      newEmail: currentUser.user.email,
      password: "",
      newPassword: "",
      userImage: currentUser.user.userImage,
      newUserImage: currentUser.user.userImage,
    });
    handleClose();
  };

  const handleSaveButton = async () => {
    const updatedProfile = {
      fullname: inputValue.fullname,
      email: inputValue.email,
      newFullname: inputValue.newFullname,
      newEmail: inputValue.newEmail,
      password: inputValue.password,
      newPassword: inputValue.newPassword,
      userImage: inputValue.userImage,
      newUserImage: newImageUrl,
    };
    try {
      const response = await axios.put(
        // `http://localhost:8080/users/profile`,
        `https://fullstack-backend-5gvr.onrender.com/users/profile`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      const data = await response.data;
      UPDATE_USER(data);
      setInputValue({
        fullname: inputValue.fullname,
        email: inputValue.email,
        newFullname: inputValue.newFullname,
        newEmail: inputValue.newEmail,
        password: "",
        newPassword: "",
        userImage: inputValue.userImage,
        newUserImage: newImageUrl,
      });
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
            name="newFullname"
            type="text"
            value={inputValue.newFullname}
          />
          <input
            className="editAndDeleteInput"
            onChange={handleInput}
            name="newEmail"
            type="text"
            value={inputValue.newEmail}
          />
          <input
            className="editAndDeleteInput"
            onChange={handleInput}
            name="password"
            type="text"
            placeholder="Enter your password"
            value={inputValue.password}
          />
          <input
            className="editAndDeleteInput"
            onChange={handleInput}
            name="newPassword"
            type="text"
            placeholder="Enter your new password"
            value={inputValue.newPassword}
          />
          <input type="file" name="productImage" onChange={handleFileChange} />
          <Image
            height="60px"
            width="60px"
            src={newImageUrl ? newImageUrl : currentUser.user.userImage}
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
