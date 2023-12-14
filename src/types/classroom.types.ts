import { CharactersModule } from ".";
export declare module ClassroomModule {

    export type GetClassroomResponse = {
        classrooms: Classroom[];
    }
    export type Classroom = {
        id: number;
        class: string;
        teacher: string;
        roomNumber: number;
        startTime: string;
        students: CharactersModule.Character[];
    }
}