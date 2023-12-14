import ApplicationLayout from "@/components/Layout/ApplicationLayout/ApplicationLayout";
import ApplicationConfig from "@/components/Layout/ApplicationConfig";
import { Button, Grid, Stack } from "@mui/material";
import ClassRoomTable from "@/components/Table/ClassroomTable";
import fetcher from "./api/fetcher";

export default function Home() {
  return (
    <ApplicationLayout
      meta={<ApplicationConfig title="Home" description="Home Page" />}
    >
      <ClassRoomTable />
    </ApplicationLayout>
  );
}
