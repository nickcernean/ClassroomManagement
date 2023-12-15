import { NextApiRequest, NextApiResponse } from 'next';
import { ClassroomModule } from '@/types/classroom.types';
import fsPromises from 'fs/promises';
import path from 'path'
import { TeacherModule } from '@/types/teacher.type';
import { StudentModule } from '@/types/student.type';

const dataFilePath = path.join(process.cwd(), 'data/classrooms.json');
const studentsDataFilePath = path.join(process.cwd(), 'data/students.json');
const teachersDataFilePath = path.join(process.cwd(), 'data/teachers.json');

export default async function apiHandler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'GET':
            await get(req, res);
            break;
        case 'DELETE':
            await _delete(req, res);
            break;
        case 'PATCH':
            await patch(req, res);
            break;
        case 'POST':
            await post(req, res);
            break;
        default:
            res.status(405).end();
            break;
    }

}

const _delete = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { classroomId } = req.query;

        if (!classroomId || isNaN(Number(classroomId))) {
            return res.status(400).json({ error: 'Invalid classroomId' });
        }
        const jsonData = await fsPromises.readFile(dataFilePath, 'utf8');

        let classRooms: ClassroomModule.Classroom[] = JSON.parse(jsonData);

        classRooms = classRooms.filter((classroom) => classroom.id !== Number(classroomId));

        const updatedData = JSON.stringify(classRooms, null, 2);

        await fsPromises.writeFile(dataFilePath, updatedData);

        res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (error) {
        console.error(error);
        // Send an error response
        res.status(500).json({ message: 'Error storing data' });
    }
};

const get = async (req: NextApiRequest, res: NextApiResponse) => {
    const { classroomId } = req.query;
    const jsonData = await fsPromises.readFile(dataFilePath, 'utf8');
    let classRooms: ClassroomModule.Classroom[] = JSON.parse(jsonData);
    if (classroomId) {
        const classRoom: ClassroomModule.Classroom | undefined = classRooms.find((classroom) => classroom.id === Number(classroomId));
        res.status(200).json(classRoom);
    }
    res.status(200).json(classRooms);
};

const patch = async (req: NextApiRequest, res: NextApiResponse) => {
    const { classroomId } = req.query;
    const { classroom } = req.body;

    const jsonData = await fsPromises.readFile(dataFilePath, 'utf8');
    let classRooms: ClassroomModule.Classroom[] = JSON.parse(jsonData);

    const classroomToUpdate: ClassroomModule.Classroom | undefined = classRooms.find((classroom) => classroom.id !== Number(classroomId));

    if (classroomToUpdate) {
        Object.assign(classroomToUpdate, classroom);

        const updatedData = JSON.stringify(classRooms, null, 2);
        await fsPromises.writeFile(dataFilePath, updatedData);
        res.status(200).json({});
    }

    res.status(404).json("Not Found: Could not found entry");
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
    const classroomRequest = JSON.parse(req.body) as ClassroomModule.CreateClassRoomRequest;

    const jsonData = await fsPromises.readFile(dataFilePath, 'utf8');
    const classRooms: ClassroomModule.Classroom[] = JSON.parse(jsonData);

    const jsonStudentsData = await fsPromises.readFile(studentsDataFilePath, 'utf8');
    let students: StudentModule.Student[] = JSON.parse(jsonStudentsData);

    const jsonTeachersData = await fsPromises.readFile(teachersDataFilePath, 'utf8');
    let teachers: TeacherModule.Teacher[] = JSON.parse(jsonTeachersData);

    // @ts-ignore
    const studentsToAdd = students.filter((student) => classroomRequest.students.includes(student.id));
    const teachersToAdd = teachers.filter((teacher) => teacher.id === Number(classroomRequest.teacher));


    const newClassRoom: ClassroomModule.Classroom = {
        id: classRooms.length ? Math.max(...classRooms.map(x => x.id)) + 1 : 1,
        class: classroomRequest.class,
        roomNumber: classroomRequest.roomNumber,
        startTime: classroomRequest.startTime,
        teachers: teachersToAdd,
        students: studentsToAdd
    };

    classRooms.push(newClassRoom);

    const updatedData = JSON.stringify(classRooms, null, 2);
    await fsPromises.writeFile(dataFilePath, updatedData);

    res.status(200).json(classRooms);
};