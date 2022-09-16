import { prisma } from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const{title,description,cap_amt, min_amt, highlights,
        busi_model, image, closingDate, email} = req.body
        console.log("req" + req.body)
    try{
        console.log("req" + req.body)
        await prisma.project.create({
            data: {
                title,
                description,
                cap_amt, 
                min_amt, 
                highlights, 
                busi_model, 
                image,
                closingDate,
                email, 
            }
        })
        res.status(200).json({message: "Project Created"})
    } catch(error){
        console.log("Failure: "+ error);
    }
}

