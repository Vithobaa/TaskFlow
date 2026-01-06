import mongoose from 'mongoose';
const userschema=mongoose.Schema(
    {
        name:{type:String,
            required:[true,'Name is required'],
            minLenght:[2,'too low char'],
            maxLength:[25,'too high char'],
        },
        email:{type:String,
            required:[true,'Email is required'],
            unique:true,
        },
        password:{type:String,
            required:[true,'password is required'],
        },
    },
    {timestamps:true}
);
export default mongoose.model('User',userschema);