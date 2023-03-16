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

import { useState, useEffect, useCallback } from "react";

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
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";


// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setOpenConfigurator,
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
import { fecthUsers } from "context";
import { createDegree } from "context";


function CreateDegreeModal() {
    const [ newDegree, setNewDegree] = useState(
        {
          degreeID: 'degree2', 
          degreeName:'Information Technology Engineer', 
          studentID:'', 
          degreeDate: new Date().toLocaleDateString(), 
          modeOfStudy:'Full Time', 
          signer:'quangnh@tdmu.edu.vn',
          image:'',
        }
    );
    const [controller, dispatch] = useMaterialUIController();
    const {
        openConfigurator,
        fixedNavbar,
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
        darkMode,
        currentStudent,
        listUsers,
        userLogin,
    } = controller;
    const [disabled, setDisabled] = useState(false);
    const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

    useEffect(()=>{
      fecthUsers(dispatch);
      if(currentStudent!=null)
        setNewDegree(
          {
            degreeID: 'degree2', 
            degreeName:'Information Technology Engineer', 
            studentID:currentStudent.studentID, 
            degreeDate:new Date().toLocaleDateString(), 
            modeOfStudy:'Full Time', 
            signer:'quangnh@tdmu.edu.vn',
            image:'',
          }
        );
    },[fecthUsers,dispatch,currentStudent]);

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
    const onClose = useCallback(() => {
        setOpenConfigurator(dispatch, false);
        setNewDegree(
          {
            degreeID: 'degree2', 
            degreeName:'Information Technology Engineer', 
            studentID:'', 
            degreeDate: new Date().toLocaleDateString(), 
            modeOfStudy:'Full Time', 
            signer:'quangnh@tdmu.edu.vn',
            image:'',
          }
        );
    }, [setOpenConfigurator, setNewDegree]); 
    const onSubmit = useCallback(()=> {
        createDegree(dispatch, userLogin, newDegree);
        onClose();
    }, [dispatch, onClose, newDegree, createDegree]);
                  
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
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }} configuratorwidth={600}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">Create New Degree</MDTypography>
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
            <MDBox mb={2}>
              <MDInput type="text" label="Degree ID" variant="standard" fullWidth 
                value={newDegree.degreeID}
                onChange={(e)=>setNewDegree({...newDegree, degreeID:e.target.value})}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Degree Name" variant="standard" fullWidth 
                value={newDegree.degreeName}
                onChange={(e)=>setNewDegree({...newDegree, degreeName:e.target.value})}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Student ID" variant="standard" fullWidth 
                value={newDegree.studentID}
                onChange={(e)=>setNewDegree({...newDegree, studentID:e.target.value})}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Degree Date" variant="standard" fullWidth 
                value={newDegree.degreeDate}
                onChange={(e)=>setNewDegree({...newDegree, degreeDate:e.target.value})}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Mode Of Study" variant="standard" fullWidth 
                value={newDegree.modeOfStudy}
                onChange={(e)=>setNewDegree({...newDegree, modeOfStudy:e.target.value})}
              />
            </MDBox>
            <MDBox mb={2}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Position</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={newDegree.signer}
                  onChange={(e)=>setNewDegree({...newDegree, signer:e.target.value})}
                  label="signer"
                >
                  {listUsers.map((u)=>{
                    //console.log(u,userLogin );
                    if(u.department== userLogin.department && u.position=="Director")
                      return ( <MenuItem value={u.email}>{u.lastName + " " + u.firstName}</MenuItem>);
                  })}
                </Select>
              </FormControl>
            </MDBox>
            
            <FileBase64 accept='image/*' multiple={false} type='file' value={newDegree.image} onDone={({base64}) => setNewDegree({...newDegree, image: base64})} />
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={onSubmit}>
                Create New Degree
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </ConfiguratorRoot>
  );
}

export default CreateDegreeModal;
