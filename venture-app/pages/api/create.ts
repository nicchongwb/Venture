import { prisma } from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { validate } from '../../middleware/createValidate';
import { createSchema } from '../../schemas/createSchema';


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const{title,description, highlights,
        busi_model, image, closingDate,createdAt, updatedAt, email} = req.body
        console.log("req" + req.body)
    try{
        console.log("req" + req.body)
        await prisma.project.create({
            data: {
                title,
                description,
                highlights, 
                busi_model, 
                image,
                closingDate,
                createdAt,
                updatedAt,
                email, 
            }
        })
        res.status(200).json({message: "Project Created"})
    } catch(error){
        console.log("Failure: "+ error);
    }
}

export default validate(createSchema, handler);
