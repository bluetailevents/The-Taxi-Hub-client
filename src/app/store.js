import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Corrected import statement
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';
import vacanciesReducer from '../features/vacancies/vacancySlice';
import sectionReducer from '../features/sections/sectionSlice';
import notesReducer from '../features/notes/notesSlice';
import quizResultsReducer from '../features/quizResults/quizResultsSlice';
import getCoordinates from '../features/coordinates/coordinatesSlice';
import tooltipReducer from '../features/tooltip/tooltipSlice';
import actionsReducer from '../features/actions/actionsSlice';

const actionLogger = (store) => (next) => (action) => {
    return next(action);
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
        goals: goalReducer,
        vacancies: vacanciesReducer,
        sections: sectionReducer,
        notes: notesReducer,
        quizResults: quizResultsReducer,
        coordinates: getCoordinates,
        tooltip: tooltipReducer,
        actions: actionsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk, actionLogger),
});
