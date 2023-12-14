import { useState } from "react";
import ApplicationLayout from "@/components/Layout/ApplicationLayout/ApplicationLayout";
import ApplicationConfig from "@/components/Layout/ApplicationConfig";
import { Button, Box } from "@mui/material";
import ClassRoomTable from "@/components/Table/ClassroomTable";
import CustomImage from "@/components/Image/CustomImage";
import CustomModal from "@/components/Modal/CustomModal";
export default function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <ApplicationLayout
      meta={<ApplicationConfig title="Home" description="Home Page" />}
    >
      <CustomImage
        className="mx-auto"
        src="rectangle.svg"
        variant="extra-large"
        alt="rectangle"
      />
      <Box position="relative">
        <Button
          onClick={handleOpen}
          variant="contained"
          color="primary"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            margin: "8px",
            zIndex: 1,
          }}
        >
          Create
        </Button>
        <ClassRoomTable />
      </Box>
      <CustomModal onOpen={handleOpen} onClose={handleClose} open={open} />
    </ApplicationLayout>
  );
}
