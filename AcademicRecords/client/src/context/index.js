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

/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/

import { createContext, useContext, useReducer, useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes, { any } from "prop-types";
import crypto from "crypto-js";

// Material Dashboard 2 React main context
const MaterialUI = createContext();

// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = "MaterialUIContext";

// Material Dashboard 2 React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    case "IS_EDIT": {
      return { ...state, isEdit: action.value };
    }
    case "LIST_COURSES": {
      return { ...state, listCourses: action.value };
    }
    case "CURRENT_COURSE": {
      return { ...state, currentCourse: action.value };
    }
    case "USER_LOGIN": {
      return { ...state, userLogin: action.value };
    }
    case "LIST_USERS": {
      return { ...state, listUsers: action.value };
    }
    case "LIST_STUDENTS": {
      return { ...state, listStudents: action.value };
    }
    case "CURRENT_STUDENT": {
      return { ...state, currentStudent: action.value };
    }
    case "LIST_SCORES": {
      return { ...state, listScores: action.value };
    }
    case "CURRENT_SCORE": {
      return { ...state, currentScore: action.value };
    }
    case "CURRENT_DEGREE":{
      return { ...state, currentDegree: action.value };
    }
    case "LIST_DEGREES":{
      return { ...state, listDegrees: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Material Dashboard 2 React context provider
function MaterialUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false,
    isEdit: false,
    listCourses: [],
    currentCourse:null,
    userLogin:null,
    listUsers:[],
    listStudents:[],
    currentStudent:null,
    listCourses:[],
    currentScore:null,
    listScores:[],
    currentDegree:null,
    listDegrees:[],
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

// Material Dashboard 2 React custom hook for using context
function useMaterialUIController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
}

// Typechecking props for the MaterialUIControllerProvider
MaterialUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch, value) => dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });
const setIsEdit =(dispatch, value) =>  dispatch({type:"IS_EDIT", value});
const login = async(dispatch,userLogin) => {
  const res = await fetch('http://localhost:5000/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userLogin),
  });
  const value = await res.json();
  if(value!=null)
    dispatch({type:"USER_LOGIN", value});
  else
    return new Error('Not found UserName:' + userLogin.email);
};
const logout = (dispatch,value) => dispatch({type:"USER_LOGIN", value});
const fecthUsers = async(dispatch) =>
{
  const res = await fetch('http://localhost:5000/users');
  const value = await res.json();
  dispatch({type:"LIST_USERS", value});
}
const createUser = async(dispatch,userLogin,newUser) =>{
  //newUser.password = crypto.SHA256(newUser.password).toString();
  const res = await fetch('http://localhost:5000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userLogin,newUser}),
  });
  const data = await res.json();
  //console.log('New user : ' , { data });
  fecthUsers(dispatch);
}
const queryAllCourses = async(dispatch,userLogin) => {
    const res = await fetch('http://localhost:5000/courses/queryAllCourses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userLogin),
    });
    const value = JSON.parse(await res.json());
    //console.log('All Students : ' , JSON.parse(data));
    dispatch({type: "LIST_COURSES", value});
}
const createCourse = async(dispatch,userLogin,newCourse) =>{
  const res = await fetch('http://localhost:5000/courses/createCourse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userLogin,newCourse}),
  });
  const value = await res.json();
  if(value!=null)
    queryAllCourses(dispatch,userLogin);
}
const setCurrentCourse = async(dispatch,value) => {
  dispatch({type: "CURRENT_COURSE", value});
}
const updateCourse = async(dispatch,userLogin,newCourse) =>{
  const res = await fetch('http://localhost:5000/courses/updateCourse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        userLogin,
        newCourse,
      }
    ),
  });
  const value = await res.json();
  console.log(value);
  if(value!=null)
    queryAllCourses(dispatch,userLogin);
}

const queryAllStudents = async(dispatch,userLogin) => {
  const res = await fetch('http://localhost:5000/students/queryAllStudents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userLogin),
  });
  const value = JSON.parse(await res.json());
  
  dispatch({type: "LIST_STUDENTS", value});
}
const setCurrentStudent = async(dispatch,value) => {
  dispatch({type: "CURRENT_STUDENT", value});
}
const createStudent = async(dispatch,userLogin,newStudent) =>{
  const res = await fetch('http://localhost:5000/students/createStudent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userLogin,newStudent}),
  });
  const value = await res.json();
  if(value!=null)
    queryAllStudents(dispatch,userLogin);
}
const updateStudent = async(dispatch,userLogin,newStudent) =>{
  const res = await fetch('http://localhost:5000/students/updateStudent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        userLogin,
        newStudent,
      }
    ),
  });
  const value = await res.json();
  console.log(value);
  if(value!=null)
    queryAllStudents(dispatch,userLogin);
}

