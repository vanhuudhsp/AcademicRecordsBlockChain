
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import crypto from "crypto-js";

const usersSlice= createSlice({
  name: 'users',
  initialState: {
      openConfigurator: false,
      isLoading: false,
      userLogin: null,
      data: [], 
      error: null,
  },
  reducers: {
    logout: (state, action) => {
        state.userLogin = null;
    },
    setOpenConfigurator: (state, action)=>{
        state.openConfigurator= action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userLogin = action.payload;
        state.error=null;
      })
      .addCase(login.rejected, (state, action) => {
        state.userLogin = null;
        state.error = action.payload;
      });
  },
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await fetch('http://localhost:5000/users');
  const data = await res.json();
  return data;
});

export const createUser = createAsyncThunk('users/createUser', async ({userLogin,newUser},{ rejectWithValue } ) => {
  console.log("[Client-userLogin]",userLogin);
  console.log("[Client-newUser]",newUser);
  newUser.password = crypto.SHA256(newUser.password).toString();
  const res = await fetch('http://localhost:5000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userLogin,newUser}),
  });
  const data = await res.json();
  //console.log('New user : ' , { data });
  return data;
});

export const login = createAsyncThunk('users/login', async (userLogin,{ rejectWithValue }) => {
  //console.log('User login pre: ' ,  userLogin.password );
  // const user = {
  //   ...userLogin,
  //   password : crypto.SHA256(userLogin.password).toString(),
  // }  
  const res = await fetch('http://localhost:5000/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userLogin),
  });
  const data = await res.json();
  if(data==null)
    return rejectWithValue('Not found UserName:' + userLogin.email);
  console.log('User login: ' , { data});
  return data;
});

// export function logout(){
//   return function logoutThunk(dispatch, getState){
//     dispatch(usersSlice.actions.logout());
//   }
// }

// export function setOpenConfigurator(openConfigurator){
//   return function setOpenConfiguratorThunk(dispatch, getState){
//     dispatch(usersSlice.actions.setOpenConfigurator(openConfigurator));
//   }
// }

export const {logout,setOpenConfigurator} = usersSlice.actions;

export default usersSlice;
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