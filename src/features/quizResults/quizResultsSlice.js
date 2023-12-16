import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import quizResultsService from './quizResultsService';

const initialState = {
quizResults: [],
selectedMethod: '',
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

export const setSelectedMethod = createAsyncThunk(
'quizResults/setMethod',
async (method, thunkAPI) => {
    return method;
}
);

export const setSelectedSection = createAsyncThunk(
'quizResults/setSection',
async (section, thunkAPI) => {
    return section;
}
);

export const setSelectedSubsection = createAsyncThunk(
'quizResults/setSubsection',
async (subsection, thunkAPI) => {
    return subsection;
}
);

const quizResultsSlice = createSlice({
name: 'quizResults',
initialState,
reducers: {
    reset: () => initialState,
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
    })
    .addCase(setSelectedMethod.fulfilled, (state, action) => {
        state.selectedMethod = action.payload;
    })
    .addCase(setSelectedSection.fulfilled, (state, action) => {
        state.selectedSection = action.payload;
    })
    .addCase(setSelectedSubsection.fulfilled, (state, action) => {
        state.selectedSubsection = action.payload;
    });
},
});

export const { reset } = quizResultsSlice.actions;
export default quizResultsSlice.reducer;
