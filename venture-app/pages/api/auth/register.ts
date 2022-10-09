import {prisma} from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { AccountProps } from "../../account/register"
import argon2 from "argon2";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'})
    }

    // do some server side validation here
    // if bad, then res.json (error messags obj to display)
    // send email to given email
    let error;
    const accountData = JSON.parse(req.body)
    
    //auto generate salt and perform hashing on user password with argon2 library 
    accountData.password = await argon2.hash(accountData.password, {
        type: argon2.argon2id,
        parallelism: 2,
        memoryCost: 2 ** 14,
    });
    console.log(accountData.password)

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