import { useState } from "react";
import ApplicationLayout from "@/components/Layout/ApplicationLayout/ApplicationLayout";
import ApplicationConfig from "@/components/Layout/ApplicationConfig";
import { Button, Box } from "@mui/material";
import ClassRoomTable from "@/components/Table/ClassroomTable";
import CustomImage from "@/components/Image/CustomImage";
import CustomModal from "@/components/Modal/CustomModal";
import { ClassroomModule } from "@/types/classroom.types";
import classroomApiHandler from "./api/classrooms";

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

import fsPromises from "fs/promises";
import path from "path";
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "/data/classrooms.json");
  const jsonData = await fsPromises.readFile(filePath, "utf-8");
  const classrooms = JSON.parse(jsonData);

  return {
    props: { classrooms },
  };
}
