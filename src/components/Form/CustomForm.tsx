import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { FormTextField } from "./perequisites/FormTextField";
import * as yup from "yup";
import { TimeSelector } from "./perequisites/TimeSelector";
import { AutocompleteSelector } from "./perequisites/AutoCompleteSelector";
import { ClassroomModule } from "@/types/classroom.types";
import { TeacherModule } from "@/types/teacher.type";
import { StudentModule } from "@/types/student.type";
export interface Teacher {
  label: string;
  id: number;
}

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
});

const teacherOptions: TeacherModule.Teacher[] = [
  {
    "label": "Grace Brown",
    "id": 296
  },
  {
    "label": "Ivy Wilson",
    "id": 543
  },
  {
    "label": "Jack Taylor",
    "id": 757
  },
];

const studentOptions: StudentModule.Student[] = [
  {
    "label": "Isabella Wilson",
    "id": 634,
    "rank": "A+",
    "gender": "Male"
  },
  {
    "label": "Mia Davis",
    "id": 997,
    "rank": "A-",
    "gender": "Female"
  },
  {
    "label": "Isabella Jones",
    "id": 509,
    "rank": "B",
    "gender": "Male"
  },
];

const CustomForm = async () => {
  return (
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
              <Grid item xs={12}>
                <Field
                  name="class"
                  label="Name"
                  size="normal"
                  fullWidth
                  component={FormTextField}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={0}>
              <Grid item xs={12}>
                <Field
                  name="roomNumber"
                  label="Number"
                  type="number"
                  size="normal"
                  fullWidth
                  component={FormTextField}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={0}>
              <Grid item xs={12}>
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
                  options={teacherOptions}
                  disableClearable
                  component={AutocompleteSelector}
                />
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
                  options={studentOptions}
                  component={AutocompleteSelector}
                />
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
  );
};

export default CustomForm;
