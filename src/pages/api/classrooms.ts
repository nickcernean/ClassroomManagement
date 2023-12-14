import { NextApiRequest, NextApiResponse } from 'next';
import { ClassroomModule } from '@/types/classroom.types';
import { classroomRepo } from '@/util/service.util';

const create = (req: NextApiRequest, res: NextApiResponse) => {
    const classroom = req.body as ClassroomModule.Classroom;
    classroomRepo.create(classroom);
    return res.status(200).json({});
};

const update = (req: NextApiRequest, res: NextApiResponse) => {
    const classroom = req.body as ClassroomModule.Classroom;
    classroomRepo.update(classroom.id.toString(), classroom);
    return res.status(200).json({});
};

const _delete = (req: NextApiRequest, res: NextApiResponse) => {
    const classroom = req.body as ClassroomModule.Classroom;
    classroomRepo.delete(classroom.id.toString());
    return res.status(200).json({});
};

const get = () => {
    const classrooms = classroomRepo.getAll();
    return classrooms;
};

const classroomApiHandler = {
    post: create,
    patch: update,
    delete: _delete,
    get,
};

export default classroomApiHandler;
