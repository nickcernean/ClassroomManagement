import { ClassroomModule } from "@/types/classroom.types";


export async function getAllClassrooms() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/classrooms`,
        {
            method: "GET",
        }
    );
    const classrooms = await response.json();
    return classrooms;
}


export async function updateClassroom(classroom: ClassroomModule.Classroom) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/classrooms`,
        {
            method: "PATCH",
        }
    );
    const classrooms = await response.json();
    return classrooms;
}

export async function deleteClassroom(id: number) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/classrooms?classroomId=${id}`,
        {
            method: "DELETE",
        }
    );
    const classrooms = await response.json();
    return classrooms;
}
