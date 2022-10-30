import { date, object, ref, string, TypeOf } from 'yup';
import  { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import zxcvbnEnPackage from '@zxcvbn-ts/language-en'
import sanitizeHtml from 'sanitize-html';

export const createSchema = object({
    title: string().min(3).max(100).required().transform(
        (title) => title.replace(/\&/gm, ' and ').replace(/[\<\>]/gm, ' ').replace(/[^\S\r\n]+/gm, ' ')
    ),
    description: string().min(3).max(2000).required().transform(
        (title) => title.replace(/\&/gm, ' and ').replace(/[\<\>]/gm, ' ').replace(/[^\S\r\n]+/gm, ' ')
    ),
    highlights: string().min(3).max(2000).required().transform(
        (title) => title.replace(/\&/gm, ' and ').replace(/[\<\>]/gm, ' ').replace(/[^\S\r\n]+/gm, ' ')
    ),
    busi_model: string().min(3).max(2000).required().transform(
        (title) => title.replace(/\&/gm, ' and ').replace(/[\<\>]/gm, ' ').replace(/[^\S\r\n]+/gm, ' ')
    ),
    image: string().transform(
      (image) => image.replace(/[\<\>]/gm, '')
    ),
    closingDate: string().required().matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\s)?[a-zA-Z\d\s\w\:\+\(\)]+$/),
    updatedAt: string().required().matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\s)?[a-zA-Z\d\s\w\:\+\(\)]+$/),
    createdAt: string().required().matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\s)?[a-zA-Z\d\s\w\:\+\(\)]+$/),
    closingDateFill: date(),
    email: string().email()
})

export type Create = TypeOf<typeof createSchema>;