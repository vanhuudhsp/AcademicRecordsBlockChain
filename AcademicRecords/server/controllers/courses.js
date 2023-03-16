import {queryFabric} from "../fabric/index.js";
import constants from "../constants.js";
export const createCourse = async (req, res) => {
    try {
        const {userLogin,newCourse} = req.body;
        //console.log("[server-createStudent-userLogin]",userLogin);
        //console.log("[server-createCourse-newStudent]",newCourse);
        await queryFabric(userLogin,newCourse, constants.createCourse);
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
export const updateCourse = async (req, res) => {
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

export const queryAllCourses = async (req, res) => {
    try {
        const userLogin = req.body;
        const data = await queryFabric(userLogin,null,constants.queryAllCourse);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({error: err});
        console.log(err);
    }
};