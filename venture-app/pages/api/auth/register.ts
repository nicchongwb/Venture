import {prisma} from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { AccountProps } from "../../account/register"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'})
    }

    // do some server side validation here
    // if bad, then res.json (error messags obj to display)
    // send email to given email
    let error;
    const accountData = JSON.parse(req.body)
    try{
        const savedAccount = await prisma.user.create({
            data: accountData
        })
        res.json(200);
    } catch (e) {
        error = "Email already exists"
        res.json(error);
    }  
}