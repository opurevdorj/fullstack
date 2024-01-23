import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { ProfileEditModal } from "./ProfileEditModal";
import { Avatar, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Meta } = Card;

export const Profile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const { currentUser } = useUserContext();
  console.log(currentUser);
  return (
    <div id="container" >
      <div id="subContainer" >
        <Card
          style={{ width: 500, height: 400, marginTop: 16,}}
          actions={[<EditOutlined key="edit" style={{color: "#097969" }} onClick={handleOpen}/>]}
        >
          <Meta style={{marginBottom: 50}}
            avatar={
              <Avatar style={{width: 100, height: 100 }} src={currentUser.user.userImage} />
            }
            title="My Profile"
            description= "Contact information"
          />
          <div style={{height: 150}}>
          <p>Profile name: {currentUser.user.fullname}</p>
          <p> Email address: {currentUser.user.email}</p>
          </div> 
        </Card>
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

// <div id="inputContainer">
//   <Image
//     height="100px"
//     width="100px"
//     src={currentUser.user.userImage}
//   />
//   <div className="inputNames">
//     Profile name: {currentUser.user.fullname}
//   </div>
//   <div className="inputNames">
//     Email address: {currentUser.user.email}
//   </div>
// </div>
// <div>
//   <button onClick={handleOpen}>Edit</button>
// </div>
// <div>
//   <Link style={{ color: " #097969" }} to="/">
//     Back
//   </Link>
// </div>
