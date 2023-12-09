import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import quizResultsService from './quizResultsService';
const initialState = {
    quizResults: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};
export const createQuizResults = createAsyncThunk(
    'quizResults/setAll',
    async ({userId, quizResultData}, thunkAPI) => {
        try {

            const token = thunkAPI.getState().auth.user.token;
            const result = await quizResultsService.createQuizResults(userId, quizResultData, token);

            return result;
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
    'quizResults/getAll',
    async (userId, thunkAPI) => {
        try {

            const token = thunkAPI.getState().auth.user.token;;
            const result = await quizResultsService.getQuizResults(userId, token);

            return result;
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
    name: 'quizResult',
    initialState,
    reducers: {
        reset: (state) => initialState,
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
                state.quizResults = action.payload; // Update this line
            })
            
            
            .addCase(getQuizResults.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
        },
        

    },
);


export const { reset } = quizResultsSlice.actions;
export default quizResultsSlice.reducer;
