import {queryFabric} from "../fabric/index.js";
import constants from "../constants.js";
export const createDegree = async (req, res) => {
    try {
        const {userLogin,newDegree} = req.body;
        //console.log("[server-createStudent-userLogin]",userLogin);
        //console.log("[server-createCourse-newStudent]",newCourse);
        await queryFabric(userLogin,newDegree, constants.createDegree);
        res.status(200).json({
            Key: newDegree.degreeID,
            Record: newDegree,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
};
export const updateDegree = async (req, res) => {
    try {
        const {userLogin,newDegree} = req.body;
        //console.log("[server-createStudent-userLogin]",userLogin);
        //console.log("[server-updateCourse-newStudent]",newCourse);
        await queryFabric(userLogin,newDegree, constants.updateDegree);
        //const {courseID, courseName,totalCredits} = newCourse;
        res.status(200).json({
            Key: newDegree.courseID,
            Record: newDegree,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
};
export const signDegree = async (req, res) => {
    try {
        const {userLogin,degreeID, signerNew } = req.body;
        //console.log("[server-createStudent-userLogin]",userLogin);
        //console.log("[server-updateCourse-newStudent]",newCourse);
        await queryFabric(userLogin,{degreeID, signerNew}, constants.signDegree);
        //const {courseID, courseName,totalCredits} = newCourse;
        res.status(200).json({
            userLogin,degreeID, signerNew,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
};

export const queryAllDegreeByCreated = async (req, res) => {
    try {
        const userLogin = req.body;
        console.log(userLogin);
        const data = await queryFabric(userLogin,null,constants.queryAllDegreeByCreated);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({error: err});
        console.log(err);
    }
};
export const queryAllDegreeSign = async (req, res) => {
    try {
        const userLogin = req.body;
        const data = await queryFabric(userLogin,null,constants.queryAllDegreeSign);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({error: err});
        console.log(err);
    }
};

export const queryAllDegreeByStudentID = async (req, res) => {
    try {
        const {userLogin,studentID} = req.body;
        const data = await queryFabric(userLogin,studentID,constants.queryAllDegreeByStudentID);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({error: err});
        console.log(err);
    }
};