import {queryFabric} from "../fabric/index.js";
import constants from "../constants.js";
export const createScore = async (req, res) => {
    try {
        const {userLogin,newScore} = req.body;
        //console.log("[server-createStudent-userLogin]",userLogin);
        //console.log("[server-createCourse-newStudent]",newCourse);
        await queryFabric(userLogin,newScore, constants.createScore);
        const {studentID, courseID,grade,lecturer} = newScore;
        res.status(200).json({
            Key: studentID,
            Record: {
                studentID, courseID,grade,lecturer,
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
};
export const updateScore = async (req, res) => {
    try {
        const {userLogin,newCourse} = req.body;
        //console.log("[server-createStudent-userLogin]",userLogin);
        console.log("[server-updateCourse-newStudent]",newCourse);
        await queryFabric(userLogin,newCourse, constants.updateCourse);
        const {courseID, courseName,totalCredits} = newCourse;
        res.status(200).json({
            Key: courseID,
            Record: {
                courseID, courseName,totalCredits,
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
};

export const queryScoreByLecturer = async (req, res) => {
    try {
        const userLogin = req.body;
        const data = await queryFabric(userLogin,null,constants.queryScoreByLecturer);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({error: err});
        console.log(err);
    }
};
export const queryAllScore = async (req, res) => {
    try {
        const userLogin = req.body;
        const data = await queryFabric(userLogin,null,constants.queryAllScore);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({error: err});
        console.log(err);
    }
};

export const queryScoreByStudentID = async (req, res) => {
    try {
        const userLogin = req.body;
        const data = await queryFabric(userLogin,null,constants.queryScoreByStudentID);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({error: err});
        console.log(err);
    }
};