
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/usermodel.js';

const protect=expressAsyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1];
            const decoder=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decoder.id).select('-password');
            next();
        }catch(error){
            console.log(error);
            res.status(401);
            throw new Error('you are not authorized');
        }
    }
    if(!token){
        res.status(400);
        throw new Error("no authorized no token");
    }
});
export default protect;