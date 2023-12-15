import { NextApiRequest, NextApiResponse } from 'next';
import { StudentModule } from '@/types/student.type';
import fsPromises from 'fs/promises';
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data/students.json');

export default async function apiHandler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'GET':
            await get(req, res);
            break;
        default:
            res.status(405).end();
            break;
    }

}


const get = async (req: NextApiRequest, res: NextApiResponse) => {

    const jsonData = await fsPromises.readFile(dataFilePath, 'utf8');
    let students: StudentModule.Student = JSON.parse(jsonData);

    res.status(200).json(students);
};

