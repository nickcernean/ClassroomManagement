import { NextApiRequest, NextApiResponse } from 'next';
import { ClassroomModule } from '@/types/classroom.types';
import fsPromises from 'fs/promises';
import path from 'path'
import { deleteClassroom } from "@/util/service.util";

const dataFilePath = path.join(process.cwd(), 'data/classrooms.json');

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
    const { classroom } = req.body;

    const jsonData = await fsPromises.readFile(dataFilePath, 'utf8');
    const classRooms: ClassroomModule.Classroom[] = JSON.parse(jsonData);

    classroom.id = classRooms.length ? Math.max(...classRooms.map(x => x.id)) + 1 : 1;
    classRooms.push(classroom);

    const updatedData = JSON.stringify(classRooms, null, 2);
    await fsPromises.writeFile(dataFilePath, updatedData);

    res.status(200).json(classRooms);
};
