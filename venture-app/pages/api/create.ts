import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const{title,description,cap_amt, min_amt, highlights, securitytype,
        busi_model, image, closingDate, userId} = req.body

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
                securitytype,
                busi_model, 
                image,
                closingDate,
                userId, 
            }
        })
        res.status(200).json({message: "Project Created"})

    } catch(error){
        console.log("Failure: "+ error);
    }
    
}