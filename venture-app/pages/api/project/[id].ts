import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const projectId = req.query.id
    if(req.method == 'DELETE'){
        const project = await prisma.project.delete({
            where: {
                id: Number(projectId)
            }
        })
        res.json(project)
    }else{
        console.log("Failure: Note could not be deleted!");
    }
}

