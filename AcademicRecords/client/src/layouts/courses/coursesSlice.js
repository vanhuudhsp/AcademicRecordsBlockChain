
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import crypto from "crypto-js";

const coursesSlice= createSlice({

  name: 'courses',
  initialState: {
    openConfigurator: false,
    isEdit: false,
    currentCourse:   {
      
    },
    data: [], 
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const obj = action.payload;
        state.data[state.data.indexOf(e => e.courseID===obj.courseID)] = obj;
      })
      .addCase(queryAllCourses.fulfilled, (state, action) => {
        state.data = action.payload;
        //console.log("studentsSlice -queryAllStudents ", state.data)
      })
      .addCase(setCurrentCourse.fulfilled, (state, action) => {
        state.currentStudent = action.payload;
      })
      .addCase(setIsEdit.fulfilled, (state, action) => {
        state.isEdit= action.payload;
      })
      .addCase(setOpenConfigurator.fulfilled, (state, action) => {
        state.openConfigurator= action.payload;
      })
      ;
  },
});

export const queryAllCourses = createAsyncThunk('courses/queryAllCourses', async (userLogin) => {
  //console.log(`[fetchAllStudents]`, userLogin );
  const res = await fetch('http://localhost:5000/courses/queryAllCourses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userLogin),
  });
  const data = await res.json();
  //console.log('All Students : ' , JSON.parse(data));
  return JSON.parse(data);
});

export const createCourse = createAsyncThunk('courses/createCourse', async ({userLogin, newCourse}) => {
  //newUser.password = crypto.SHA256(newUser.password).toString();
  //console.log(`[client-userLogin]`, userLogin );
  //console.log(`[client-createStudent]`, newStudent );
  const res = await fetch('http://localhost:5000/courses/createCourse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userLogin, newCourse}),
  });
  const data = await res.json();
  //console.log('New Student : ' , { data });
  return data;
});

export const updateCourse = createAsyncThunk('courses/updateCourse', async (userLogin, newCourse) => {
  //newUser.password = crypto.SHA256(newUser.password).toString();
  //console.log(`[createStudent]`, newCourse );
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
  const data = await res.json();
  //console.log('New Student : ' , { data });
  return data;
});
export const setCurrentCourse = createAsyncThunk('courses/setCurrentCourse', async (currentCourse) => {
 
    //console.log("[studentsSlice-currentStudent]",currentStudent );
    return currentCourse;
});
export const setIsEdit = createAsyncThunk('courses/setIsEdit', async (isEdit) => {
  return isEdit;
});
export const setOpenConfigurator = createAsyncThunk('courses/setOpenConfigurator', async (openConfigurator) => {
  //console.log("[studentsSlice-openConfigurator]",openConfigurator );
  return openConfigurator;
});


// export  async function  setCurrentStudent(currentStudent){
//   return async function setCurrentStudentThunk(dispatch, getState){
//     await dispatch(studentsSlice.actions.setCurrentStudent(currentStudent));
//   }
// }
// export function setIsEdit(isEdit){
//   return function setIsEditThunk(dispatch, getState){
//     dispatch(studentsSlice.actions.setIsEdit(isEdit));
//   }
// }

export default coursesSlice;

// export const login = createAsyncThunk('users/login', async (userLogin) => {
//   //console.log('User login pre: ' ,  userLogin.password );
//   // const user = {
//   //   ...userLogin,
//   //   password : crypto.SHA256(userLogin.password).toString(),
//   // }  
//   const res = await fetch('http://localhost:5000/users/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userLogin),
//   });
//   const data = await res.json();
//   //console.log('User login: ' , { user});
//   return data;
// });

// export const addNewTodo = createAsyncThunk(
//   'todos/addNewTodo',
//   async (newTodo) => {
//     const res = await fetch('/api/todos', {
//       method: 'POST',
//       body: JSON.stringify(newTodo),
//     });
//     const data = await res.json();
//     console.log({ data });
//     return data.todos;
//   }
// );

// .addCase(addNewTodo.fulfilled, (state, action) => {
//   state.todos.push(action.payload);
// })

// function* createPostSaga(action)
// {
//     try {
//         const post = yield call(api.createPost, action.payload);
//         console.log('[createPostSaga - post]', post);
//         yield put(actions.createPost.createPostSuccess(post.data));
//     } catch (error) {
//         console.error(error);
//         yield put(actions.createPost.createPostFailure(error));
//     }
    