const queryAllScoresByLecturer = async(dispatch,userLogin) => {
  const res = await fetch('http://localhost:5000/scores/queryScoreByLecturer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userLogin),
  });
  const value = JSON.parse(await res.json());
  //console.log('All Students : ' , JSON.parse(data));
  dispatch({type: "LIST_SCORES", value});
}
const createScore = async(dispatch,userLogin,newScore) =>{
  console.log(userLogin,newScore);
  const res = await fetch('http://localhost:5000/scores/createScore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userLogin,newScore}),
  });
  const value = await res.json();
  console.log("fsfs",value);
  if(value!=null)
    queryAllScoresByLecturer(dispatch,userLogin);
}
const setCurrentScore= async(dispatch,value) => {
  dispatch({type: "CURRENT_SCORE", value});
}
const updateScore = async(dispatch,userLogin,newScore) =>{
const res = await fetch('http://localhost:5000/scores/updateScore', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(
    {
      userLogin,
      newScore,
    }
  ),
});
const value = await res.json();
//console.log(value);
if(value!=null)
  queryAllScoresByLecturer(dispatch,userLogin);
}
const queryAllDegreeSign = async(dispatch,userLogin) => {
  const res = await fetch('http://localhost:5000/degrees/queryAllDegreeSign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userLogin),
  });
  const value = JSON.parse(await res.json());
  //console.log('All Students : ' , JSON.parse(data));
  dispatch({type: "LIST_DEGREES", value});
}
const queryAllDegreeByCreated = async(dispatch,userLogin) => {
  console.log(userLogin);
  const res = await fetch('http://localhost:5000/degrees/queryAllDegreeByCreated', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userLogin),
  });
  const value = JSON.parse(await res.json());
  //console.log('All Students : ' , JSON.parse(data));
  dispatch({type: "LIST_DEGREES", value});
}
const queryAllDegreeByStudentID = async(dispatch,userLogin,studentID) => {
  const res = await fetch('http://localhost:5000/degrees/queryAllDegreeByStudentID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userLogin,studentID}),
  });
  const value = JSON.parse(await res.json());
  //console.log('All Students : ' , JSON.parse(data));
  dispatch({type: "LIST_DEGREES", value});
}
const createDegree = async(dispatch,userLogin,newDegree) =>{
  console.log(userLogin,newDegree);
  const res = await fetch('http://localhost:5000/degrees/createDegree', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userLogin,newDegree}),
  });
  const value = await res.json();
  //console.log("fsfs",value);
  if(value!=null)
  {
    queryAllDegreeByCreated(dispatch,userLogin);
  }
    
}
const setCurrentDegree= async(dispatch,value) => {
  dispatch({type: "CURRENT_DEGREE", value});
}
const updateDegree = async(dispatch,userLogin,newDegree) =>{
  const res = await fetch('http://localhost:5000/degrees/updateDegree', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        userLogin,
        newDegree,
      }
    ),
  });
  const value = await res.json();
  //console.log(value);
  if(value!=null)
    queryAllDegreeByCreated(dispatch,userLogin);
}
const signDegree = async(dispatch,userLogin,degreeID, signerNew) =>{
  const res = await fetch('http://localhost:5000/degrees/createDegree', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userLogin,degreeID, signerNew}),
  });
  const value = await res.json();
  //console.log("fsfs",value);
  if(value!=null)
    queryAllDegreeSign(dispatch,userLogin);
}

export {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode,
  setIsEdit,
  login,
  logout,
  fecthUsers,
  createUser,
  createCourse,
  setCurrentCourse,
  queryAllCourses,
  updateCourse,
  setCurrentStudent,
  createStudent,
  updateStudent,
  queryAllStudents,
  createScore,
  updateScore,
  setCurrentScore,
  queryAllScoresByLecturer,
  createDegree,
  updateDegree,
  signDegree,
  queryAllDegreeByCreated,
  queryAllDegreeSign,
  queryAllDegreeByStudentID,
};
