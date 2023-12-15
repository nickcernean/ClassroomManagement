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
import { getAllStudents, getAllTeachers } from "@/util/service.util";
import { StudentModule } from "@/types/student.type";
import { TeacherModule } from "@/types/teacher.type";
import { ClassroomModule } from "@/types/classroom.types";

const validationSchema = yup.object().shape({
  classroomName: yup.string().required("A classroom name is required"),
  classroomNumber: yup.number().required("A classroom number is required"),
  startsFrom: yup.date().required("A start time is required"),
  teacher: yup.string().required("A teacher is required"),
  students: yup
    .array()
    .min(1, "At least one student is required")
    .max(40, "No more than 40 students are allowed")
    .required("At least one student is required"),
  description: yup.string().required("A description is required"),
});

export default function Create(props: {
  students: StudentModule.Student[];
  teachers: TeacherModule.Teacher[];
}) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 }`}
    >
      <Container maxWidth="md">
        <Box mb={3} p={2}>
          <Typography align="center">
            Submit the form with empty fields to view validation errors.
          </Typography>
        </Box>
        <Formik
          initialValues={{} as ClassroomModule.Classroom}
          validationSchema={validationSchema}
          onSubmit={(
            values: ClassroomModule.Classroom,
            formikHelpers: FormikHelpers<ClassroomModule.Classroom>
          ) => {
            alert(JSON.stringify(values, null, 2));
            formikHelpers.setSubmitting(false);
          }}
        >
          {(formikProps: FormikProps<ClassroomModule.Classroom>) => (
            <Form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Divider variant="fullWidth" />

                  <Typography variant="subtitle1" fontWeight={"bold"} mt={2}>
                    Classroom details
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={0}>
                <Grid item xl={6} md={4} xs={12}>
                  <Field
                    name="classroomName"
                    label="Name"
                    size="normal"
                    fullWidth
                    component={FormTextField}
                  />
                </Grid>

                <Grid item xl={3} md={4} xs={12}>
                  <Field
                    name="classroomNumber"
                    label="Number"
                    type="number"
                    size="normal"
                    fullWidth
                    component={FormTextField}
                  />
                </Grid>

                <Grid item xl={3} md={4} xs={12}>
                  <Field
                    name="startsFrom"
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
