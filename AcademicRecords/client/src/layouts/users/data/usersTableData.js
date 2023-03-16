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
import React from 'react';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useMaterialUIController } from 'context';
import { fecthUsers } from 'context';
export default function Data() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    listUsers,
  } = controller;
  fecthUsers(dispatch);
  
  const User = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
  const dataRows=[];
  
  listUsers.map((u)=>
    dataRows.push(
      {
        user: <User image={u.image} name={u.firstName + ' ' + u.lastName} email={u.email} />,
        department: <Job title={u.department} description={u.position} />,
        role: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={u.role} color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        createat: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {u.createdAt}
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      }
    )
  )
  return {
    columns: [
      { Header: "user", accessor: "user", width: "45%", align: "left" },
      { Header: "department", accessor: "department", align: "left" },
      { Header: "role", accessor: "role", align: "center" },
      { Header: "createat", accessor: "createat", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: dataRows,
  };
}
