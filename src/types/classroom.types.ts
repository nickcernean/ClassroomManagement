import { Dayjs } from "dayjs";
import { StudentModule } from "./student.type";
import { TeacherModule } from "./teacher.type";
export declare module ClassroomModule {

    export type GetClassroomResponse = {
        classrooms: Classroom[];
    }
    export type Classroom = {
        id: number;
        class: string;
        teachers: TeacherModule.Teacher[];
        roomNumber: number;
        startTime: Dayjs;
        students: StudentModule.Student[];
    }
    export type CreateClassRoomRequest = {
        class: string;
        teacher: string
        roomNumber: number;
        startTime: Dayjs;
        students: string[];
    }
}