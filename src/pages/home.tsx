import ApplicationLayout from "@/components/Layout/ApplicationLayout/ApplicationLayout";
import ApplicationConfig from "@/components/Layout/ApplicationConfig";
import { Button, Box, Typography, Modal, Backdrop, Fade } from "@mui/material";
import ClassRoomTable from "@/components/Table/ClassroomTable";
import fetcher from "./api/fetcher";
import CustomImage from "@/components/Image/CustomImage";
import { useState } from "react";


export default function Home() {

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
      {/* <Button onClick={handleOpen}>Open modal</Button> */}

    </ApplicationLayout>
  );
}
