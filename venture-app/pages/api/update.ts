import { prisma } from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { validate } from '../../middleware/updateValidate';
import { updateSchema } from '../../schemas/updateSchema';


// export default withIronSessionApiRoute(updateProject, sessionOptions);
const handler = withIronSessionApiRoute(updateProject, sessionOptions)

async function updateProject(req: NextApiRequest, res: NextApiResponse) {
    const{id,title,description, highlights,
        busi_model, image, closingDate,createdAt, updatedAt, email} = req.body
        console.log("req" + req.body)
        const user = req.session.user
    try{
        console.log("req" + req.body)
        if(user?.email == req.body.email){
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
        }else{
            res.status(500).json({ error: 'user not authenticated to edit' })
        }
        
    } catch(error){
        console.log("Failure: "+ error);
    }
}

export default validate(updateSchema, handler)
