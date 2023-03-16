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




export default function Data() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    listStudents,
    userLogin,
    openConfigurator,
  } = controller;
  //const [currentStudent, setCurrentStudent] = useState(null);
  //console.log('[StudentsTableData-All Students ]', students);

  useEffect(()=>queryAllStudents(dispatch,userLogin),[dispatch,userLogin]);
  
  const onSubmit =(u) => 
  {
    console.log("[studentsTableData]",u);
    setCurrentStudent(dispatch, u);
    setIsEdit(dispatch,true);
    setOpenConfigurator(dispatch, true);
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

  const StundentID = ({image, studentID }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={studentID} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="caption" fontWeight="medium">
          {studentID}
        </MDTypography>
      </MDBox>
    </MDBox>
    
  );


  const FullName = ({  fullname }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {fullname}
      </MDTypography>
    </MDBox>
  );
  const ClassName = ({ classname }) => (
    <MDBox lineHeight={1} textAlign="center">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {classname}
      </MDTypography>
    </MDBox>
  );

  const Gender = ({ gender }) => (
    <MDBox lineHeight={1} textAlign="center">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {gender}
      </MDTypography>
    </MDBox>
  );

  const Communications = ({ phone, email }) => (
    <MDBox lineHeight={1} textAlign="center">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {phone}
      </MDTypography>
      <MDTypography variant="caption">{email}</MDTypography>
    </MDBox>
  );
  
  
  const dataRows=[];
  
  listStudents.map((u)=>
    dataRows.push(
      {
        studentID: <StundentID image={u.Record.image} studentID={u.Record.studentID}/>,
        fullname: <FullName fullname={u.Record.fullName} />,
        classname: <ClassName classname={u.Record.className} />,
        gender: <Gender gender={u.Record.gender}/>,
        communications: <Communications phone={u.Record.phone} email={u.Record.email}/>,
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" onClick={()=>{
            onSubmit(u.Record);
          }} >
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
      { Header: "student id", accessor: "studentID", align: "right" },
      { Header: "fullname", accessor: "fullname", align: "left" },
      { Header: "classname", accessor: "classname", align: "center" },
      { Header: "gender", accessor: "gender", align: "center" },
      { Header: "communications", accessor: "communications", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: dataRows,
  };
}
