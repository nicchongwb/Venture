import { prisma } from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import logger from "../../Logger";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
        logger.info('Project created successfully by :' + req.body.email) 
        res.status(200).json({message: "Project Created"})
    } catch(error){
        logger.error('Project creation failed by :' + req.body.email) 
        console.log("Failure: "+ error);
    }
}

