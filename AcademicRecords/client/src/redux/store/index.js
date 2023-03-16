import { configureStore } from '@reduxjs/toolkit';
import coursesSlice from 'layouts/courses/coursesSlice';
import studentsSlice from 'layouts/students/studentsSlice';
import usersSlice from '../../layouts/users/usersSlice';

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    students: studentsSlice.reducer,
    courses: coursesSlice.reducer,
  },
});

export default store;