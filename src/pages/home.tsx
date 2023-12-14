import { useState } from "react";
import ApplicationLayout from "@/components/Layout/ApplicationLayout/ApplicationLayout";
import ApplicationConfig from "@/components/Layout/ApplicationConfig";
import { Button, Box } from "@mui/material";
import ClassRoomTable from "@/components/Table/ClassroomTable";
import CustomImage from "@/components/Image/CustomImage";
import CustomModal from "@/components/Modal/CustomModal";
import { getAllClassrooms } from "@/util/service.util";

export default function Home({ classrooms }: any) {
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
          color="success"
          style={{
            position: "relative",
            top: 0,
            left: 10,
            right: 0,
            fontSize: 17,
            margin: "10px",
            zIndex: 1,
          }}
        >
          Create
        </Button>
        <ClassRoomTable classrooms={classrooms} />
      </Box>
      <CustomModal onOpen={handleOpen} onClose={handleClose} open={open} />
    </ApplicationLayout>
  );
}

export async function getServerSideProps() {
  const classrooms = await getAllClassrooms();
  return {
    props: { classrooms },
  };
}
