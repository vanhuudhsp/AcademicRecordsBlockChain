/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class AcademicRecord extends Contract {

     async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        //console.log(ctx.stub.getTxTimestamp());
        const Students =[
            {
                key: "student"+ctx.stub.getTxTimestamp(),
                studentID:"2024802010378", 
                fullName:"Phạm Minh An", 
                dateOfBirth:"", 
                gender:"male", 
                phone:"0394173864", 
                email:"2024802010378@student.tdmu.edu.vn" , 
                status:"graduated" , 
                className:"D20CNTT02", 
                department:"Institute of Engineering and Technology", 
                majors:"Information Technology", 
                shoolYear:4, 
                totalCredits:150, 
                accumulatedCredits:4,
                idNumber:"", 
                dateOfIssue:"", 
                placeOfIssue:"", 
                image:"",
            }
        ] ;

        const Courses =[
            {
                key: "course"+ctx.stub.getTxTimestamp(),
                courseID:"LING165",
                courseName:"Nguyên lý hệ điều hành (3+1)",
                totalCredits:4,
            }
        ];
        const Scores =[
            {
                key: "score"+ctx.stub.getTxTimestamp(),
                studentID:"2024802010378",
                fullName:"Phạm Minh An", 
                className:"D20CNTT02", 
                courseID:"LING165",
                courseName:"Nguyên lý hệ điều hành (3+1)",
                totalCredits:4,
                grade: 7.5,
                lecturer: "huutv@tdmu.edu.vn",
            }
        ];
        const Degrees =[
            {
                key: "degree"+ctx.stub.getTxTimestamp(),
                degreeID:"degree1",
                degreeName:"Information Technology Engineer", 
                studentID:"2024802010378", 
                degreeDate:"1/1/2023",  
                modeOfStudy:"Full Time", 
                signer:"quangnh@tdmu.edu.vn", 
                image:"",
                createdBy:"quynhtn@tdmu.edu.vn",
            }
        ];

        for (let i = 0; i < Students.length; i++) {
            Students[i].docType = 'student';
            console.log(Students[i].key);
            await ctx.stub.putState(Students[i].key, Buffer.from(JSON.stringify(Students[i])));
            console.info('Added <--> ', Students[i]);
        }
        for (let i = 0; i < Courses.length; i++) {
            Courses[i].docType = 'course';
            console.log(Courses[i].key);
            await ctx.stub.putState(Courses[i].key, Buffer.from(JSON.stringify(Courses[i])));
            console.info('Added <--> ', Courses[i]);
        }
        for (let i = 0; i < Scores.length; i++) {
            Scores[i].docType = 'score';
            console.log(Scores[i].key);
            await ctx.stub.putState(Scores[i].key, Buffer.from(JSON.stringify(Scores[i])));
            console.info('Added <--> ', Scores[i]);
        }
        for (let i = 0; i < Degrees.length; i++) {
            Degrees[i].docType = 'degree';
            console.log(Degrees[i].key);
            await ctx.stub.putState(Degrees[i].key, Buffer.from(JSON.stringify(Degrees[i])));
            console.info('Added <--> ', Degrees[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }
    //Students
    async queryStudent(ctx, studentID) {//edit
        const allResults = [];
        const query = "{\"selector\":{\"studentID\":\""+studentID+"\",\"docType\": \"student\"}}";
        for await (const {key, value} of ctx.stub.getQueryResult(query)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        if (!allResults || allResults.length === 0) {
            throw new Error(`${studentID} does not exist`);
        }
        console.info(allResults[0]);
        return JSON.stringify(allResults[0]);
    }

    async queryAllStudent(ctx) {
        const allResults = [];
        const query = "{\"selector\":{\"docType\":\"student\"}}";
        for await (const {key, value} of ctx.stub.getQueryResult(query)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async createStudent(ctx, studentID,fullName,dateOfBirth,gender,phone,email,status,className,department,majors,shoolYear,totalCredits,accumulatedCredits,idNumber,dateOfIssue,placeOfIssue,image) {
        console.info('============= START : Create Student ===========');
        const student = {
            key: "student"+ctx.stub.getTxTimestamp(),
            studentID,fullName,dateOfBirth,gender,phone,email,
            status,className,department,majors,shoolYear
            ,totalCredits,accumulatedCredits,idNumber,dateOfIssue,placeOfIssue,image,
            docType: 'student',
        };
        await ctx.stub.putState(student.key, Buffer.from(JSON.stringify(student)));
        console.info('============= END : Create Student ===========');
    }
    async updateStudent(ctx,studentID,fullName,dateOfBirth,gender,phone,email,status,className,department,majors,shoolYear,totalCredits,accumulatedCredits,idNumber,dateOfIssue,placeOfIssue,image) {
        console.info('============= START : update Student ===========');
        const student = JSON.parse( await this.queryStudent(ctx, studentID));
        console.log("[updateStudent]",student);
        if (!student) {
            throw new Error(`${studentID} does not exist`);
        }
        const newStudent = {
            key:student.Key,
            studentID,fullName,dateOfBirth,gender,phone,email,status,className,department,majors,shoolYear
            ,totalCredits,accumulatedCredits,idNumber,dateOfIssue,placeOfIssue,image,
            docType: 'student',
        };
        console.log("update Student", newStudent);
        await ctx.stub.putState(newStudent.key, Buffer.from(JSON.stringify(newStudent)));
        console.info('============= END : update Student ===========');
    }

    
    //Courses
    async createCourse(ctx, courseID, courseName, totalCredits) {
        console.info('============= START : Create Course ===========');
        const course = {
            key: "course"+ctx.stub.getTxTimestamp(),
            courseID, courseName, totalCredits,
            docType: 'course',
        };
        await ctx.stub.putState(course.key, Buffer.from(JSON.stringify(course)));
        console.info('============= END : Create Course ===========');
    }
    async updateCourse(ctx, courseID, courseName, totalCredits) {//edit
        console.info('============= START : update Course ===========');
        
        const course = JSON.parse(await this.queryCourse(ctx, courseID));
       
        if (!course) {
            throw new Error(`${courseID} does not exist`);
        }
        const newCourse = {
            key: course.Key,
            courseID, courseName, totalCredits,
            docType: 'course',
        };
        await ctx.stub.putState(course.key, Buffer.from(JSON.stringify(course)));
        console.info('============= END : update Course ===========');
    }

    async queryCourse(ctx, courseID) {//edit
        const allResults = [];
        const query = "{\"selector\":{\"courseID\":\""+courseID+"\",\"docType\": \"course\"}}";
        for await (const {key, value} of ctx.stub.getQueryResult(query)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        if (!allResults || allResults.length === 0) {
            throw new Error(`${courseID} does not exist`);
        }
        console.info(allResults[0]);
        return JSON.stringify(allResults[0]);
    }

    async queryAllCourse(ctx) {
        const allResults = [];
        const query = "{\"selector\":{\"docType\":\"course\"}}";
        for await (const {key, value} of ctx.stub.getQueryResult(query)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
    //Scores
    async createScore(ctx, studentID,courseID,grade) {
        console.info('============= START : Create Score ===========');
        const userName = ctx.clientIdentity.getAttributeValue("userName");
        if(!ctx.clientIdentity.assertAttributeValue("position","Lecturer")){
            throw new Error(`User ${userName} does not have permission!`);
        }
        const student = JSON.parse(await this.queryStudent(ctx, studentID));
        console.log("[!students]",!student);
        if (!student) {
            throw new Error(`${studentID} does not exist`);
        }

        const course = JSON.parse(await this.queryCourse(ctx, courseID));
        
        if (!course) {
            throw new Error(`${courseID} does not exist`);
        }
        const {fullName,className}= student.Record;
        const {courseName,totalCredits}= course.Record;
        const score = {
            key: "score"+ctx.stub.getTxTimestamp(),
            studentID,fullName,className,courseID,courseName,totalCredits,grade,
            lecturer:userName,
            docType: 'score',
        };
        console.log(score)
        await ctx.stub.putState(score.key, Buffer.from(JSON.stringify(score)));
        if(grade>=5)
        {
            student.Record.accumulatedCredits = +student.Record.accumulatedCredits + +totalCredits;
        }
        console.log("Update Student", student);
        //Update accumulatedCredits
        await ctx.stub.putState(student.Key, Buffer.from(JSON.stringify(student.Record)));
        console.info('============= END : Create Score ===========');
    }
    async updateScore(ctx, studentID,courseID,grade) {//edit
        console.info('============= START : update Score ===========');
        const userName = ctx.clientIdentity.getAttributeValue("userName");
        if(!ctx.clientIdentity.assertAttributeValue("position","Lecturer")){
            throw new Error(`User ${userName} does not have permission!`);
        }
        const score = JSON.parse(await this.queryScoreByStudentIDCourseID(ctx, studentID, courseID));
        if (!score) {
            throw new Error(`${studentID+"-"+courseID} does not exist`);
        }
      
        if(grade>score.Record.grade)
        {
            if(score.Record.grade<5 && grade>=5)
            {
                const student = JSON.parse( await this.queryStudent(ctx, studentID));
                if (!student) {
                    throw new Error(`${studentID} does not exist`);
                }
                const course = JSON.parse(await this.queryCourse(ctx, courseID));
                student.Record.accumulatedCredits = +student.Record.accumulatedCredits + +course.Record.totalCredits;
                console.log(student);
                //Update accumulatedCredits
                await ctx.stub.putState(student.Record.key, Buffer.from(JSON.stringify(student.Record)));
            }
            score.Record.grade = grade;
            console.log("[Grade]", score);
            await ctx.stub.putState(score.Key,  Buffer.from(JSON.stringify(score.Record)));
        }
        console.info('============= END : update Score ===========');
    }
    async queryScoreByStudentID(ctx,studentID) {
        const allResults = [];
        const query = "{\"selector\":{\"docType\":\"score\",\"studentID\":\""+studentID+"\"}}";
        //console.log("query: " + query);
        for await (const {key, value} of ctx.stub.getQueryResult(query)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
    async queryScoreByStudentIDCourseID(ctx,studentID,courseID) {
        const allResults = [];
        const query = "{\"selector\":{\"studentID\":\""+studentID+"\",\"courseID\":\""+courseID+"\",\"docType\": \"score\"}}";
        //console.log("query: " + query);
        for await (const {key, value} of ctx.stub.getQueryResult(query)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
    async queryScoreByLecturer(ctx) {
        const userName = ctx.clientIdentity.getAttributeValue("userName");
        const allResults = [];
        const query = "{\"selector\":{\"docType\":\"score\",\"lecturer\":\""+userName+"\"}}";
        //console.log("query: " + query);
        for await (const {key, value} of ctx.stub.getQueryResult(query)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async queryAllScore(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            if(record.docType=='score')
                allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
    //Degrees
    async createDegree(ctx, degreeID,degreeName,studentID,degreeDate,modeOfStudy,signer,image) {
        console.info('============= START : Create Degree ===========');
      
        //check trang thai sinh du dieu kien tot nghiep va status="studying"
        const student =await this.queryStudent(ctx,studentID);
        console.log("createDegree-student", student);
        if(!student)
            throw new Error(`${studentID} does not exist`);
        if(student.Record.status!="studying")
            throw new Error(`${studentID} does not studying ${student}`);
        if(student.Record.totalCredits>student.Record.accumulatedCredits)
            throw new Error(`${studentID} does not enough credits for graduation`);  
        const userName = await ctx.clientIdentity.getAttributeValue("userName");
        const degree = {
            key: "degree"+ctx.stub.getTxTimestamp(),
            degreeID,degreeName,studentID,degreeDate,modeOfStudy,signer,image,
            createdBy: userName,
            docType: 'degree',
        };
        console.log("create Degree", degree);
        await ctx.stub.putState(degree.key, Buffer.from(JSON.stringify(degree)));
        //Cap nhat trang thai sinh vien tot nghiep status="graduated"
        student.Record.status="waitingfordegree";
        {
            const{fullName,dateOfBirth,gender,phone,email,status,className,department,majors,shoolYear,totalCredits,accumulatedCredits,idNumber,dateOfIssue,placeOfIssue,image} = student;
            await this.updateStudent(ctx,studentID,fullName,dateOfBirth,gender,phone,email,status,className,department,majors,shoolYear,totalCredits,accumulatedCredits,idNumber,dateOfIssue,placeOfIssue,image);
        }
        console.info('============= END : Create Degree ===========');
    }
    async signDegree(ctx, degreeID, signerNew ) {//edit
        console.info('============= START : sign Degree ===========');
        const allResults=[];
        const degree = await this.queryDegree(ctx, degreeID);
        if (!degree) {
            throw new Error(`${degreeID} does not exist`);
        }
        if( degree.Record.signer == 'final'){
            throw new Error(`${degreeID} is final`);
        }
        
        const userName = await ctx.clientIdentity.getAttributeValue("userName");
        if( userName!=degree.Record.signer)
        {
            throw new Error(`User ${userID} does not have permission to sign!`);
        }
        degree.Record.signer = signerNew;
        console.log("[sign Degree]", degree);
        await ctx.stub.putState(degree.Record.key, Buffer.from(JSON.stringify(degree.Record)));

        if(signerNew=="final")
        {
            const student = await this.queryStudent(Record.studentID);
            student.status ="graduated";
            const{studentID, fullName,dateOfBirth,gender,phone,email,status,className,department,majors,shoolYear,totalCredits,accumulatedCredits,idNumber,dateOfIssue,placeOfIssue,image} = student;
            await this.updateStudent(ctx,studentID,fullName,dateOfBirth,gender,phone,email,status,className,department,majors,shoolYear,totalCredits,accumulatedCredits,idNumber,dateOfIssue,placeOfIssue,image);
        }
        console.info('============= END : sign Degree ===========');
    }

    async queryAllDegreeSign(ctx) {
        const allResults = [];
        const userName = ctx.clientIdentity.getAttributeValue("userName");
        const query = "{\"selector\":{\"docType\":\"degree\",\"signer\":\""+userName+"\"}}";
        for await (const {key, value} of ctx.stub.getQueryResult(query)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            //if(record.docType == 'degree' && userID.indexOf(record.signer)>=0)
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
        //return JSON.stringify(userID);
    }
    
    async queryDegree(ctx, degreeID) {//edit
        const allResults = [];
        const query = "{\"selector\":{\"docType\":\"degree\",\"degreeID\":\""+degreeID+"\"}}";
        for await (const {key, value} of ctx.stub.getQueryResult(query)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        if (!allResults || allResults.length === 0) {
            throw new Error(`${degreeID} does not exist`);
        }
        console.log(allResults[0]);
        return allResults[0];
    }

    async queryAllDegreeByStudentID(ctx, studentID) {//edit
        const allResults = [];
        const query = "{\"selector\":{\"docType\":\"degree\",\"studentID\":\""+studentID+"\"}}";
        for await (const {key, value} of ctx.stub.getQueryResult(query)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
    async queryAllDegreeByCreated(ctx) {//edit
        const userName = ctx.clientIdentity.getAttributeValue("userName");
        const allResults = [];
        const query = "{\"selector\":{\"docType\":\"degree\",\"createBy\":\""+userName+"\"}}";
        for await (const {key, value} of ctx.stub.getQueryResult(query)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
}
module.exports = AcademicRecord;
