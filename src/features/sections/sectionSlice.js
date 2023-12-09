import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import sectionService from './sectionService'

const initialState = {
    sections: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    method: null,
    section: null,
    option: null,
    randomize: false,
    level: null,
    timer: null,
}

// Get sections
export const getSections = createAsyncThunk(
    'sections/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const sectionsArray = await sectionService.getSections(token);
            const sectionsObject = sectionsArray.reduce((obj, section) => {
                obj[section._id] = section;
                return obj;
            }, {});
            return sectionsObject;
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




export const sectionSlice = createSlice({
    name: 'section',
    initialState,
    reducers: {
        reset: (state) => initialState,
        setMethod: (state, action) => {
            state.method = action.payload;
        },
        setSection: (state, action) => {
            state.section = action.payload;
        },
        setOption: (state, action) => {
            state.option = action.payload;
        },
        setRandomize: (state, action) => {
            state.randomize = action.payload;
        },
        setLevel: (state, action) => {
            state.level = action.payload;
        },
        setTimer: (state, action) => {
            state.timer = action.payload;
        },
        resetSection: (state) => {
            state.section = null;
            state.option = null;
            state.randomize = false;
            state.level = null;
            state.timer = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getSections.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getSections.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.sections = action.payload
        })
        .addCase(getSections.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    },
})

export const { reset, setMethod, setSection, setOption, setRandomize, setLevel, setTimer, resetSection } = sectionSlice.actions
export default sectionSlice.reducer
