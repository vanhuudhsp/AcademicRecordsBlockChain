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
// Redux

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
import { createUser } from "context";


function CreateUserModal() {
    const [ newUser, setNewUser] = useState(
        {
            firstName: 'Huu',
            lastName:'Tran Van',
            email:'huutv@tdmu.edu.vn',
            password:'1',
            department:'Institute of Engineering and Technology',
            position:'Lecturer',
            image: '',
            role:'client',
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
        userLogin,
    } = controller;
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
    const onClose = useCallback(() => {
        setOpenConfigurator(dispatch, false);
    }, [newUser]); 
    const onSubmit = useCallback(()=> {
        // console.log("[Client-submit-userLogin]",userLogin);
        // console.log("[Client-submit-newUser]",newUser);
        createUser(dispatch,userLogin, newUser);
        //dispatchRedux(createUser({userLogin,newUser}));
        onClose();
    }, [newUser, userLogin]);
                  
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
          <MDTypography variant="h5">Create New User</MDTypography>
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
              <MDInput type="text" label="First Name" variant="standard" fullWidth 
                value={newUser.firstName}
                onChange={(e)=>setNewUser({...newUser, firstName:e.target.value})}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Last Name" variant="standard" fullWidth 
                value={newUser.lastName}
                onChange={(e)=>setNewUser({...newUser, lastName:e.target.value})}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth 
                value={newUser.email}
                onChange={(e)=>setNewUser({...newUser, email:e.target.value})}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth 
                value={newUser.password}
                onChange={(e)=>setNewUser({...newUser, password:e.target.value})}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Department" variant="standard" fullWidth 
                value={newUser.department}
                onChange={(e)=>setNewUser({...newUser, department:e.target.value})}
              />
            </MDBox>
            <MDBox mb={2}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Position</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={newUser.position}
                  onChange={(e)=>setNewUser({...newUser, position:e.target.value})}
                  label="Position"
                >
                  <MenuItem value="Principal">Principal</MenuItem>
                  <MenuItem value="Assistant Principal">Assistant Principal</MenuItem>
                  <MenuItem value="Director">Director</MenuItem>
                  <MenuItem value="Vice Director">Vice Director</MenuItem>
                  <MenuItem value="Secretary">Secretary</MenuItem>
                  <MenuItem value="Lecturer">Lecturer</MenuItem>
                  <MenuItem value="Expert">Expert</MenuItem>
                </Select>
              </FormControl>
            </MDBox>
            <FileBase64 accept='image/*' multiple={false} type='file' value={newUser.image} onDone={({base64}) => setNewUser({...newUser, image: base64})} />
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={onSubmit}>
                Create New User
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </ConfiguratorRoot>
  );
}

export default CreateUserModal;