// }

// function* fetchPostsSaga(action)
// {
//     try {
//         const posts = yield call(api.fectPosts);
//         console.log('[posts]', posts);
//         yield put(actions.getPosts.getPostsSuccess(posts.data));
//     } catch (error) {
//         console.error(error);
//         yield put(actions.getPosts.getPostsFailure(error));
//     }
    
// }

// const initState = [
//   { id: 1, name: 'Learn Yoga', completed: false, priority: 'Medium' },
//   { id: 2, name: 'Learn Redux', completed: true, priority: 'High' },
//   { id: 3, name: 'Learn JavaScript', completed: false, priority: 'Low' },
// ];

// const todoListReducer = (state = initState, action) => {
//   switch (action.type) {
//     case 'todoList/addTodo':
//       return [...state, action.payload];

//     case 'todoList/toggleTodoStatus':
//       return state.map((todo) =>
//         todo.id === action.payload
//           ? { ...todo, completed: !todo.completed }
//           : todo
//       );
//     default:
//       return state;
//   }
// };

// export default todoListReducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const todosSlice = createSlice({
//   name: 'todoList',
//   initialState: { status: 'idle', todos: [] },
//   reducers: {
//     // IMMER
//     addTodo: (state, action) => {
//       state.push(action.payload);
//     }, // action creators
//     toggleTodoStatus: (state, action) => {
//       const currentTodo = state.find((todo) => todo.id === action.payload);
//       if (currentTodo) {
//         currentTodo.completed = !currentTodo.completed;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTodos.pending, (state, action) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchTodos.fulfilled, (state, action) => {
//         console.log({ action });
//         state.todos = action.payload;
//         state.status = 'idle';
//       })
//       .addCase(addNewTodo.fulfilled, (state, action) => {
//         state.todos.push(action.payload);
//       })
//       .addCase(updateTodo.fulfilled, (state, action) => {
//         let currentTodo = state.todos.find((todo) => todo.id === action.payload);
//         currentTodo = action.payload;
//       });
//   },
// });

// export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
//   const res = await fetch('/api/todos');
//   const data = await res.json();
//   return data.todos;
// });

// export const addNewTodo = createAsyncThunk(
//   'todos/addNewTodo',
//   async (newTodo) => {
//     const res = await fetch('/api/todos', {
//       method: 'POST',
//       body: JSON.stringify(newTodo),
//     });
//     const data = await res.json();
//     console.log({ data });
//     return data.todos;
//   }
// );

// export const updateTodo = createAsyncThunk(
//   'todos/updateTodo',
//   async (updatedTodo) => {
//     const res = await fetch('/api/updateTodo', {
//       method: 'POST',
//       body: JSON.stringify(updatedTodo),
//     });

//     const data = await res.json();
//     console.log('[updateTodo]', {data})
//     return data.todos;
//   }
// );

// /*
//   => todos/fetchTodos/pending
//   => todos/fetchTodos/fullfilled
//   => todos/fetchTodos/rejected
// */

// export default todosSlice;

// // action (object) va action creators () => { return action }
// // thunk action (function) va thunk action creators () => { return thunk action  }

// // export function addTodos(todo) { // thunk function - thunk action
// //   return function addTodosThunk(dispatch, getState) {
// //     console.log('[addTodosThunk]', getState());
// //     console.log({todo});
// //     // custom
// //     todo.name = 'Tung Test Updated';
// //     dispatch(todosSlice.actions.addTodo(todo));

// //     console.log('[addTodosThunk after]', getState())
// //   }
// // }


// export default function postsReducers(state = INIT_STATE.posts, action)
// {
//     switch(action.type)
//     {
//         case getType(getPosts.getPostsRequest): // case 'getPostsRequest 
//             return {
//                 ...state,
//                 isLoading: true,
//             }
//         case getType(getPosts.getPostsSuccess): // case 'getPostSuccess
//             return {
//                 ...state,
//                 isLoading: false,
//                 data: action.payload
//             }
//         case getType(getPosts.getPostsFailure): // case 'getPostFailure
//             return {
//                 ...state,
//                 isLoading: false,
//             }
//         case getType(createPost.createPostSuccess): // case 'getPostFailure
//             return {
//                 ...state,
//                 data: [...state.data, action.payload],
//             }
            
//         default:
//             return state;

//     }
// };