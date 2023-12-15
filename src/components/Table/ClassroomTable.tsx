import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ClassroomModule } from "@/types/classroom.types";
import { deleteClassroom } from "@/util/service.util";
import dayjs from "dayjs";

function Row(props: {
  row: ClassroomModule.Classroom;
}) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const handleDeleteClick = (id: number) => deleteClassroom(id);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.class}
        </TableCell>
        <TableCell align="right">{row.teachers[0].label}</TableCell>
        <TableCell align="right">{row.roomNumber}</TableCell>
        <TableCell align="right">
          {dayjs(row.startTime).format("HH:mm")}
        </TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => console.log('clicked')}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            color="error"
            onClick={() => handleDeleteClick(row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Students
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Student Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Gender</TableCell>
                    <TableCell align="center">Rank</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.students.map((studentRow) => (
                    <TableRow key={studentRow.id}>
                      <TableCell component="th" scope="row">
                        {studentRow.id}
                      </TableCell>
                      <TableCell>{studentRow.label}</TableCell>
                      <TableCell align="center">{studentRow.gender}</TableCell>
                      <TableCell align="center">{studentRow.rank}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

type ClassroomTableProps = {
  classrooms: ClassroomModule.Classroom[];
};

export default function ClassRoomTable({
  classrooms,
}: ClassroomTableProps) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Class</TableCell>
              <TableCell align="right">Teacher</TableCell>
              <TableCell align="right">Room Number</TableCell>
              <TableCell align="right">Start Time</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classrooms.map((classroom) => (
              <Row key={classroom.id} row={classroom} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
