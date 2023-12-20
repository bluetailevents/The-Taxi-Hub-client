import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import quizResultsService from './quizResultsService';

const initialState = {
    quizResults: [],
    selectedMethod: 'Practice Quiz',
    selectedSection: '',
    selectedSubsection: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createQuizResults = createAsyncThunk(
    'quizResults/create',
    async ({ userId, quizResultData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await quizResultsService.createQuizResults(userId, quizResultData, token);
        } catch (error) {
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getQuizResults = createAsyncThunk(
    'quizResults/get',
    async (userId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await quizResultsService.getQuizResults(userId, token);
        } catch (error) {
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const quizResultsSlice = createSlice({
    name: 'quizResults',
    initialState,
    reducers: {
        reset: () => initialState,
        setSelectedMethod: (state, action) => {
            state.selectedMethod = action.payload;
        },
        setSelectedSection: (state, action) => {
            state.selectedSection = action.payload;
        },
        setSelectedSubsection: (state, action) => {
            state.selectedSubsection = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createQuizResults.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createQuizResults.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.quizResults.push(action.payload);
            })
            .addCase(createQuizResults.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getQuizResults.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getQuizResults.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.quizResults = action.payload;
            })
            .addCase(getQuizResults.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, setSelectedMethod, setSelectedSection, setSelectedSubsection } = quizResultsSlice.actions;
export default quizResultsSlice.reducer;
