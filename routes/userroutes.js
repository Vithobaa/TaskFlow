import express from 'express';
import protect from '../middleware/authmiddleware.js';

const userrouter=express.Router();

import { registerUser,loginUser,currentUser } from '../controller/usercontroller.js';

userrouter.post('/register',registerUser);

userrouter.post('/login',loginUser);

userrouter.get('/current',protect,currentUser);

export default userrouter;