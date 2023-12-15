import { useState } from "react";
import ApplicationLayout from "@/components/Layout/ApplicationLayout/ApplicationLayout";
import ApplicationConfig from "@/components/Layout/ApplicationConfig";
import { Button, Grid } from "@mui/material";
import ClassRoomTable from "@/components/Table/ClassroomTable";
import CustomImage from "@/components/Image/CustomImage";
import CustomModal from "@/components/Modal/CustomModal";
import { getAllClassrooms } from "@/util/service.util";
import Link from "next/link";
import { ClassroomModule } from "@/types/classroom.types";

export default function Home({ classrooms }: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <ApplicationLayout
      meta={<ApplicationConfig title="Home" description="Home Page" />}
    >
      <Grid
        container
        style={{ height: "80vh", top: 0, bottom: 0 }}
        position="relative"
      >
  
        <Grid item xs={12} style={{ marginTop: "auto" }}>
          <Link href="/create" color="common.white">
            <Button
              variant="contained"
              color="primary"
              style={{
                color: "black",
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
          </Link>
          <ClassRoomTable classrooms={classrooms} />
        </Grid>
      </Grid>
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
