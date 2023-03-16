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

import { useState, useCallback , useEffect} from "react";

// react-router-dom components
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

//Redux
// Redux
import {useDispatch, useSelector} from "react-redux";
//import {login} from "../../users/usersSlice";
import { userLoginState$ , userLoginError$} from "redux/selectors";
import { Navigate } from "react-router-dom";
import MDAlert from "components/MDAlert";
import MDSnackbar from "components/MDSnackbar";
import { useMaterialUIController } from "context";
import { login } from "context";

function Basic() {
  
  const dispatchRedux = useDispatch();
  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const [ user, setUser] = useState(
    {
      email:'',
      password:'',
    }
  );
  const [controller, dispatch] = useMaterialUIController();
  const {
    userLogin,
  } = controller;
  //const userLogin = useSelector(userLoginState$);
  //const userLoginError = useSelector(userLoginError$);
  // const onSubmit = useCallback(()=> {
    
  //   // console.log('[user]', user);
  //   dispatchRedux(login(user)).then((state)=>
  //   {
  //     if(userLoginError)
  //       openErrorSB();

  //   });

  //   // console.log('[User Login]', userLogin);
  // }, [dispatchRedux, user, userLogin,openErrorSB]);

  const onSubmit = ()=> login(dispatch, user).then(
    (e) => openErrorSB()
  )
  
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // const renderSuccessSB = (
  //   <MDSnackbar
  //     color="success"
  //     icon="check"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={successSB}
  //     onClose={closeSuccessSB}
  //     close={closeSuccessSB}
  //     bgWhite
  //   />
  // );
  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Fail Authenticate"
      content="Fail Authenticate with Email and Password "
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );
  return (
    !userLogin ? 
      <BasicLayout image={bgImage}>
     <Card>
       <MDBox
         variant="gradient"
         bgColor="info"
         borderRadius="lg"
         coloredShadow="info"
         mx={2}
         mt={-3}
         p={2}
         mb={1}
         textAlign="center"
       >
         <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
           Sign in
         </MDTypography>
         <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
           <Grid item xs={2}>
             <MDTypography component={MuiLink} href="#" variant="body1" color="white">
               <FacebookIcon color="inherit" />
             </MDTypography>
           </Grid>
           <Grid item xs={2}>
             <MDTypography component={MuiLink} href="#" variant="body1" color="white">
               <GitHubIcon color="inherit" />
             </MDTypography>
           </Grid>
           <Grid item xs={2}>
             <MDTypography component={MuiLink} href="#" variant="body1" color="white">
               <GoogleIcon color="inherit" />
             </MDTypography>
           </Grid>
         </Grid>
       </MDBox>
       <MDBox pt={4} pb={3} px={3}>
         <MDBox component="form" role="form">
           <MDBox mb={2}>
             <MDInput type="email" label="Email" variant="standard" fullWidth 
                error
                value={user.email}
                onChange={(e)=>setUser({...user, email:e.target.value})}
             />
           </MDBox>
           <MDBox mb={2}>
           <MDInput type="password" label="Password" variant="standard" fullWidth 
                error
                value={user.password}
                onChange={(e)=>setUser({...user, password:e.target.value})}
             />
           </MDBox>
           <MDBox display="flex" alignItems="center" ml={-1}>
             <Switch checked={rememberMe} onChange={handleSetRememberMe} />
             <MDTypography
               variant="button"
               fontWeight="regular"
               color="text"
               onClick={handleSetRememberMe}
               sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
             >
               &nbsp;&nbsp;Remember me
             </MDTypography>
           </MDBox>
           <MDBox mt={4} mb={1}>
             <MDButton variant="gradient" color="info" fullWidth onClick={ onSubmit }>
               sign in
             </MDButton>
           </MDBox>
           <MDBox mt={3} mb={1} textAlign="center">
             <MDTypography variant="button" color="text">
               Don&apos;t have an account?{" "}
               <MDTypography
                 component={Link}
                 to="/authentication/sign-up"
                 variant="button"
                 color="info"
                 fontWeight="medium"
                 textGradient
               >
                 Sign up
               </MDTypography>
             </MDTypography>
             {renderErrorSB}
           </MDBox>

         </MDBox>
       </MDBox>
     </Card>

   </BasicLayout>

    : <Navigate to="/dashboard" replace={true} />
  );
}

export default Basic;
