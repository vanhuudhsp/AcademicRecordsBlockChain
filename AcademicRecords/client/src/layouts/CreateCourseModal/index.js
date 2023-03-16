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
import { createCourse } from "context";
import { updateCourse } from "context";


function CreateCourseModal() {
    const [newCourse, setNewCourse] = useState({
      courseID:"LING165", 
      courseName:"Nguyên lý hệ điều hành (3+1)", 
      totalCredits:"4", 
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
        currentCourse,
    } = controller;
    
    useEffect( ()=>
    {
      if(!isEdit)
      setNewCourse({
        courseID:"LING165", 
        courseName:"Nguyên lý hệ điều hành (3+1)", 
        totalCredits:"4",
      });
    else
      setNewCourse(currentCourse);
    } 
    ,[isEdit,currentCourse]);
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
    const onClose = useCallback( () =>setOpenConfigurator(dispatch,false),[setOpenConfigurator]);
     
    const onSubmit =useCallback(()=> {
      if(!isEdit)
          createCourse(dispatch,userLogin,newCourse);
      else
          updateCourse(dispatch,userLogin,newCourse);
      onClose();
  },[isEdit,userLogin, newCourse, createCourse, updateCourse]);

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
    <ConfiguratorStudent variant="permanent" ownerState={{ openConfigurator }} configuratorwidth={400}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">{(!isEdit)?"Create New Course":"Update Course"}</MDTypography>
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
              <MDInput type="text" label="Course ID *" variant="standard" fullWidth 
                value={newCourse.courseID}
                onChange={(e)=>setNewCourse({...newCourse, courseID:e.target.value})}
              />
            
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Course Name *" variant="standard" fullWidth
                value={newCourse.courseName}
                onChange={(e)=>setNewCourse({...newCourse, courseName:e.target.value})}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Total Credits *" variant="standard" fullWidth
                value={newCourse.totalCredits}
                onChange={(e)=>setNewCourse({...newCourse, totalCredits:e.target.value})}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={onSubmit}>
                {(!isEdit)?"Create New Course":"Update Course"}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </ConfiguratorStudent>
  );
}

export default CreateCourseModal;
