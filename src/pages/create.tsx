import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { FormTextField } from "@/components/Form/perequisites/FormTextField";
import * as yup from "yup";
import { TimeSelector } from "@/components/Form/perequisites/TimeSelector";
import dayjs, { Dayjs } from "dayjs";
import { AutocompleteSelector } from "@/components/Form/perequisites/AutoCompleteSelector";
import {
  createClassRoom,
  getAllStudents,
  getAllTeachers,
} from "@/util/service.util";
import { StudentModule } from "@/types/student.type";
import { TeacherModule } from "@/types/teacher.type";
import { ClassroomModule } from "@/types/classroom.types";
import { useRouter } from "next/router";
const validationSchema = yup.object().shape({
  class: yup.string().required("A classroom name is required"),
  roomNumber: yup.number().required("A classroom number is required"),
  startTime: yup.date().required("A start time is required"),
  teacher: yup.string().required("A teacher is required"),
  students: yup
    .array()
    .min(1, "At least one student is required")
    .max(40, "No more than 40 students are allowed")
    .required("At least one student is required"),
});

export default function Create(props: {
  students: StudentModule.Student[];
  teachers: TeacherModule.Teacher[];
}) {
  const router = useRouter();
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 }`}
    >
      <Container maxWidth="md">
        <Box mb={3} p={2}>
          <Typography align="center">
            Submit the details of the classroom you want to create
          </Typography>
        </Box>
        <Formik
          initialValues={
            {
              class: "",
              roomNumber: 100,
              teacher: "",
              students: [],
              startTime: dayjs("2021-10-10T09:00:00.000Z"),
            } as ClassroomModule.CreateClassRoomRequest
          }
          validationSchema={validationSchema}
          onSubmit={async (
            values: ClassroomModule.CreateClassRoomRequest,
            formikHelpers: FormikHelpers<ClassroomModule.CreateClassRoomRequest>
          ) => {
            try {
              const createClasRoomRequest: ClassroomModule.CreateClassRoomRequest =
                {
                  class: values.class,
                  roomNumber: values.roomNumber,
                  teacher: values.teacher,
                  startTime: values.startTime,
                  students: values.students,
                };
              const res = await createClassRoom(createClasRoomRequest);
              router.push('/');
            } catch (error) {
              console.log(error);
            }
            formikHelpers.setSubmitting(false);
          }}
        >
          {(
            formikProps: FormikProps<ClassroomModule.CreateClassRoomRequest>
          ) => (
            <Form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Divider variant="fullWidth" />

                  <Typography variant="subtitle1" fontWeight={"bold"} mt={2}>
                    {/* Classroom details
                    {formikProps.errors && (
                      <Typography color='error'>
                        {JSON.stringify(formikProps.errors, null, 2)}
                      </Typography>
                    )} */}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={0}>
                <Grid item xl={6} md={4} xs={12}>
                  <Field
                    name="class"
                    label="Name"
                    size="normal"
                    fullWidth
                    component={FormTextField}
                  />
                </Grid>

                <Grid item xl={3} md={4} xs={12}>
                  <Field
                    name="roomNumber"
                    label="Number"
                    type="number"
                    size="normal"
                    fullWidth
                    component={FormTextField}
                  />
                </Grid>

                <Grid item xl={3} md={4} xs={12}>
                  <Field
                    name="startTime"
                    label="Starts at"
                    size="normal"
                    fullWidth
                    component={TimeSelector}
                  ></Field>
                </Grid>
              </Grid>

              <Grid container mt={3}>
                <Grid item xs={12}>
                  <Field
                    name="teacher"
                    label="Teacher"
                    size="normal"
                    options={props.teachers}
                    disableClearable
                    component={AutocompleteSelector}
                  ></Field>
                </Grid>
              </Grid>

              <Grid container mt={3}>
                <Grid item xs={12}>
                  <Field
                    multiple
                    filterSelectedOptions
                    name="students"
                    label="Students"
                    size="normal"
                    options={props.students}
                    component={AutocompleteSelector}
                  ></Field>
                </Grid>
              </Grid>

              <Grid container mt={3}>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="outlined"
                    size="large"
                    color="primary"
                    disabled={formikProps.isSubmitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </main>
  );
}
export async function getServerSideProps() {
  const students = await getAllStudents();
  const teachers = await getAllTeachers();
  return {
    props: { students, teachers },
  };
}
