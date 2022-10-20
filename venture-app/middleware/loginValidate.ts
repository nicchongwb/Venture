import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';



export function validate(schema: OptionalObjectSchema<ObjectShape>, handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (['POST'].includes(req.method as string)){
            // console.log(req.body)
            try {
                req.body = await schema.validate(req.body, { strict: true });
                console.log('HI');
            } catch(error) {
                console.log("error: ")
                return res.status(400).json(error);
            }
        }
        return handler(req, res);
    }
}