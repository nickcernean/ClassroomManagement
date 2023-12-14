// CustomModal.js
import React, { forwardRef, useState, useContext } from "react";
("use client");
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import { CustomModalStyles } from "./CustomModal.styles";

interface CustomModalProps {
  onOpen?: () => void;
}


const CustomModal = ({ onOpen }: CustomModalProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={CustomModalStyles}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
