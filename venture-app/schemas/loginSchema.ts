import { array, number, object, string, TypeOf } from 'yup';

export const loginSchema = object({
    email: string().required().email(),
    password: string().required().min(8).max(25).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]+$/),
    mfa: string().required(),
    csrf_token: string().required()
})

export type Login = TypeOf<typeof loginSchema>;