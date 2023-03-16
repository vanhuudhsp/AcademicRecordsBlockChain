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
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import studentsTableData from "layouts/students/data/studentsTableData";

import { useMaterialUIController} from "context";
//import Configurator from "examples/Configurator";
import AddIcon from '@material-ui/icons/Add';
import CreateStudentModal from "layouts/CreateStudentModal";
import React, { useCallback, useMemo } from "react";
import { setOpenConfigurator } from "context";
import { setIsEdit } from "context";
import { setCurrentStudent } from "context";


function Students() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    openConfigurator,
    isEdit,
  } = controller;
  // Change the openConfigurator state
  // const handleConfiguratorOpen = () => dispatch(dispatch, !openConfigurator);
    // dispatchRedux(studentsSlice.actions.setCurrentStudent(
    //   {
    //     studentNumber:'', 
    //     fullName:'', 
    //     dateOfBirth:'', 
    //     gender:'', 
    //     phone:'',
    //     email:'',
    //     status:'' , 
    //     className:'', 
    //     department:'', 
    //     trainingSystem:'', 
    //     branch:'', 
    //     shoolYear:'', 
    //     totalCredits:'', 
    //     accumulatedCredits:0,
    //     idNumber:'', 
    //     dateOfIssue:'', 
    //     placeOfIssue:'', 
    //     image:'',
    //   }
    // ));
   const handleConfiguratorOpen =  () => 
   {
      setOpenConfigurator(dispatch,!openConfigurator);
      setIsEdit(dispatch,false);
   };

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <AddIcon/>
    </MDBox>
  );


  const { columns, rows } = studentsTableData();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          {/* <Grid item xs={4}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  New User
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3} component="form" role="form">
                <MDBox mb={2}>
                  <MDInput type="firstname" label="First Name" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="lastname" label="Last Name" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="email" label="Email" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="password" label="Password" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="department" label="Department" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="position" label="Position" fullWidth />
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" fullWidth>
                    Create User
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid> */}
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Students
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <CreateStudentModal isEdit={false}/>
      {configsButton}
    </DashboardLayout>
    
  );
}

export default Students;
