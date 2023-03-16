/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from 'components/MDButton';
import { useMaterialUIController } from 'context';
import { setIsEdit } from 'context';
import { setOpenConfigurator } from 'context';
import { queryAllScoresByLecturer } from 'context';
import { setCurrentScore } from 'context';
// Images

export default function Data() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    listScores,
    userLogin,
    openConfigurator,
  } = controller;
  //const [currentStudent, setCurrentStudent] = useState(null);
  //console.log('[StudentsTableData-All Students ]', students);

  useEffect(()=>queryAllScoresByLecturer(dispatch,userLogin),[dispatch,userLogin]);
  

  const onSubmit = (u)=>{
    setCurrentScore(dispatch, u);
    setIsEdit(dispatch, true);
    setOpenConfigurator(dispatch, true);
  }


  // React.useEffect( () => 
  // {
  //   console.log('[currentStudent]' , currentStudent);
  //   const {Key, Record} = currentStudent;
  //   const {fullName, dateOfBirth, gender,phone,email,status,className,department,trainingSystem,branch,
  //   shoolYear,totalCredits,accumulatedCredits,idNumber,dateOfIssue,placeOfIssue,image,}  = Record;
  //   const student={
  //     studentnumber: Key,
  //     fullName, dateOfBirth, gender,phone,email,status,className,department,trainingSystem,branch,
  //     shoolYear,totalCredits,accumulatedCredits,idNumber,dateOfIssue,placeOfIssue,image
  //   }
  //    dispatch(studentsSlice.actions.setOpenConfigurator(!openConfigurator));
  //    dispatch(studentsSlice.actions.setIsEdit(true));
  //    dispatch(studentsSlice.actions.setCurrentStudent(student));
  // }, [dispatch,studentsSlice, currentStudent ]);
  
 
      // dateOfBirth:"", 
      // gender:"male", 
     
      // status:"" , 
      
      
      // majors:"", 
      // shoolYear: 4, 
      // totalCredits:150, 
      // idNumber:"", 
      // dateOfIssue:"", 
      // placeOfIssue:"", 
      // image:""
  const StudentID = ({studentid }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={studentID} size="sm" /> */}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="caption" fontWeight="medium">
          {studentid}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
  const FullName = ({fullname }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={studentID} size="sm" /> */}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="caption" fontWeight="medium">
          {fullname}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
  const ClassName = ({classname }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={studentID} size="sm" /> */}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="caption" fontWeight="medium">
          {classname}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
  const CourseID = ({courseid }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={studentID} size="sm" /> */}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="caption" fontWeight="medium">
          {courseid}
        </MDTypography>
      </MDBox>
    </MDBox>
    
  );


  const CourseName = ({  coursename }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {coursename}
      </MDTypography>
    </MDBox>
  );
  const TotalCredits = ({ totalcredits }) => (
    <MDBox lineHeight={1} textAlign="center">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {totalcredits}
      </MDTypography>
    </MDBox>
  );
  const Grade = ({ grade }) => (
    <MDBox lineHeight={1} textAlign="center">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {grade}
      </MDTypography>
    </MDBox>
  );
  
  
  
  const dataRows=[];
  
  listScores.map((u)=>
    dataRows.push(
      {
        studentid: <StudentID  studentid={u.Record.studentID}/>,
        fullname: <FullName  fullname={u.Record.fullName}/>,
        classname: <ClassName  classname={u.Record.className}/>,
        courseid: <CourseID  courseid={u.Record.courseID}/>,
        coursename: <CourseName coursename={u.Record.courseName} />,
        totalcredits: <TotalCredits totalcredits={u.Record.totalCredits} />,
        grade: <Grade grade={u.Record.grade} />,
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" onClick={ ()=> onSubmit(u.Record)} >
            Edit
            {/* <CreateStudentModal isEdit={false}/>
            {configsButton} */}
          </MDTypography>
        ),
      }
    )
  )
  return {
    columns: [
      { Header: "student id", accessor: "studentid", align: "right" },
      { Header: "full name", accessor: "fullname", align: "right" },
      { Header: "class name", accessor: "classname", align: "right" },
      { Header: "course id", accessor: "courseid", align: "left" },
      { Header: "course name", accessor: "coursename", align: "left" },
      { Header: "total credits", accessor: "totalcredits", align: "center" },
      { Header: "grade", accessor: "grade", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: dataRows,
  };
}
