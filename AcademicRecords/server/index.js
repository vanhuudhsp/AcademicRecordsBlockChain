import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import users from './routers/users.js';
import students from './routers/students.js';
import courses from './routers/courses.js';
import scores from'./routers/scores.js';
import degrees from './routers/degrees.js';
import mongoose from "mongoose";
import { UserModel } from "./models/UserModel.js";
import crypto from 'crypto';
import { createUserAdmin, createUserFabric, queryFabric} from "./fabric/index.js";
import {Users, Students, Courses} from "./Data.js";
import constants from "./constants.js";
// import fs from  'fs';
// fs.rmdirSync('wallet', { recursive: true, force: true });

const app =  express();
const PORT = process.env.PORT||5000;
const URI = 'mongodb+srv://admin:8CYk8CFmdT7N9g4Y@cluster0.uqcovlz.mongodb.net/?retryWrites=true&w=majority';
app.use(bodyParser.json({limit:'30mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors());

app.use('/users', users);
app.use('/students', students);
app.use('/courses', courses);
app.use('/scores', scores);
app.use('/degrees', degrees);

mongoose
    .connect(URI,{ useNewUrlParser: true, useUnifiedTopology : true})
    .then( () => 
    {
        console.log('Connected to DB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch ( (err) => 
    {
        console.log('err' , err);
    });

const createUsers = async()=>
    Users.forEach(async(user)=>
    {
        await createUserFabric( 
            {email: 'admin',},user);
        let newUser = new UserModel(user);
        //console.log(userAdmin);
        newUser.save();
    });

const createStudents = async()=>
    Students.forEach(async(student)=>{
    await queryFabric( {
        email: 'phuongnch@tdmu.edu.vn',
    },student, constants.createStudent);
}); 
const createCourses = async()=>
    Courses.forEach(async(course)=>{
        await queryFabric( {
            email: 'phuongnch@tdmu.edu.vn',
        },course, constants.createCourse);
});
const createData = async()=>
{
    try {
        let userAdmin = await UserModel.findOne({email: 'admin'});
        if( userAdmin == null){
            await createUserAdmin('admin');
            userAdmin = new UserModel(
            {
                firstName: 'Huu',
                lastName: 'Tran Van',
                email: 'admin',
                password: crypto.createHash('md5').update('1').digest('hex'),
                department: 'tdmu',
                position:'admin',
                image:'',
                role: 'admin'
            } );
            //console.log(userAdmin);
            await userAdmin.save();
            await createUsers();

            let user={
                firstName: 'Phuong',
                lastName: 'Nguyen Cao Hoai',
                email: 'phuongnch@tdmu.edu.vn',
                password:crypto.createHash('md5').update('1').digest('hex'),
                department: 'Trainning department',
                position: 'Expert',
                image: '',
                role:'client',
            };
            await createUserFabric( 
                {email: 'admin',}, user
            );
            let newUser = new UserModel(user);
            //console.log(userAdmin);
            newUser.save();
            await createStudents();
            await createCourses();
        }    
    } catch (error) {
        console.log(error);
    }
}
createData();

   