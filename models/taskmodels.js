import mongoose from 'mongoose';
const taskschema=mongoose.Schema({
    taskname:{
        type:String,
        required:[true,'please add a task']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    }
},
    {
        timestamps:true
    }
);
export default mongoose.model('Task',taskschema);