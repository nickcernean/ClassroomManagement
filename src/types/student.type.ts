export declare module StudentModule {

    type GetStudentResponse = {
        students: Array<Student>;
    }
    export type Student = {
        id: number;
        label: string;
        rank: string;
        gender: string;
    }
}