import { prisma } from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const{id,title,description, highlights,
        busi_model, image, closingDate,createdAt, updatedAt, email} = req.body
        console.log("req" + req.body)
    try{
        console.log("req" + req.body)
        await prisma.project.update({
            where:{
                id: id
            },
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
        res.status(200).json({message: "Project Edited"})
    } catch(error){
        console.log("Failure: "+ error);
    }
}

