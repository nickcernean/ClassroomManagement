"use client";
import Dialog from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import { CustomModalStyles } from "./CustomModal.styles";
import { ClassroomModule } from "@/types/classroom.types";
import CustomForm from "@/components/Form";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";

interface CustomModalProps {
  onOpen: () => void;
  onClose: () => void;
  open: boolean;
}

const CustomModal = ({ onOpen, onClose, open }: CustomModalProps) => {
  return (
    <Dialog
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
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
          <CustomForm />
        </Box>
      </Fade>
    </Dialog>
  );
};

export default CustomModal;
