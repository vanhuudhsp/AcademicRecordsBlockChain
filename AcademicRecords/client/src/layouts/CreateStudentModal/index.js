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

import { useState, useEffect, useCallback, useMemo } from "react";

// @mui material components
import Divider from "@mui/material/Divider";

import Icon from "@mui/material/Icon";

// @mui icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";


// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import FileBase64 from "react-file-base64";

// Custom styles for the Configurator
import ConfiguratorStudent from "examples/Configurator/ConfiguratorStudent";
// Redux
// import {useDispatch, useSelector} from "react-redux";
// import studentsSlice, { createStudent, updateStudent } from "layouts/students/studentsSlice";
// import {userLoginState$, openConfiguratorStudentState$, isEditStudentState$, currentStudentState$} from '../../redux/selectors';

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentSidenav,
  setWhiteSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
} from "context";
// Select 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { setOpenConfigurator } from "context";
import { createStudent } from "context";
import { updateStudent } from "context";


function CreateStudentModal() {
    const [newStudent, setNewStudent] = useState({
        studentID:"2024801030090", 
        fullName:"Nguyen Trong Tuan Anh", 
        dateOfBirth:"", 
        gender:"male", 
        phone:"0975824272", 
        email:"2024801030090@student.tdmu.edu.vn" , 
        status:"studying" , 
        className:"D20KTPM02", 
        department:"Institute of Engineering and Technology", 
        majors:"Software technology", 
        shoolYear: 4, 
        totalCredits:150,
        accumulatedCredits:0, 
        idNumber:"", 
        dateOfIssue:"", 
        placeOfIssue:"", 
        image:"",
    });
    const [controller, dispatch] = useMaterialUIController();
    const {
        // openConfigurator,
        fixedNavbar, 
        // sidenavColor,
        // transparentSidenav,
        // whiteSidenav,
        darkMode,
        isEdit,
        openConfigurator,
        userLogin,
        currentStudent,
    } = controller;
    
    useEffect( ()=>
    {
      if(!isEdit)
      setNewStudent({
        studentID:"2024801030090", 
        fullName:"Nguyen Trong Tuan Anh", 
        dateOfBirth:"", 
        gender:"male", 
        phone:"0975824272", 
        email:"2024801030090@student.tdmu.edu.vn" , 
        status:"studying" , 
        className:"D20KTPM02", 
        department:"Institute of Engineering and Technology", 
        majors:"Software technology", 
        shoolYear: 4, 
        totalCredits:150,
        accumulatedCredits:0, 
        idNumber:"", 
        dateOfIssue:"", 
        placeOfIssue:"", 
        image:"",
      });
    else
      setNewStudent(currentStudent);
    } 
    ,[isEdit,currentStudent]);
    const [disabled, setDisabled] = useState(false);
    const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

    // Use the useEffect hook to change the button state for the sidenav type based on window size.
    useEffect(() => {
        // A function that sets the disabled state of the buttons for the sidenav type.
        function handleDisabled() {
        return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
        }

        // The event listener that's calling the handleDisabled function when resizing the window.
        window.addEventListener("resize", handleDisabled);

        // Call the handleDisabled function to set the state with the initial value.
        handleDisabled();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleDisabled);
    }, []);
   
    // const onClose = useCallback(() => {
    //     dispatchRedux(setOpenConfigurator(false));
    // }, [dispatchRedux]); 
    const onClose = useCallback( () =>setOpenConfigurator(dispatch,false),
    [setOpenConfigurator]);
     
    const onSubmit =useCallback(()=> {
      if(!isEdit)
          createStudent(dispatch,userLogin,newStudent);
      else
          updateStudent(dispatch,userLogin,newStudent);
      onClose();
  },[isEdit,userLogin, newStudent, createStudent, updateStudent]);

    const handleTransparentSidenav = () => {
        setTransparentSidenav(dispatch, true);
        setWhiteSidenav(dispatch, false);
    };
    const handleWhiteSidenav = () => {
        setWhiteSidenav(dispatch, true);
        setTransparentSidenav(dispatch, false);
    };
    const handleDarkSidenav = () => {
        setWhiteSidenav(dispatch, false);
        setTransparentSidenav(dispatch, false);
    };
    const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);
    const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

    // sidenav type buttons styles
    const sidenavTypeButtonsStyles = ({
        functions: { pxToRem },
        palette: { white, dark, background },
        borders: { borderWidth },
    }) => ({
        height: pxToRem(39),
        background: darkMode ? background.sidenav : white.main,
        color: darkMode ? white.main : dark.main,
        border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

        "&:hover, &:focus, &:focus:not(:hover)": {
        background: darkMode ? background.sidenav : white.main,
        color: darkMode ? white.main : dark.main,
        border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
        },
    });

    // sidenav type active button styles
    const sidenavTypeActiveButtonStyles = ({
        functions: { pxToRem, linearGradient },
        palette: { white, gradients, background },
    }) => ({
        height: pxToRem(39),
        background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
        color: darkMode ? background.sidenav : white.main,

        "&:hover, &:focus, &:focus:not(:hover)": {
        background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
        color: darkMode ? background.sidenav : white.main,
        },
    });
  return (
    <ConfiguratorStudent variant="permanent" ownerState={{ openConfigurator }} configuratorwidth={600}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5"> {(!isEdit)?"Create New Student":"Update Student"}</MDTypography>
        </MDBox>

        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={onClose}
        >
          close
        </Icon>
      </MDBox>
      <Divider />
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox component="span"  mb={2}>
              <MDInput type="text" label="Student ID *" variant="standard" sx={{ width: 250, mr:3 }}
                value={newStudent.studentID}
                onChange={(e)=>setNewStudent({...newStudent, studentID:e.target.value})}
              />
            
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Full Name *" variant="standard" sx={{ width: 250, mr:3 }} 
                value={newStudent.fullName}
                onChange={(e)=>setNewStudent({...newStudent, fullName:e.target.value})}
              />
              <MDInput type="text" label="Class Name *" variant="standard" sx={{ width: 250 }}
                value={newStudent.className}
                onChange={(e)=>setNewStudent({...newStudent, className:e.target.value})}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Date Of Birth *" variant="standard" sx={{ width: 250, mr:3 }} 
                value={newStudent.dateOfBirth}
                onChange={(e)=>setNewStudent({...newStudent, dateOfBirth:e.target.value})}
              />
              <MDInput type="text" label="Department *" variant="standard" sx={{ width: 250 }} 
                value={newStudent.department}
                onChange={(e)=>setNewStudent({...newStudent, department:e.target.value})}
              />
            </MDBox>
            <MDBox mb={2}>
              <FormControl variant="standard" sx={{ width: 250, mr:3 }} >
                <InputLabel id="demo-simple-select-standard-label">Gender *</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={newStudent.gender}
                  onChange={(e)=>setNewStudent({...newStudent, gender:e.target.value})}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
              <MDInput type="text" label="Majors *" variant="standard" sx={{ width: 250 }} 
                value={newStudent.majors}
                onChange={(e)=>setNewStudent({...newStudent, majors:e.target.value})}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Phone" variant="standard" sx={{ width: 250, mr:3 }}  
                value={newStudent.phone}
                onChange={(e)=>setNewStudent({...newStudent, phone:e.target.value})}
              />
               <MDInput type="text" label="Shool Year *" variant="standard" sx={{width: 250,  mr:3 }} 
                value={newStudent.shoolYear}
                onChange={(e)=>setNewStudent({...newStudent, shoolYear:e.target.value})}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Email" variant="standard" sx={{ width: 250, mr:3 }}  
                value={newStudent.email}
                onChange={(e)=>setNewStudent({...newStudent, email:e.target.value})}
              />
               <MDInput type="text" label="Total Credits *" variant="standard"  sx={{width: 250 , mr:3}}
                value={newStudent.totalCredits}
                onChange={(e)=>setNewStudent({...newStudent, totalCredits:e.target.value})}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Status *" variant="standard"  disabled sx={{ width: 250, mr:3 }}  
                value={newStudent.status}
                onChange={(e)=>setNewStudent({...newStudent, status:e.target.value})}
              />
               <MDInput type="text" label="Accumulated Credits" variant="standard" disabled sx={{width: 250,  mr:3 }} 
                value={newStudent.accumulatedCredits}
                onChange={(e)=>setNewStudent({...newStudent, accumulatedCredits:e.target.value})}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="ID Number" variant="standard" sx={{ width: 160, mr:3 }} 
                value={newStudent.idNumber}
                onChange={(e)=>setNewStudent({...newStudent, idNumber:e.target.value})}
              />
              <MDInput type="text" label="Date Of Issue" variant="standard" sx={{ width: 160, mr:3 }} 
                value={newStudent.dateOfIssue}
                onChange={(e)=>setNewStudent({...newStudent, dateOfIssue:e.target.value})}
              />
              <MDInput type="text" label="Place Of Issue" variant="standard" sx={{ width: 160, mr:3 }} 
                value={newStudent.placeOfIssue}
                onChange={(e)=>setNewStudent({...newStudent, placeOfIssue:e.target.value})}
              />
            </MDBox>
            <FileBase64 accept='image/*' multiple={false} type='file' value={newStudent.image} onDone={({base64}) => setNewStudent({...newStudent, image: base64})} />
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={onSubmit}>
              {(!isEdit)?"Create New Student":"Update Student"}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </ConfiguratorStudent>
  );
}

export default CreateStudentModal;
