import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/usermodel.js';
import expressAsyncHandler from 'express-async-handler';


export const registerUser=expressAsyncHandler(async(req,res)=>{
    
    const {name,email,password}=req.body;
    if(!name||!email||!password){
        res.status(400);
        throw new Error("all fields are mandatory.");
    }

    const userExist=await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("user exist.");
    }


    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(password,salt);

    const user=await User.create({name,email,password:hashedpassword})
    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateJWTtoken(user._id),
        });
    }

    else{
        res.status(400);
        throw new Error("invalid user data");
    }
});

export const loginUser=expressAsyncHandler(async(req,res)=>{

    const{email,password}=req.body;
    const user=await User.findOne({email});

    if(user&&(await bcrypt.compare(password,user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateJWTtoken(user._id),
        });
    }

    else{

        res.status(400);
        throw new Error("invalid data");
    }

    // res.json({message:'user logined successfully'});
});

export const currentUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email
    });
});

const generateJWTtoken = id => jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'5d'});  
