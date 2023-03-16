import {queryFabric} from "../fabric/index.js";
import constants from "../constants.js";
export const createStudent = async (req, res) => {
    try {
        const {userLogin,newStudent} = req.body;
        //console.log("[server-createStudent-userLogin]",userLogin);
        //console.log("[server-createStudent-newStudent]",newStudent);
        await queryFabric(userLogin,newStudent, constants.createStudent);
        const {studentID,fullName, dateOfBirth, gender, phone, email, status, 
            className,department, majors, shoolYear, totalCredits,accumulatedCredits,
            idNumber, dateOfIssue, placeOfIssue, image} = newStudent;
        res.status(200).json({
            Key: studentID,
            Record: {
                studentID,fullName, dateOfBirth, gender, phone, email, status, 
                className,department, majors, shoolYear, totalCredits,accumulatedCredits,
                idNumber, dateOfIssue, placeOfIssue, image,
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
};

export const updateStudent = async (req, res) => {
    try {
        const {userLogin,newStudent} = req.body;
        console.log("[server-updateStudent-userLogin]",userLogin);
        console.log("[server-updateStudent-newStudent]",newStudent);
        await queryFabric(userLogin,newStudent, constants.updateStudent);
        const {studentID,fullName, dateOfBirth, gender, phone, email, status, 
            className,department, majors, shoolYear, totalCredits,accumulatedCredits,
            idNumber, dateOfIssue, placeOfIssue, image} = newStudent;
        res.status(200).json({
            Key: studentID,
            Record: {
                studentID,fullName, dateOfBirth, gender, phone, email, status, 
                className,department, majors, shoolYear, totalCredits,accumulatedCredits,
                idNumber, dateOfIssue, placeOfIssue, image,
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
};

export const queryAllStudents = async (req, res) => {
    try {
        const userLogin = req.body;
        const data = await queryFabric(userLogin,null,constants.queryAllStudent);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({error: err});
        console.log(err);
    }
};
