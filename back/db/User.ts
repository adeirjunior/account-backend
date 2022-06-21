import { Schema, model } from 'mongoose';
import { IUser } from '../types/user';

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = model<IUser>('User', UserSchema);
export default User;