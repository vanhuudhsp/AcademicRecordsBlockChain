import mongoose from "mongoose";

const schema = new mongoose.Schema({
    firstName:{
        type: String,
        require : true
    },
    lastName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    department:{
        type: String,
        require: true
    },
    position:{
        type: String,
        require: true
    },
    image:{
        type: String,
    },
    role:{
        type: String,
        require: true
    }
},
    {timestamps: true}
)

export const UserModel = mongoose.model('User', schema);
