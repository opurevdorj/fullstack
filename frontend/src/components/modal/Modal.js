import { Box, Modal as MuiModal } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Modal = (props) => {
  const { open, handleClose, children } = props;
  return (
    <div>
      <MuiModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal--modal-description"
      >
        <Box sx={style}>{children}</Box>
      </MuiModal>
    </div>
  );
};
