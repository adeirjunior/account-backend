import express from 'express';
import User from '../db/User';
import { userSchema } from '../schema/joiSchemas';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async (req, res) => {
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password; 

    const salt = bcrypt.genSaltSync(10);
    const hash: string = bcrypt.hashSync(password, salt);

    const joiCheck = userSchema.validate({
        username,
        email,
        password
    });

    const user = new User({
        username: joiCheck.value?.username,
        email: joiCheck.value?.email,
        password: hash  
    });

    try {
        const alredyExist: any = await User.find({ email });
        if (!joiCheck.error) {
            if ( alredyExist[0].email === user.email ) {
                console.log("This account alredy exist");
            } else {
                await user.save();
                console.log("User Saved");
            }
        } else {
            const message = joiCheck.error.details[0].message.replace(/"/g, "");
            console.error(message);
        }
    } catch (err) {
        console.error(err);
    }
});
router.get('/', (req, res) => {
    res.send("Working");
});

export default router;