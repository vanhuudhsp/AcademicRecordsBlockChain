import mongoose from "mongoose";

const schema = new mongoose.Schema({
    fullName:{
        type: String,
        require : true
    },
    dateOfBirth:{
        type: String,
        require: true
    },
    gender:{
        type: String,
        require: true
    },
    status:{
        type: String,
        require: true
    },
    className:{
        type: String,
        require: true
    },
    department:{
        type: String,
        require: true
    },
    trainingSystem:{
        type: String,
        require: true
    },
    branch:{
        type: String,
        require: true
    },
    shoolYear:{
        type: String,
        require: true
    },
    idNumber:{
        type: String,
        require: true
    },
    dateOfIssue:{
        type: String,
        require: true
    },
    placeOfIssue:{
        type: String,
        require: true
    },
},
    {timestamps: true}
)

export const StudentModel = mongoose.model('Student', schema);
