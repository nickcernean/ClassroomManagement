export declare module TeacherModule {

    type GetTeacherResponse = {
        teachers: Array<Teacher>;
    }
    export type Teacher = {
        id: number;
        label: string;
    }
}