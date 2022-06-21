import Joi from 'joi';
import { IUser } from '../types/user';

export const userSchema = Joi.object<IUser>({
        username: Joi.string()
                .alphanum()
                .min(3)
                .max(10)
                .required(),
        email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})
