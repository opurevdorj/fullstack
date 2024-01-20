import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { ProfileEditModal } from "./ProfileEditModal";
import { Image } from "antd";

export const Profile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const { currentUser } = useUserContext();
  console.log(currentUser);
  return (
    <div id="container">
      <div id="subContainer">
        <div id="title">My profile </div>

        <div id="inputContainer">
          <Image
            height="100px"
            width="100px"
            src={currentUser.user.userImage}
          />
          <div className="inputNames">
            Profile name: {currentUser.user.fullname}
          </div>
          <div className="inputNames">
            Email address: {currentUser.user.email}
          </div>
        </div>
        <div>
          <button onClick={handleOpen}>Edit</button>
        </div>
        <div>
          <Link style={{ color: " #097969" }} to="/">
            Back
          </Link>
        </div>
      </div>
      <ProfileEditModal
        open={open}
        handleClose={handleClose}
        currentUser={currentUser}
      />
    </div>
  );
};
