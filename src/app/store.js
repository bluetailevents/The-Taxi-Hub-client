import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Corrected import statement
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';
import notesReducer from '../features/notes/notesSlice';
import quizResultsReducer from '../features/quizResults/quizResultsSlice';
import getCoordinates from '../features/coordinates/coordinatesSlice';


const actionLogger = (store) => (next) => (action) => {
    return next(action);
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
        goals: goalReducer,
        notes: notesReducer,
        quizResults: quizResultsReducer,
        coordinates: getCoordinates,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk, actionLogger),
});
