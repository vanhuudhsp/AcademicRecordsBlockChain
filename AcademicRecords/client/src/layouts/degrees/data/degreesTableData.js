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
import { setCurrentStudent } from 'context';
import { queryAllStudents } from 'context';
import { setIsEdit } from 'context';
import { setOpenConfigurator } from 'context';
import { queryAllDegreeByCreated } from 'context';
import { updateDegree } from 'context';




export default function Data() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    listDegrees,
    userLogin,
    openConfigurator,
  } = controller;
  //const [currentStudent, setCurrentStudent] = useState(null);
  //console.log('[StudentsTableData-All Students ]', students);

  useEffect(()=>queryAllDegreeByCreated(dispatch,userLogin),[dispatch,userLogin]);
  
  const onSubmit =(u) => 
  {
    //console.log("[studentsTableData]",u);
    updateDegree(dispatch, u);
    setIsEdit(dispatch,false);
    setOpenConfigurator(dispatch, false);
  };
 

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

  const DegreeID = ({image, degreeid }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="caption" fontWeight="medium">
          {degreeid}
        </MDTypography>
      </MDBox>
    </MDBox>
    
  );


  const DegreeName = ({  degreename }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {degreename}
      </MDTypography>
    </MDBox>
  );
  const StudentID = ({ studentid }) => (
    <MDBox lineHeight={1} textAlign="center">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {studentid}
      </MDTypography>
    </MDBox>
  );

  const DegreeDate = ({ degreedate }) => (
    <MDBox lineHeight={1} textAlign="center">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {degreedate}
      </MDTypography>
    </MDBox>
  );

  const ModeOfStudy = ({ modeOfstudy }) => (
    <MDBox lineHeight={1} textAlign="center">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {modeOfstudy}
      </MDTypography>
    </MDBox>
  );
  

  
  
  
  const dataRows=[];
  
  listDegrees.map((u)=>{
      dataRows.push(
        {
          degreeid: <DegreeID  degreeid={u.Record.degreeID}/>,
          degreename: <DegreeName  degreename={u.Record.degreeName}/>,
          studentid: <StudentID  studentid={u.Record.studentID}/>,
          degreedate: <DegreeDate degreedate={u.Record.degreeDate} />,
          modeofstudy: <ModeOfStudy modeofstudy={u.Record.modeOfStudy}/>,
          action: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" onClick={()=>{
              onSubmit(u.Record);
            }} >
              Update Degree
              {/* <CreateStudentModal isEdit={false}/>
              {configsButton} */}
            </MDTypography>
          ),
        }
      )
  }
  )
  return {
    columns: [
      { Header: "degreeid", accessor: "degreeid", align: "right" },
      { Header: "degree name", accessor: "degreename", align: "left" },
      { Header: "studentid", accessor: "studentid", align: "center" },
      { Header: "degree date", accessor: "degreedate", align: "center" },
      { Header: "mode of study", accessor: "modeofstudy", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: dataRows,
  };
}
